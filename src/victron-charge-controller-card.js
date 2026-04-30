import { LitElement, html, css, nothing } from 'lit';

// ────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────

const CARD_VERSION = '0.1.0';
const CARD_TAG = 'victron-charge-controller-card';
const EDITOR_TAG = 'victron-charge-controller-card-editor';
const DEFAULT_PREFIX = 'victron_charge_control';

const CONTROL_MODES = ['off', 'auto', 'manual', 'force_charge', 'force_discharge'];

const MODE_META = {
  off:              { icon: 'mdi:power-off',                   label: 'Off' },
  auto:             { icon: 'mdi:auto-fix',                    label: 'Auto' },
  manual:           { icon: 'mdi:hand-back-right',             label: 'Manual' },
  force_charge:     { icon: 'mdi:battery-charging-high',       label: 'Force Charge' },
  force_discharge:  { icon: 'mdi:battery-arrow-down-outline',  label: 'Force Discharge' },
};

const ACTION_META = {
  idle:      { icon: 'mdi:pause-circle-outline', label: 'Idle' },
  charge:    { icon: 'mdi:battery-charging',     label: 'Charging' },
  discharge: { icon: 'mdi:battery-arrow-down',   label: 'Discharging' },
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

// ────────────────────────────────────────────────────────────
// Main Card
// ────────────────────────────────────────────────────────────

class VictronChargeControllerCard extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _activeTab: { type: Number, state: true },
    };
  }

  constructor() {
    super();
    this._activeTab = 0;
  }

  // ── Lovelace lifecycle ──────────────────────────────────

  setConfig(config) {
    this.config = {
      entity_prefix: DEFAULT_PREFIX,
      title: 'Victron Charge Control',
      ...config,
    };
  }

  getCardSize() {
    return 12;
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TAG);
  }

  static getStubConfig() {
    return { entity_prefix: DEFAULT_PREFIX, title: 'Victron Charge Control' };
  }

  // ── Entity helpers ──────────────────────────────────────

  _eid(domain, key) {
    return `${domain}.${this.config.entity_prefix}_${key}`;
  }

  _state(domain, key) {
    return this.hass?.states?.[this._eid(domain, key)];
  }

  _val(domain, key) {
    return this._state(domain, key)?.state;
  }

  _callService(domain, service, data) {
    return this.hass.callService(domain, service, data);
  }

  _setNumber(key, value) {
    this._callService('number', 'set_value', {
      entity_id: this._eid('number', key),
      value: Number(value),
    });
  }

  _toggleSwitch(key) {
    const on = this._val('switch', key) === 'on';
    this._callService('switch', on ? 'turn_off' : 'turn_on', {
      entity_id: this._eid('switch', key),
    });
  }

  _selectMode(mode) {
    this._callService('select', 'select_option', {
      entity_id: this._eid('select', 'control_mode'),
      option: mode,
    });
  }

  _pressButton(key) {
    this._callService('button', 'press', {
      entity_id: this._eid('button', key),
    });
  }

  // ── Blocked-hours helpers ───────────────────────────────

  _parseHours(value) {
    if (!value || value === 'unknown' || value === 'unavailable') return [];
    return value
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n >= 0 && n <= 23);
  }

  _toggleBlockedHour(type, hour) {
    const key = type === 'charging'
      ? 'blocked_charging_hours'
      : 'blocked_discharging_hours';
    const current = this._parseHours(this._val('text', key));
    const updated = current.includes(hour)
      ? current.filter(h => h !== hour)
      : [...current, hour].sort((a, b) => a - b);
    this._callService('text', 'set_value', {
      entity_id: this._eid('text', key),
      value: updated.join(', '),
    });
  }

  // ── Reusable render fragments ───────────────────────────

  _renderSection(title, icon, content) {
    return html`
      <div class="section">
        <div class="section-header">
          <ha-icon .icon=${icon}></ha-icon>
          <span>${title}</span>
        </div>
        <div class="section-content">${content}</div>
      </div>`;
  }

  _renderToggle(label, switchKey) {
    const on = this._val('switch', switchKey) === 'on';
    return html`
      <div class="control-row">
        <span class="control-label">${label}</span>
        <ha-switch
          .checked=${on}
          @change=${() => this._toggleSwitch(switchKey)}
        ></ha-switch>
      </div>`;
  }

  _renderSlider(label, numberKey, unit = '') {
    const obj = this._state('number', numberKey);
    if (!obj) return nothing;
    const value = parseFloat(obj.state);
    const { min = 0, max = 100, step = 1 } = obj.attributes;
    return html`
      <div class="control-row">
        <span class="control-label">${label}</span>
        <div class="slider-wrap">
          <input type="range"
            min=${min} max=${max} step=${step}
            .value=${String(value)}
            @change=${(e) => this._setNumber(numberKey, e.target.value)}
          />
          <span class="slider-value">${value}${unit}</span>
        </div>
      </div>`;
  }

  _renderHourChips(type) {
    const key = type === 'charging'
      ? 'blocked_charging_hours'
      : 'blocked_discharging_hours';
    const blocked = this._parseHours(this._val('text', key));
    return html`
      <div class="hour-grid">
        ${HOURS.map(h => html`
          <button
            class="hour-chip ${blocked.includes(h) ? 'blocked' : ''}"
            @click=${() => this._toggleBlockedHour(type, h)}
          >${String(h).padStart(2, '0')}</button>
        `)}
      </div>`;
  }

  // ── Controls view ───────────────────────────────────────

  _renderControlsView() {
    const mode     = this._val('select', 'control_mode') || 'off';
    const action   = this._val('sensor', 'desired_action') || 'idle';
    const actMeta  = ACTION_META[action] || ACTION_META.idle;
    const setpoint = this._val('sensor', 'target_setpoint') || '0';
    const isAuto   = mode === 'auto';
    const feedIn   = this._val('switch', 'grid_feed_in_control') === 'on';

    return html`
      <!-- Mode & Status -->
      ${this._renderSection('Mode', 'mdi:cog', html`
        <div class="mode-group">
          ${CONTROL_MODES.map(m => {
            const meta = MODE_META[m];
            return html`
              <button
                class="mode-btn ${mode === m ? 'active' : ''}"
                data-mode=${m}
                @click=${() => this._selectMode(m)}
                title=${meta.label}
              >
                <ha-icon .icon=${meta.icon}></ha-icon>
                <span class="mode-label">${meta.label}</span>
              </button>`;
          })}
        </div>
        <div class="status-row">
          <div class="status-item">
            <ha-icon .icon=${actMeta.icon}></ha-icon>
            <span>${actMeta.label}</span>
          </div>
          <div class="status-item">
            <ha-icon icon="mdi:flash"></ha-icon>
            <span>${setpoint} W</span>
          </div>
        </div>
      `)}

      <!-- Charge / Discharge -->
      ${this._renderSection('Charge / Discharge', 'mdi:battery-charging', html`
        ${this._renderToggle('Charge Allowed', 'charge_allowed')}
        ${this._renderToggle('Discharge Allowed', 'discharge_allowed')}
        ${this._renderSlider('Charge Power', 'charge_power', ' W')}
        ${this._renderSlider('Discharge Power', 'discharge_power', ' W')}
      `)}

      <!-- Battery Limits -->
      ${this._renderSection('Battery Limits', 'mdi:battery-medium', html`
        ${this._renderSlider('Min SOC', 'min_soc', '%')}
        ${this._renderSlider('Max SOC', 'max_soc', '%')}
      `)}

      <!-- Grid Settings -->
      ${this._renderSection('Grid Settings', 'mdi:transmission-tower', html`
        ${this._renderSlider('Idle Setpoint', 'idle_setpoint', ' W')}
        ${this._renderSlider('Min Grid Setpoint', 'min_grid_setpoint', ' W')}
        ${this._renderSlider('Max Grid Setpoint', 'max_grid_setpoint', ' W')}
      `)}

      <!-- Auto Mode (visible only when mode=auto) -->
      ${isAuto ? this._renderSection('Auto Mode', 'mdi:auto-fix', html`
        ${this._renderSlider('Cheapest Hours', 'cheapest_hours_auto_charge', ' h')}
        ${this._renderSlider('Expensive Hours', 'expensive_hours_auto_discharge', ' h')}
        ${this._renderSlider('Charge Price Threshold', 'charge_price_threshold', ' ct/kWh')}
        ${this._renderSlider('Discharge Price Threshold', 'discharge_price_threshold', ' ct/kWh')}
      `) : nothing}

      <!-- Grid Feed-in -->
      ${this._renderSection('Grid Feed-in', 'mdi:solar-power', html`
        ${this._renderToggle('Feed-in Control', 'grid_feed_in_control')}
        ${feedIn ? html`
          ${this._renderSlider('Price Threshold', 'grid_feed_in_price_threshold', ' ct/kWh')}
          ${this._renderSlider('Default Max Feed-in', 'default_max_grid_feed_in', ' W')}
          ${this._renderSlider('Reduced Max Feed-in', 'reduced_max_grid_feed_in', ' W')}
        ` : nothing}
      `)}

      <!-- Blocked Hours -->
      ${this._renderSection('Blocked Hours', 'mdi:clock-alert', html`
        <div class="blocked-group">
          <span class="blocked-label">Charging</span>
          ${this._renderHourChips('charging')}
        </div>
        <div class="blocked-group">
          <span class="blocked-label">Discharging</span>
          ${this._renderHourChips('discharging')}
        </div>
      `)}

      <!-- Action buttons -->
      <div class="actions">
        <button class="action-btn primary"
          @click=${() => this._pressButton('recalculate_schedule')}>
          <ha-icon icon="mdi:refresh"></ha-icon>
          Recalculate
        </button>
        <button class="action-btn"
          @click=${() => this._callService('victron_charge_control', 'clear_schedule', {})}>
          <ha-icon icon="mdi:delete-outline"></ha-icon>
          Clear Schedule
        </button>
      </div>`;
  }

  // ── Main render ─────────────────────────────────────────

  render() {
    if (!this.hass || !this.config) return nothing;

    const modeEntity = this._state('select', 'control_mode');
    if (!modeEntity) {
      return html`
        <ha-card>
          <div class="card-content">
            <div class="warning">
              <ha-icon icon="mdi:alert-outline"></ha-icon>
              <span>
                Victron Charge Control entities not found.
                Check entity prefix: <code>${this.config.entity_prefix}</code>
              </span>
            </div>
          </div>
        </ha-card>`;
    }

    const action  = this._val('sensor', 'desired_action') || 'idle';
    const actMeta = ACTION_META[action] || ACTION_META.idle;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
            <span>${this.config.title}</span>
          </div>
          <div class="header-badge" data-action=${action}>
            <ha-icon .icon=${actMeta.icon}></ha-icon>
            <span>${actMeta.label}</span>
          </div>
        </div>
        <div class="card-content">
          ${this._activeTab === 0 ? this._renderControlsView() : nothing}
        </div>
      </ha-card>`;
  }

  // ── Styles ──────────────────────────────────────────────

  static get styles() {
    return css`
      /* ── Custom properties ─────────────────────── */
      :host {
        --vcc-accent:   var(--primary-color, #03a9f4);
        --vcc-bg:       var(--card-background-color, #fff);
        --vcc-border:   var(--divider-color, #e0e0e0);
        --vcc-text:     var(--primary-text-color, #212121);
        --vcc-text2:    var(--secondary-text-color, #757575);
        --vcc-success:  var(--success-color, #4caf50);
        --vcc-warning:  var(--warning-color, #ff9800);
        --vcc-error:    var(--error-color, #f44336);
        --vcc-info:     var(--info-color, #2196f3);
        --vcc-disabled: var(--disabled-color, #bdbdbd);
      }
      ha-card { overflow: hidden; }

      /* ── Header ────────────────────────────────── */
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 0;
      }
      .header-title {
        display: flex; align-items: center; gap: 8px;
        font-size: 1.1em; font-weight: 500; color: var(--vcc-text);
      }
      .header-title ha-icon { color: var(--vcc-accent); --mdc-icon-size: 22px; }

      .header-badge {
        display: flex; align-items: center; gap: 4px;
        padding: 4px 12px; border-radius: 16px;
        font-size: 0.8em; font-weight: 600;
        background: rgba(158,158,158,0.12); color: var(--vcc-disabled);
      }
      .header-badge[data-action="charge"]    { background: rgba(76,175,80,0.12);  color: var(--vcc-success); }
      .header-badge[data-action="discharge"] { background: rgba(255,152,0,0.12);  color: var(--vcc-warning); }
      .header-badge ha-icon { --mdc-icon-size: 16px; }

      /* ── Content ───────────────────────────────── */
      .card-content { padding: 12px 16px 16px; }

      /* ── Warning ───────────────────────────────── */
      .warning {
        display: flex; align-items: center; gap: 8px;
        padding: 16px; color: var(--vcc-warning); font-size: 0.9em;
      }
      .warning code {
        background: var(--vcc-border); padding: 2px 6px;
        border-radius: 4px; font-size: 0.9em;
      }

      /* ── Sections ──────────────────────────────── */
      .section { margin-bottom: 16px; }
      .section:last-of-type { margin-bottom: 8px; }
      .section-header {
        display: flex; align-items: center; gap: 6px;
        padding: 6px 0; font-size: 0.8em; font-weight: 600;
        color: var(--vcc-accent); text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid var(--vcc-border); margin-bottom: 8px;
      }
      .section-header ha-icon { --mdc-icon-size: 16px; }
      .section-content { display: flex; flex-direction: column; gap: 6px; }

      /* ── Control rows ──────────────────────────── */
      .control-row {
        display: flex; align-items: center;
        justify-content: space-between;
        min-height: 36px; gap: 12px;
      }
      .control-label {
        font-size: 0.88em; color: var(--vcc-text); flex-shrink: 0;
      }

      /* ── Mode selector ─────────────────────────── */
      .mode-group {
        display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;
      }
      .mode-btn {
        display: flex; align-items: center; gap: 4px;
        padding: 6px 10px; border: 1px solid var(--vcc-border);
        border-radius: 8px; background: none; color: var(--vcc-text2);
        cursor: pointer; font-size: 0.78em; font-family: inherit;
        transition: all 0.15s ease;
      }
      .mode-btn ha-icon { --mdc-icon-size: 16px; }
      .mode-btn:hover { border-color: var(--vcc-accent); color: var(--vcc-accent); }

      .mode-btn[data-mode="off"].active            { background: rgba(158,158,158,0.12); border-color: var(--vcc-disabled); color: var(--vcc-disabled); font-weight: 600; }
      .mode-btn[data-mode="auto"].active            { background: rgba(33,150,243,0.12);  border-color: var(--vcc-info);     color: var(--vcc-info);     font-weight: 600; }
      .mode-btn[data-mode="manual"].active          { background: rgba(255,152,0,0.12);   border-color: var(--vcc-warning);  color: var(--vcc-warning);  font-weight: 600; }
      .mode-btn[data-mode="force_charge"].active    { background: rgba(76,175,80,0.12);   border-color: var(--vcc-success);  color: var(--vcc-success);  font-weight: 600; }
      .mode-btn[data-mode="force_discharge"].active { background: rgba(244,67,54,0.12);   border-color: var(--vcc-error);    color: var(--vcc-error);    font-weight: 600; }

      @media (max-width: 400px) {
        .mode-btn .mode-label { display: none; }
        .mode-btn { padding: 8px; }
      }

      /* ── Status row ────────────────────────────── */
      .status-row { display: flex; gap: 16px; flex-wrap: wrap; }
      .status-item {
        display: flex; align-items: center; gap: 4px;
        font-size: 0.88em; color: var(--vcc-text2);
      }
      .status-item ha-icon { --mdc-icon-size: 16px; }

      /* ── Slider ────────────────────────────────── */
      .slider-wrap {
        display: flex; align-items: center; gap: 8px;
        flex: 1; min-width: 0;
      }
      .slider-wrap input[type="range"] {
        flex: 1; min-width: 0; height: 4px;
        -webkit-appearance: none; appearance: none;
        background: var(--vcc-border); border-radius: 2px; outline: none;
      }
      .slider-wrap input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 16px; height: 16px;
        border-radius: 50%; background: var(--vcc-accent);
        cursor: pointer; border: 2px solid var(--vcc-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
      .slider-wrap input[type="range"]::-moz-range-thumb {
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--vcc-accent); cursor: pointer;
        border: 2px solid var(--vcc-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
      .slider-value {
        font-size: 0.82em; font-weight: 500; color: var(--vcc-text);
        min-width: 70px; text-align: right; white-space: nowrap;
      }

      /* ── Hour chips ────────────────────────────── */
      .blocked-group { margin-bottom: 10px; }
      .blocked-group:last-child { margin-bottom: 0; }
      .blocked-label {
        display: block; font-size: 0.82em;
        color: var(--vcc-text2); margin-bottom: 6px;
      }
      .hour-grid {
        display: grid; grid-template-columns: repeat(12, 1fr); gap: 3px;
      }
      .hour-chip {
        display: flex; align-items: center; justify-content: center;
        padding: 4px 0; border: 1px solid var(--vcc-border);
        border-radius: 4px; background: none; color: var(--vcc-text2);
        cursor: pointer; font-size: 0.72em; font-family: inherit;
        transition: all 0.15s ease;
      }
      .hour-chip:hover { border-color: var(--vcc-accent); color: var(--vcc-accent); }
      .hour-chip.blocked {
        background: rgba(244,67,54,0.12); border-color: var(--vcc-error);
        color: var(--vcc-error); font-weight: 600;
      }
      @media (max-width: 350px) {
        .hour-grid { grid-template-columns: repeat(8, 1fr); }
      }

      /* ── Action buttons ────────────────────────── */
      .actions {
        display: flex; gap: 8px; padding-top: 8px; flex-wrap: wrap;
      }
      .action-btn {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 14px; border: 1px solid var(--vcc-border);
        border-radius: 8px; background: none; color: var(--vcc-text);
        cursor: pointer; font-size: 0.82em; font-family: inherit;
        transition: all 0.15s ease;
      }
      .action-btn:hover { background: rgba(0,0,0,0.04); }
      .action-btn.primary {
        background: var(--vcc-accent); border-color: var(--vcc-accent); color: #fff;
      }
      .action-btn.primary:hover { opacity: 0.9; }
      .action-btn ha-icon { --mdc-icon-size: 16px; }
    `;
  }
}

// ────────────────────────────────────────────────────────────
// Card Editor
// ────────────────────────────────────────────────────────────

class VictronChargeControllerCardEditor extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this.config = { ...config };
  }

  _changed(key, value) {
    this.config = { ...this.config, [key]: value };
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config: this.config } }),
    );
  }

  render() {
    if (!this.config) return nothing;
    return html`
      <div class="editor">
        <div class="row">
          <label for="title">Title</label>
          <input id="title" type="text"
            .value=${this.config.title || 'Victron Charge Control'}
            @input=${(e) => this._changed('title', e.target.value)}
          />
        </div>
        <div class="row">
          <label for="prefix">Entity Prefix</label>
          <input id="prefix" type="text"
            .value=${this.config.entity_prefix || DEFAULT_PREFIX}
            @input=${(e) => this._changed('entity_prefix', e.target.value)}
          />
          <small>Common prefix of all entity IDs (e.g. victron_charge_control)</small>
        </div>
      </div>`;
  }

  static get styles() {
    return css`
      .editor { padding: 16px; }
      .row { display: flex; flex-direction: column; margin-bottom: 12px; }
      label { font-size: 0.85em; font-weight: 500; margin-bottom: 4px; color: var(--primary-text-color); }
      input {
        padding: 8px; border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px; font-size: 0.9em; font-family: inherit;
      }
      small { font-size: 0.75em; color: var(--secondary-text-color); margin-top: 4px; }
    `;
  }
}

// ────────────────────────────────────────────────────────────
// Registration
// ────────────────────────────────────────────────────────────

customElements.define(CARD_TAG, VictronChargeControllerCard);
customElements.define(EDITOR_TAG, VictronChargeControllerCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Victron Charge Controller',
  description: 'Control and monitor your Victron ESS charge controller',
  preview: true,
});

console.info(
  `%c VICTRON-CHARGE-CONTROLLER-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;',
  'color: #03a9f4; background: transparent; font-weight: 700; border: 1px solid #03a9f4; border-radius: 0 4px 4px 0; padding: 2px 6px;',
);
