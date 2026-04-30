/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

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

class VictronChargeControllerCard extends i {

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
    return b`
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
    return b`
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
    if (!obj) return A;
    const value = parseFloat(obj.state);
    const { min = 0, max = 100, step = 1 } = obj.attributes;
    return b`
      <div class="control-row">
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
    return b`
      <div class="hour-grid">
        ${HOURS.map(h => b`
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

    return b`
      <!-- Mode & Status -->
      ${this._renderSection('Mode', 'mdi:cog', b`
        <div class="mode-group">
          ${CONTROL_MODES.map(m => {
            const meta = MODE_META[m];
            return b`
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
      ${this._renderSection('Charge / Discharge', 'mdi:battery-charging', b`
        ${this._renderToggle('Charge Allowed', 'charge_allowed')}
        ${this._renderToggle('Discharge Allowed', 'discharge_allowed')}
        ${this._renderSlider('Charge Power', 'charge_power', ' W')}
        ${this._renderSlider('Discharge Power', 'discharge_power', ' W')}
      `)}

      <!-- Battery Limits -->
      ${this._renderSection('Battery Limits', 'mdi:battery-medium', b`
        ${this._renderSlider('Min SOC', 'min_soc', '%')}
        ${this._renderSlider('Max SOC', 'max_soc', '%')}
      `)}

      <!-- Grid Settings -->
      ${this._renderSection('Grid Settings', 'mdi:transmission-tower', b`
        ${this._renderSlider('Idle Setpoint', 'idle_setpoint', ' W')}
        ${this._renderSlider('Min Grid Setpoint', 'min_grid_setpoint', ' W')}
        ${this._renderSlider('Max Grid Setpoint', 'max_grid_setpoint', ' W')}
      `)}

      <!-- Auto Mode (visible only when mode=auto) -->
      ${isAuto ? this._renderSection('Auto Mode', 'mdi:auto-fix', b`
        ${this._renderSlider('Cheapest Hours', 'cheapest_hours_auto_charge', ' h')}
        ${this._renderSlider('Expensive Hours', 'expensive_hours_auto_discharge', ' h')}
        ${this._renderSlider('Charge Price Threshold', 'charge_price_threshold', ' ct/kWh')}
        ${this._renderSlider('Discharge Price Threshold', 'discharge_price_threshold', ' ct/kWh')}
      `) : A}

      <!-- Grid Feed-in -->
      ${this._renderSection('Grid Feed-in', 'mdi:solar-power', b`
        ${this._renderToggle('Feed-in Control', 'grid_feed_in_control')}
        ${feedIn ? b`
          ${this._renderSlider('Price Threshold', 'grid_feed_in_price_threshold', ' ct/kWh')}
          ${this._renderSlider('Default Max Feed-in', 'default_max_grid_feed_in', ' W')}
          ${this._renderSlider('Reduced Max Feed-in', 'reduced_max_grid_feed_in', ' W')}
        ` : A}
      `)}

      <!-- Blocked Hours -->
      ${this._renderSection('Blocked Hours', 'mdi:clock-alert', b`
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
    if (!this.hass || !this.config) return A;

    const modeEntity = this._state('select', 'control_mode');
    if (!modeEntity) {
      return b`
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

    return b`
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
          ${this._activeTab === 0 ? this._renderControlsView() : A}
        </div>
      </ha-card>`;
  }

  // ── Styles ──────────────────────────────────────────────

  static get styles() {
    return i$3`
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
      .section-content { display: flex; flex-direction: column; gap: 0px; }

      /* ── Control rows ──────────────────────────── */
      .control-row {
        display: flex; align-items: center;
        justify-content: space-between;
        min-height: 36px; gap: 12px;
      }
      .control-label {
        font-size: 0.88em; color: var(--vcc-text); flex-shrink: 0;
        width: 180px;
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
    `;
  }
}

// ────────────────────────────────────────────────────────────
// Card Editor
// ────────────────────────────────────────────────────────────

class VictronChargeControllerCardEditor extends i {

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
    if (!this.config) return A;
    return b`
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
    return i$3`
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
//# sourceMappingURL=victron-charge-controller-card.js.map
