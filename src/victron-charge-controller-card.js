import { LitElement, html, svg, css, nothing } from 'lit';

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

const FEED_IN_META = {
  default: { icon: 'mdi:transmission-tower',          label: 'Default' },
  reduced: { icon: 'mdi:transmission-tower-off',      label: 'Reduced' },
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
    };
  }

  constructor() {
    super();
  }

  // ── Lovelace lifecycle ──────────────────────────────────

  setConfig(config) {
    this.config = {
      entity_prefix: DEFAULT_PREFIX,
      title: 'Victron Charge Control',
      view: 'settings',
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
    return { entity_prefix: DEFAULT_PREFIX, title: 'Victron Charge Control', view: 'settings' };
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

  _extractEpexPrices(attrs) {
    // Find the EPEX data list from entity attributes
    let rawData = null;
    if (Array.isArray(attrs.data) && attrs.data.length > 0) {
      rawData = attrs.data;
    } else {
      // Fallback: search for any list attribute with price-like dicts
      for (const [, val] of Object.entries(attrs)) {
        if (!Array.isArray(val) || val.length === 0) continue;
        const first = val[0];
        if (first && typeof first === 'object' && ('start_time' in first || 'price_ct_per_kwh' in first || 'price_per_kwh' in first)) {
          rawData = val;
          break;
        }
      }
    }
    if (!rawData) return {};

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const priceMap = {};
    for (const item of rawData) {
      const st = item.start_time;
      if (!st) continue;
      let dt;
      if (typeof st === 'string') {
        dt = new Date(st);
      } else if (st instanceof Date) {
        dt = st;
      } else {
        continue;
      }
      if (isNaN(dt.getTime())) continue;
      const itemDate = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      if (itemDate !== todayStr) continue;
      // Extract price in ct/kWh
      let price = item.price_ct_per_kwh;
      if (price === undefined || price === null) {
        const priceEur = item.price_per_kwh;
        if (priceEur !== undefined && priceEur !== null) {
          price = parseFloat(priceEur) * 100;
        }
      }
      if (price !== undefined && price !== null) {
        priceMap[dt.getHours()] = parseFloat(price);
      }
    }
    return priceMap;
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
      <div class="control-row toggle-row">
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
      <div class="control-row slider-row">
        <span class="control-label">${label}</span>
        <div class="slider-wrap">
          <div class="slider-container">
            <input type="range"
              min=${min} max=${max} step=${step}
              .value=${String(value)}
              @input=${(e) => this._onSliderInput(e, unit)}
              @change=${(e) => this._onSliderChange(e, numberKey)}
            />
            <span class="slider-tooltip" style="display:none;"></span>
          </div>
          <span class="slider-value">${value}${unit}</span>
        </div>
      </div>`;
  }

  _onSliderInput(e, unit) {
    const input = e.target;
    const tooltip = input.parentElement.querySelector('.slider-tooltip');
    const val = input.value;
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const pct = (val - min) / (max - min);
    tooltip.textContent = `${val}${unit}`;
    tooltip.style.display = 'block';
    tooltip.style.left = `calc(${pct * 100}% + ${(0.5 - pct) * 16}px)`;
  }

  _onSliderChange(e, numberKey) {
    const tooltip = e.target.parentElement.querySelector('.slider-tooltip');
    tooltip.style.display = 'none';
    this._setNumber(numberKey, e.target.value);
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
    const spotPrice = this._val('sensor', 'current_price');
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
          <div class="status-item">
            <ha-icon icon="mdi:currency-eur"></ha-icon>
            <span>${spotPrice != null && spotPrice !== 'unavailable' && spotPrice !== 'unknown' ? `${(parseFloat(spotPrice) * 100).toFixed(2)} ct/kWh` : '—'}</span>
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

  // ── Plan view ────────────────────────────────────────────

  _renderPlanView() {
    const planEntity = this._state('sensor', 'charge_plan');
    const plan = planEntity?.attributes?.plan;

    if (!plan || !Array.isArray(plan) || plan.length === 0) {
      return html`
        <div class="warning">
          <ha-icon icon="mdi:alert-outline"></ha-icon>
          <span>No charge plan data available.</span>
        </div>`;
    }

    // Check if plan entries have prices; if not, try to extract from current_price sensor attributes
    let enrichedPlan = plan;
    const hasPrices = plan.some(p => p.price !== undefined && p.price !== null);
    if (!hasPrices) {
      const priceEntity = this._state('sensor', 'current_price');
      const attrs = priceEntity?.attributes || {};
      const priceMap = this._extractEpexPrices(attrs);
      if (Object.keys(priceMap).length > 0) {
        enrichedPlan = plan.map(p => ({
          ...p,
          price: priceMap[p.hour] ?? null,
        }));
      }
    }

    // Extract prices and determine scale
    const prices = enrichedPlan.map(p => p.price ?? null);
    const validPrices = prices.filter(p => p !== null);
    if (validPrices.length === 0) {
      return html`
        <div class="warning">
          <ha-icon icon="mdi:alert-outline"></ha-icon>
          <span>No EPEX price data available.</span>
        </div>`;
    }

    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    const priceRange = maxPrice - minPrice || 1;
    // Add padding to scale
    const scaleMin = Math.floor(minPrice - priceRange * 0.1);
    const scaleMax = Math.ceil(maxPrice + priceRange * 0.1);
    const scaleRange = scaleMax - scaleMin || 1;

    const currentHour = new Date().getHours();

    // SVG dimensions
    const chartW = 600;
    const chartH = 250;
    const padL = 50;  // left padding for Y-axis labels
    const padR = 10;
    const padT = 15;
    const padB = 30;  // bottom padding for X-axis labels
    const plotW = chartW - padL - padR;
    const plotH = chartH - padT - padB;
    const barW = plotW / 24;
    const barGap = 2;

    // Map action → color
    const actionColor = (action) => {
      switch (action) {
        case 'charge':              return 'var(--vcc-success, #4caf50)';
        case 'discharge':           return 'var(--vcc-warning, #ff9800)';
        case 'blocked':
        case 'blocked_charging':
        case 'blocked_discharging': return 'var(--vcc-error, #f44336)';
        default:                    return 'var(--vcc-disabled, #bdbdbd)';
      }
    };

    // Y position helper
    const yPos = (price) => padT + plotH - ((price - scaleMin) / scaleRange) * plotH;

    // Zero line position (if zero is in range)
    const zeroInRange = scaleMin <= 0 && scaleMax >= 0;

    // Y-axis ticks (5 ticks)
    const tickCount = 5;
    const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => {
      const val = scaleMin + (scaleRange * i) / tickCount;
      return { val: Math.round(val * 10) / 10, y: yPos(scaleMin + (scaleRange * i) / tickCount) };
    });

    return html`
      <div class="plan-chart-container">
        <svg class="plan-chart" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines -->
          ${yTicks.map(t => svg`
            <line x1="${padL}" y1="${t.y}" x2="${chartW - padR}" y2="${t.y}"
              stroke="var(--vcc-border, #e0e0e0)" stroke-width="0.5"
              stroke-dasharray="${t.val === 0 ? 'none' : '4,3'}" />
          `)}

          <!-- Zero line (bold) -->
          ${zeroInRange ? svg`
            <line x1="${padL}" y1="${yPos(0)}" x2="${chartW - padR}" y2="${yPos(0)}"
              stroke="var(--vcc-text2, #757575)" stroke-width="1" />
          ` : nothing}

          <!-- Bars -->
          ${enrichedPlan.map((entry, i) => {
            const price = entry.price;
            if (price === null || price === undefined) return nothing;
            const x = padL + i * barW + barGap / 2;
            const w = barW - barGap;
            const barTop = yPos(price);
            const barBase = zeroInRange ? yPos(0) : padT + plotH;
            const barY = Math.min(barTop, barBase);
            const barH = Math.abs(barTop - barBase) || 1;
            const isCurrent = i === currentHour;
            return svg`
              <rect
                x="${x}" y="${barY}" width="${w}" height="${barH}"
                fill="${actionColor(entry.action)}"
                opacity="${isCurrent ? 1 : 0.7}"
                rx="1.5"
              />
              ${isCurrent ? svg`
                <rect x="${x - 1}" y="${padT}" width="${w + 2}" height="${plotH}"
                  fill="none" stroke="var(--vcc-accent, #03a9f4)"
                  stroke-width="1.5" stroke-dasharray="4,3" rx="2" />
              ` : nothing}
            `;
          })}

          <!-- Y-axis labels -->
          ${yTicks.map(t => svg`
            <text x="${padL - 6}" y="${t.y + 3.5}" text-anchor="end"
              class="plan-axis-label">${t.val}</text>
          `)}

          <!-- Y-axis unit -->
          <text x="${padL - 6}" y="${padT - 4}" text-anchor="end"
            class="plan-axis-unit">ct/kWh</text>

          <!-- X-axis labels (every 2 hours) -->
          ${enrichedPlan.map((entry, i) => {
            if (i % 2 !== 0 && i !== currentHour) return nothing;
            const x = padL + i * barW + barW / 2;
            return svg`
              <text x="${x}" y="${chartH - 6}" text-anchor="middle"
                class="plan-axis-label ${i === currentHour ? 'plan-current-hour' : ''}"
              >${String(i).padStart(2, '0')}</text>
            `;
          })}
        </svg>

        <!-- Legend -->
        <div class="plan-legend">
          <div class="plan-legend-item">
            <span class="plan-legend-dot" style="background: var(--vcc-success)"></span>
            <span>Charge</span>
          </div>
          <div class="plan-legend-item">
            <span class="plan-legend-dot" style="background: var(--vcc-warning)"></span>
            <span>Discharge</span>
          </div>
          <div class="plan-legend-item">
            <span class="plan-legend-dot" style="background: var(--vcc-disabled)"></span>
            <span>Idle</span>
          </div>
          <div class="plan-legend-item">
            <span class="plan-legend-dot" style="background: var(--vcc-error)"></span>
            <span>Blocked</span>
          </div>
          <div class="plan-legend-item">
            <span class="plan-legend-dot plan-legend-dot-current"></span>
            <span>Current</span>
          </div>
        </div>
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
    const feedInStatus = this._val('sensor', 'grid_feed_in_status') || 'default';
    const feedInMeta = FEED_IN_META[feedInStatus] || FEED_IN_META.default;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
            <span>${this.config.title}</span>
          </div>
          <div class="header-badges">
            <div class="header-badge" data-feed-in=${feedInStatus}>
              <ha-icon .icon=${feedInMeta.icon}></ha-icon>
              <span>${feedInMeta.label}</span>
            </div>
            <div class="header-badge" data-action=${action}>
              <ha-icon .icon=${actMeta.icon}></ha-icon>
              <span>${actMeta.label}</span>
            </div>
          </div>
        </div>
        <div class="card-content">
          ${this.config.view === 'plan' ? this._renderPlanView() : this._renderControlsView()}
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
        font-size: 1.0em; font-weight: 500; color: var(--vcc-text);
      }
      .header-title ha-icon { color: var(--vcc-accent); --mdc-icon-size: 22px; }

      .header-badges {
        display: flex; align-items: center; gap: 6px;
      }
      .header-badge {
        display: flex; align-items: center; gap: 4px;
        padding: 4px 12px; border-radius: 16px;
        font-size: 0.8em; font-weight: 600;
        background: rgba(158,158,158,0.12); color: var(--vcc-disabled);
      }
      .header-badge[data-action="charge"]    { background: rgba(76,175,80,0.12);  color: var(--vcc-success); }
      .header-badge[data-action="discharge"] { background: rgba(255,152,0,0.12);  color: var(--vcc-warning); }
      .header-badge[data-feed-in="default"]  { background: rgba(76,175,80,0.12);  color: var(--vcc-success); }
      .header-badge[data-feed-in="reduced"]  { background: rgba(255,152,0,0.12);  color: var(--vcc-warning); }
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
      .section-content { display: flex; flex-direction: column; gap: 0px; }

      /* ── Control rows ──────────────────────────── */
      .control-row {
        display: flex; align-items: center;
        justify-content: space-between;
        min-height: 36px; gap: 12px;
      }
      .control-row.slider-row {
        flex-direction: column;
        align-items: stretch;
        gap: 2px;
        min-height: auto;
      }
      .control-label {
        font-size: 0.88em; color: var(--vcc-text); flex-shrink: 0;
        width: 180px;
      }
      .control-row.slider-row > .control-label {
        width: auto;
      }
      .control-row.toggle-row > .control-label {
        flex: 1; width: auto; text-align: right;
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
      .slider-container {
        position: relative; flex: 1; min-width: 0;
        display: flex; align-items: center;
      }
      .slider-tooltip {
        position: absolute; bottom: 100%; margin-bottom: 6px;
        transform: translateX(-50%);
        background: var(--vcc-text, #212121); color: var(--vcc-bg, #fff);
        padding: 3px 8px; border-radius: 4px;
        font-size: 0.75em; font-weight: 600; white-space: nowrap;
        pointer-events: none; z-index: 1;
      }
      .slider-tooltip::after {
        content: ''; position: absolute;
        top: 100%; left: 50%; transform: translateX(-50%);
        border: 4px solid transparent;
        border-top-color: var(--vcc-text, #212121);
      }
      .slider-container input[type="range"] {
        flex: 1; min-width: 0; height: 4px; width: 100%;
        -webkit-appearance: none; appearance: none;
        background: var(--vcc-border); border-radius: 2px; outline: none;
      }
      .slider-container input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 16px; height: 16px;
        border-radius: 50%; background: var(--vcc-accent);
        cursor: pointer; border: 2px solid var(--vcc-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
      .slider-container input[type="range"]::-moz-range-thumb {
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

      /* ── Plan chart ────────────────────────────── */
      .plan-chart-container {
        display: flex; flex-direction: column; gap: 12px;
      }
      .plan-chart {
        width: 100%; height: auto;
        font-family: inherit;
      }
      .plan-axis-label {
        font-size: 9px;
        fill: var(--vcc-text2, #757575);
      }
      .plan-axis-unit {
        font-size: 8px;
        fill: var(--vcc-text2, #757575);
      }
      .plan-current-hour {
        font-weight: 700;
        fill: var(--vcc-accent, #03a9f4);
      }
      .plan-legend {
        display: flex; flex-wrap: wrap; gap: 12px;
        justify-content: center;
        font-size: 0.78em; color: var(--vcc-text2);
      }
      .plan-legend-item {
        display: flex; align-items: center; gap: 4px;
      }
      .plan-legend-dot {
        width: 10px; height: 10px; border-radius: 2px;
        flex-shrink: 0;
      }
      .plan-legend-dot-current {
        background: none;
        border: 1.5px dashed var(--vcc-accent, #03a9f4);
      }
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
        <div class="row">
          <label for="view">View</label>
          <select id="view"
            .value=${this.config.view || 'settings'}
            @change=${(e) => this._changed('view', e.target.value)}
          >
            <option value="settings" ?selected=${(this.config.view || 'settings') === 'settings'}>Settings</option>
            <option value="plan" ?selected=${this.config.view === 'plan'}>Plan</option>
          </select>
          <small>Choose which view this card displays</small>
        </div>
      </div>`;
  }

  static get styles() {
    return css`
      .editor { padding: 16px; }
      .row { display: flex; flex-direction: column; margin-bottom: 12px; }
      label { font-size: 0.85em; font-weight: 500; margin-bottom: 4px; color: var(--primary-text-color); }
      input, select {
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
