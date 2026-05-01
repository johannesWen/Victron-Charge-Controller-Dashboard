const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new s(r,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,v=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!a(e,t),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(t)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:m;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,w=e=>e,S=y.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,P=`<${E}>`,H=document,M=()=>H.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,O="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,V=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=W(1),I=W(2),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,Y=H.createTreeWalker(H,129);function X(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===z?"!--"===c[1]?o=N:void 0!==c[1]?o=D:void 0!==c[2]?(V.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=R):void 0!==c[3]&&(o=R):o===R?">"===c[0]?(o=s??z,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?R:'"'===c[3]?j:L):o===j||o===L?o=R:o===N||o===D?o=z:(o=R,s=void 0);const h=o===R&&e[t+1].startsWith("/>")?" ":"";n+=o===z?i+P:l>=0?(r.push(a),i.slice(0,l)+k+i.slice(l)+C+h):i+C+(-2===l?t:h)}return[X(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class J{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[c,l]=Z(e,t);if(this.el=J.createElement(c,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Y.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(k)){const t=l[n++],i=r.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?re:"@"===o[1]?se:te}),r.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(V.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],M()),Y.nextNode(),a.push({type:2,index:++s});r.append(e[t],M())}}}else if(8===r.nodeType)if(r.data===E)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)a.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,r){if(t===F)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=T(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=K(e,s._$AS(e,t.values),s,r)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??H).importNode(t,!0);Y.currentNode=r;let s=Y.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new ne(s,this,e)),this._$AV.push(t),a=i[++o]}n!==a?.index&&(s=Y.nextNode(),n++)}return Y.currentNode=H,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),T(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Q(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new J(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(void 0===s)e=K(this,e,t,0),n=!T(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const r=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=K(this,r[i+o],t,o),a===F&&(a=this._$AH[o]),n||=!T(a)||a!==this._$AH[o],a===q?e=q:e!==q&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class se extends te{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??q)===F)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const oe=y.litHtmlPolyfillSupport;oe?.(J,ee),(y.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;class ce extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ce._$litElement$=!0,ce.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ce});const le=ae.litElementPolyfillSupport;le?.({LitElement:ce}),(ae.litElementVersions??=[]).push("4.2.2");const de="victron-charge-controller-card",he="victron-charge-controller-card-editor",pe="victron_charge_control",ue=["off","auto","manual","force_charge","force_discharge"],ge={off:{icon:"mdi:power-off",label:"Off"},auto:{icon:"mdi:auto-fix",label:"Auto"},manual:{icon:"mdi:hand-back-right",label:"Manual"},force_charge:{icon:"mdi:battery-charging-high",label:"Force Charge"},force_discharge:{icon:"mdi:battery-arrow-down-outline",label:"Force Discharge"}},ve={idle:{icon:"mdi:pause-circle-outline",label:"Idle"},charge:{icon:"mdi:battery-charging",label:"Charging"},discharge:{icon:"mdi:battery-arrow-down",label:"Discharging"}},fe={default:{icon:"mdi:transmission-tower",label:"Default"},reduced:{icon:"mdi:transmission-tower-off",label:"Reduced"}},_e=Array.from({length:24},(e,t)=>t);customElements.define(de,class extends ce{static get properties(){return{hass:{type:Object},config:{type:Object}}}constructor(){super(),this._sliderHoldTimers=new WeakMap,this._sliderUnlocked=new WeakSet}setConfig(e){this.config={entity_prefix:pe,title:"Victron Charge Control",view:"settings",...e}}getCardSize(){return 12}static getConfigElement(){return document.createElement(he)}static getStubConfig(){return{entity_prefix:pe,title:"Victron Charge Control",view:"settings"}}_eid(e,t){return`${e}.${this.config.entity_prefix}_${t}`}_state(e,t){return this.hass?.states?.[this._eid(e,t)]}_val(e,t){return this._state(e,t)?.state}_callService(e,t,i){return this.hass.callService(e,t,i)}_setNumber(e,t){this._callService("number","set_value",{entity_id:this._eid("number",e),value:Number(t)})}_toggleSwitch(e){const t="on"===this._val("switch",e);this._callService("switch",t?"turn_off":"turn_on",{entity_id:this._eid("switch",e)})}_selectMode(e){this._callService("select","select_option",{entity_id:this._eid("select","control_mode"),option:e})}_pressButton(e){this._callService("button","press",{entity_id:this._eid("button",e)})}_parseHours(e){return e&&"unknown"!==e&&"unavailable"!==e?e.split(",").map(e=>parseInt(e.trim(),10)).filter(e=>!isNaN(e)&&e>=0&&e<=23):[]}_toggleBlockedHour(e,t){const i="charging"===e?"blocked_charging_hours":"blocked_discharging_hours",r=this._parseHours(this._val("text",i)),s=r.includes(t)?r.filter(e=>e!==t):[...r,t].sort((e,t)=>e-t);this._callService("text","set_value",{entity_id:this._eid("text",i),value:s.join(", ")})}_extractEpexPrices(e,t){let i=null;if(Array.isArray(e.data)&&e.data.length>0)i=e.data;else for(const[,t]of Object.entries(e)){if(!Array.isArray(t)||0===t.length)continue;const e=t[0];if(e&&"object"==typeof e&&("start_time"in e||"price_ct_per_kwh"in e||"price_per_kwh"in e)){i=t;break}}if(!i)return{};const r=t||new Date,s=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`,n={};for(const e of i){const t=e.start_time;if(!t)continue;let i;if("string"==typeof t)i=new Date(t);else{if(!(t instanceof Date))continue;i=t}if(isNaN(i.getTime()))continue;if(`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`!==s)continue;let r=e.price_ct_per_kwh;if(null==r){const t=e.price_per_kwh;null!=t&&(r=100*parseFloat(t))}null!=r&&(n[i.getHours()]=parseFloat(r))}return n}_renderSection(e,t,i){return B`
      <div class="section">
        <div class="section-header">
          <ha-icon .icon=${t}></ha-icon>
          <span>${e}</span>
        </div>
        <div class="section-content">${i}</div>
      </div>`}_renderToggle(e,t){const i="on"===this._val("switch",t);return B`
      <div class="control-row toggle-row">
        <span class="control-label">${e}</span>
        <ha-switch
          .checked=${i}
          @change=${()=>this._toggleSwitch(t)}
        ></ha-switch>
      </div>`}_renderSlider(e,t,i=""){const r=this._state("number",t);if(!r)return q;const s=parseFloat(r.state),{min:n=0,max:o=100,step:a=1}=r.attributes;return B`
      <div class="control-row slider-row">
        <span class="control-label">${e}</span>
        <div class="slider-wrap">
          <div class="slider-container">
            <input type="range"
              min=${n} max=${o} step=${a}
              .value=${String(s)}
              @input=${e=>this._onSliderInput(e,i)}
              @change=${e=>this._onSliderChange(e,t)}
              @pointerdown=${e=>this._onSliderPointerDown(e)}
              @pointerup=${e=>this._onSliderPointerUp(e)}
              @pointercancel=${e=>this._onSliderPointerUp(e)}
            />
            <span class="slider-tooltip" style="display:none;"></span>
            <div class="slider-hold-progress"></div>
          </div>
          <span class="slider-value">${s}${i}</span>
        </div>
      </div>`}_onSliderPointerDown(e){const t=e.target;if(t.dataset.lockedValue=t.value,!this._sliderUnlocked.has(t)){const e=t.parentElement.querySelector(".slider-hold-progress");e.classList.add("active"),this._sliderHoldTimers.set(t,setTimeout(()=>{this._sliderUnlocked.add(t),t.classList.add("unlocked"),e.classList.remove("active"),e.classList.add("done"),t.parentElement.classList.add("slider-activated"),setTimeout(()=>t.parentElement.classList.remove("slider-activated"),200)},1e3))}}_onSliderPointerUp(e){const t=e.target,i=t.parentElement.querySelector(".slider-hold-progress"),r=this._sliderHoldTimers.get(t);r&&(clearTimeout(r),this._sliderHoldTimers.delete(t)),i.classList.remove("active","done"),this._sliderUnlocked.has(t)?(this._sliderUnlocked.delete(t),t.classList.remove("unlocked")):void 0!==t.dataset.lockedValue&&(t.value=t.dataset.lockedValue)}_onSliderInput(e,t){const i=e.target;if(!this._sliderUnlocked.has(i))return void(void 0!==i.dataset.lockedValue&&(i.value=i.dataset.lockedValue));const r=i.parentElement.querySelector(".slider-tooltip"),s=i.value,n=parseFloat(i.min),o=(s-n)/(parseFloat(i.max)-n);r.textContent=`${s}${t}`,r.style.display="block",r.style.left=`calc(${100*o}% + ${16*(.5-o)}px)`}_onSliderChange(e,t){const i=e.target;i.parentElement.querySelector(".slider-tooltip").style.display="none",this._sliderUnlocked.has(i)?this._setNumber(t,i.value):void 0!==i.dataset.lockedValue&&(i.value=i.dataset.lockedValue)}_renderHourChips(e){const t="charging"===e?"blocked_charging_hours":"blocked_discharging_hours",i=this._parseHours(this._val("text",t));return B`
      <div class="hour-grid">
        ${_e.map(t=>B`
          <button
            class="hour-chip ${i.includes(t)?"blocked":""}"
            @click=${()=>this._toggleBlockedHour(e,t)}
          >${String(t).padStart(2,"0")}</button>
        `)}
      </div>`}_renderControlsView(){const e=this._val("select","control_mode")||"off",t=this._val("sensor","desired_action")||"idle",i=ve[t]||ve.idle,r=this._val("sensor","target_setpoint")||"0",s=this._val("sensor","current_price"),n="auto"===e,o="on"===this._val("switch","grid_feed_in_control");return B`
      <!-- Mode & Status -->
      ${this._renderSection("Mode","mdi:cog",B`
        <div class="mode-group">
          ${ue.map(t=>{const i=ge[t];return B`
              <button
                class="mode-btn ${e===t?"active":""}"
                data-mode=${t}
                @click=${()=>this._selectMode(t)}
                title=${i.label}
              >
                <ha-icon .icon=${i.icon}></ha-icon>
                <span class="mode-label">${i.label}</span>
              </button>`})}
        </div>
        <div class="status-row">
          <div class="status-item">
            <ha-icon .icon=${i.icon}></ha-icon>
            <span>${i.label}</span>
          </div>
          <div class="status-item">
            <ha-icon icon="mdi:flash"></ha-icon>
            <span>${r} W</span>
          </div>
          <div class="status-item">
            <ha-icon icon="mdi:currency-eur"></ha-icon>
            <span>${null!=s&&"unavailable"!==s&&"unknown"!==s?`${(100*parseFloat(s)).toFixed(2)} ct/kWh`:"—"}</span>
          </div>
        </div>
      `)}

      <!-- Charge / Discharge -->
      ${this._renderSection("Charge / Discharge","mdi:battery-charging",B`
        ${this._renderToggle("Charge Allowed","charge_allowed")}
        ${this._renderToggle("Discharge Allowed","discharge_allowed")}
        ${this._renderSlider("Charge Power","charge_power"," W")}
        ${this._renderSlider("Discharge Power","discharge_power"," W")}
      `)}

      <!-- Battery Limits -->
      ${this._renderSection("Battery Limits","mdi:battery-medium",B`
        ${this._renderSlider("Min SOC","min_soc","%")}
        ${this._renderSlider("Max SOC","max_soc","%")}
      `)}

      <!-- Grid Settings -->
      ${this._renderSection("Grid Settings","mdi:transmission-tower",B`
        ${this._renderSlider("Idle Setpoint","idle_setpoint"," W")}
        ${this._renderSlider("Min Grid Setpoint","min_grid_setpoint"," W")}
        ${this._renderSlider("Max Grid Setpoint","max_grid_setpoint"," W")}
      `)}

      <!-- Auto Mode (visible only when mode=auto) -->
      ${n?this._renderSection("Auto Mode","mdi:auto-fix",B`
        ${this._renderSlider("Cheapest Hours","cheapest_hours_auto_charge"," h")}
        ${this._renderSlider("Expensive Hours","expensive_hours_auto_discharge"," h")}
        ${this._renderSlider("Charge Price Threshold","charge_price_threshold"," ct/kWh")}
        ${this._renderSlider("Discharge Price Threshold","discharge_price_threshold"," ct/kWh")}
      `):q}

      <!-- Grid Feed-in -->
      ${this._renderSection("Grid Feed-in","mdi:solar-power",B`
        ${this._renderToggle("Feed-in Control","grid_feed_in_control")}
        ${o?B`
          ${this._renderSlider("Price Threshold","grid_feed_in_price_threshold"," ct/kWh")}
          ${this._renderSlider("Default Max Feed-in","default_max_grid_feed_in"," W")}
          ${this._renderSlider("Reduced Max Feed-in","reduced_max_grid_feed_in"," W")}
        `:q}
      `)}

      <!-- Blocked Hours -->
      ${this._renderSection("Blocked Hours","mdi:clock-alert",B`
        <div class="blocked-group">
          <span class="blocked-label">Charging</span>
          ${this._renderHourChips("charging")}
        </div>
        <div class="blocked-group">
          <span class="blocked-label">Discharging</span>
          ${this._renderHourChips("discharging")}
        </div>
      `)}

      <!-- Action buttons -->
      <div class="actions">
        <button class="action-btn primary"
          @click=${()=>this._pressButton("recalculate_schedule")}>
          <ha-icon icon="mdi:refresh"></ha-icon>
          Recalculate
        </button>
        <button class="action-btn"
          @click=${()=>this._callService("victron_charge_control","clear_schedule",{})}>
          <ha-icon icon="mdi:delete-outline"></ha-icon>
          Clear Schedule
        </button>
      </div>`}_renderPriceChart(e,{showCurrentHour:t=!1,startHour:i=0}={}){const r=e.map(e=>e.price??null),s=r.filter(e=>null!==e);if(0===s.length)return null;const n=Math.min(...s),o=Math.max(...s),a=o-n||1,c=Math.floor(n-.1*a),l=Math.ceil(o+.1*a),d=l-c||1,h=(new Date).getHours(),p=600,u=50,g=205,v=22.5,f=e=>{switch(e){case"charge":return"var(--vcc-success, #4caf50)";case"discharge":return"var(--vcc-warning, #ff9800)";case"blocked":case"blocked_charging":case"blocked_discharging":return"var(--vcc-error, #f44336)";default:return"var(--vcc-disabled, #bdbdbd)"}},_=e=>230-(e-c)/d*g,m=c<=0&&l>=0,b=Array.from({length:6},(e,t)=>{const i=c+d*t/5;return{val:Math.round(10*i)/10,y:_(c+d*t/5)}});return I`
      <svg class="plan-chart" viewBox="0 0 ${p} ${260}" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines -->
        ${b.map(e=>I`
          <line x1="${u}" y1="${e.y}" x2="${590}" y2="${e.y}"
            stroke="var(--vcc-border, #e0e0e0)" stroke-width="0.5"
            stroke-dasharray="${0===e.val?"none":"4,3"}" />
        `)}

        <!-- Zero line (bold) -->
        ${m?I`
          <line x1="${u}" y1="${_(0)}" x2="${590}" y2="${_(0)}"
            stroke="var(--vcc-text2, #757575)" stroke-width="1" />
        `:q}

        <!-- Bars -->
        ${e.map((e,r)=>{const s=e.price;if(null==s)return q;const n=u+r*v+1,o=_(s),a=m?_(0):230,c=Math.min(o,a),l=Math.abs(o-a)||1,d=r<i,p=t&&r===h;return I`
            <rect
              x="${n}" y="${c}" width="${20.5}" height="${l}"
              fill="${f(d?"idle":e.action)}"
              opacity="${d?.35:p?1:.7}"
              rx="1.5"
            />
            ${p?I`
              <rect x="${n-1}" y="${25}" width="${22.5}" height="${g}"
                fill="none" stroke="var(--vcc-accent, #03a9f4)"
                stroke-width="1.5" stroke-dasharray="4,3" rx="2" />
            `:q}
          `})}

        <!-- Y-axis labels -->
        ${b.map(e=>I`
          <text x="${44}" y="${e.y+3.5}" text-anchor="end"
            class="plan-axis-label">${e.val}</text>
        `)}

        <!-- Y-axis unit -->
        <text x="${44}" y="${13}" text-anchor="end"
          class="plan-axis-unit">ct/kWh</text>

        <!-- X-axis labels (every 2 hours) -->
        ${e.map((e,i)=>{if(i%2!=0&&(!t||i!==h))return q;return I`
            <text x="${u+i*v+11.25}" y="${254}" text-anchor="middle"
              class="plan-axis-label ${t&&i===h?"plan-current-hour":""}"
            >${String(i).padStart(2,"0")}</text>
          `})}
      </svg>
    `}_renderPlanView(){const e=this._state("sensor","charge_plan"),t=e?.attributes?.plan;if(!t||!Array.isArray(t)||0===t.length)return B`
        <div class="warning">
          <ha-icon icon="mdi:alert-outline"></ha-icon>
          <span>No charge plan data available.</span>
        </div>`;const i=this._state("sensor","current_price"),r=i?.attributes||{};let s=t;const n=t.some(e=>void 0!==e.price&&null!==e.price);if(!n){const e=this._extractEpexPrices(r);Object.keys(e).length>0&&(s=t.map(t=>({...t,price:e[t.hour]??null})))}const o=(new Date).getHours(),a=this._renderPriceChart(s,{showCurrentHour:!0,startHour:o}),c=new Date;c.setDate(c.getDate()+1);const l=this._extractEpexPrices(r,c);let d=null;if(Object.keys(l).length>0){const e=t.map(e=>({...e,price:l[e.hour]??null}));d=this._renderPriceChart(e)}return a||d?B`
      <div class="plan-chart-container">
        ${a?B`
          <div class="plan-chart-label">Today</div>
          ${a}
        `:q}

        ${d?B`
          <div class="plan-chart-label">Tomorrow</div>
          ${d}
        `:B`
          <div class="plan-chart-label plan-chart-label-muted">Tomorrow — prices not yet available</div>
        `}

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
      </div>`:B`
        <div class="warning">
          <ha-icon icon="mdi:alert-outline"></ha-icon>
          <span>No EPEX price data available.</span>
        </div>`}render(){if(!this.hass||!this.config)return q;if(!this._state("select","control_mode"))return B`
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
        </ha-card>`;const e=this._val("sensor","desired_action")||"idle",t=ve[e]||ve.idle,i=this._val("sensor","grid_feed_in_status")||"default",r=fe[i]||fe.default;return B`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
            <span>${this.config.title}</span>
          </div>
          <div class="header-badges">
            <div class="header-badge" data-feed-in=${i}>
              <ha-icon .icon=${r.icon}></ha-icon>
              <span>${r.label}</span>
            </div>
            <div class="header-badge" data-action=${e}>
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </div>
          </div>
        </div>
        <div class="card-content">
          ${"plan"===this.config.view?this._renderPlanView():this._renderControlsView()}
        </div>
      </ha-card>`}static get styles(){return n`
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
        touch-action: none;
      }
      .slider-container input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 16px; height: 16px;
        border-radius: 50%; background: var(--vcc-accent);
        cursor: pointer; border: 2px solid var(--vcc-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        opacity: 0.5; transition: opacity 0.2s, transform 0.2s;
      }
      .slider-container input[type="range"].unlocked::-webkit-slider-thumb {
        opacity: 1; transform: scale(1.3);
      }
      .slider-container input[type="range"]::-moz-range-thumb {
        width: 12px; height: 12px; border-radius: 50%;
        background: var(--vcc-accent); cursor: pointer;
        border: 2px solid var(--vcc-bg);
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        opacity: 0.5; transition: opacity 0.2s, transform 0.2s;
      }
      .slider-container input[type="range"].unlocked::-moz-range-thumb {
        opacity: 1; transform: scale(1.3);
      }
      .slider-hold-progress {
        position: absolute; bottom: -3px; left: 0; right: 0;
        height: 2px; border-radius: 1px; overflow: hidden;
        pointer-events: none;
      }
      .slider-hold-progress::after {
        content: ''; display: block; height: 100%;
        background: var(--vcc-accent); width: 0%;
        border-radius: 1px;
      }
      .slider-hold-progress.active::after {
        width: 100%; transition: width 1s linear;
      }
      .slider-hold-progress.done::after {
        width: 100%; background: var(--vcc-accent);
      }
      .slider-activated {
        animation: slider-pulse 0.2s ease;
      }
      @keyframes slider-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
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
        font-size: 14px;
        fill: var(--vcc-text2, #757575);
      }
      .plan-axis-unit {
        font-size: 14px;
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
      .plan-chart-label {
        font-size: 0.85em;
        font-weight: 600;
        color: var(--vcc-text, #212121);
        padding: 4px 0 0;
      }
      .plan-chart-label-muted {
        color: var(--vcc-text2, #757575);
        font-weight: 400;
        font-style: italic;
      }
    `}}),customElements.define(he,class extends ce{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(e){this.config={...e}}_changed(e,t){this.config={...this.config,[e]:t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config}}))}render(){return this.config?B`
      <div class="editor">
        <div class="row">
          <label for="title">Title</label>
          <input id="title" type="text"
            .value=${this.config.title||"Victron Charge Control"}
            @input=${e=>this._changed("title",e.target.value)}
          />
        </div>
        <div class="row">
          <label for="prefix">Entity Prefix</label>
          <input id="prefix" type="text"
            .value=${this.config.entity_prefix||pe}
            @input=${e=>this._changed("entity_prefix",e.target.value)}
          />
          <small>Common prefix of all entity IDs (e.g. victron_charge_control)</small>
        </div>
        <div class="row">
          <label for="view">View</label>
          <select id="view"
            .value=${this.config.view||"settings"}
            @change=${e=>this._changed("view",e.target.value)}
          >
            <option value="settings" ?selected=${"settings"===(this.config.view||"settings")}>Settings</option>
            <option value="plan" ?selected=${"plan"===this.config.view}>Plan</option>
          </select>
          <small>Choose which view this card displays</small>
        </div>
      </div>`:q}static get styles(){return n`
      .editor { padding: 16px; }
      .row { display: flex; flex-direction: column; margin-bottom: 12px; }
      label { font-size: 0.85em; font-weight: 500; margin-bottom: 4px; color: var(--primary-text-color); }
      input, select {
        padding: 8px; border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px; font-size: 0.9em; font-family: inherit;
      }
      small { font-size: 0.75em; color: var(--secondary-text-color); margin-top: 4px; }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:de,name:"Victron Charge Controller",description:"Control and monitor your Victron ESS charge controller",preview:!0}),console.info("%c VICTRON-CHARGE-CONTROLLER-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;","color: #03a9f4; background: transparent; font-weight: 700; border: 1px solid #03a9f4; border-radius: 0 4px 4px 0; padding: 2px 6px;");
