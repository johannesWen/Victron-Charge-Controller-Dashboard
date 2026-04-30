const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(r,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,f=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,v?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,w=t=>t,A=y.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,P=`<${k}>`,H=document,M=()=>H.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,D=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,W=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,G=H.createTreeWalker(H,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===N?"!--"===c[1]?n=z:void 0!==c[1]?n=R:void 0!==c[2]?(W.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=D):void 0!==c[3]&&(n=D):n===D?">"===c[0]?(n=s??N,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?D:'"'===c[3]?B:j):n===B||n===j?n=D:n===z||n===R?n=N:(n=D,s=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+P:d>=0?(r.push(a),i.slice(0,d)+C+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class K{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[c,d]=J(t,e);if(this.el=K.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=G.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=d[o++],i=r.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Y}),r.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(W.test(r.tagName)){const t=r.textContent.split(E),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],M()),G.nextNode(),a.push({type:2,index:++s});r.append(t[e],M())}}}else if(8===r.nodeType)if(r.data===k)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(E,t+1));)a.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===I)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??H).importNode(e,!0);G.currentNode=r;let s=G.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new rt(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=G.nextNode(),o++)}return G.currentNode=H,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=Z(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Z(this,r[i+n],e,n),a===I&&(a=this._$AH[n]),o||=!O(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Y{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===I)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=y.litHtmlPolyfillSupport;st?.(K,X),(y.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new X(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct="victron-charge-controller-card",dt="victron-charge-controller-card-editor",lt="victron_charge_control",ht=["off","auto","manual","force_charge","force_discharge"],pt={off:{icon:"mdi:power-off",label:"Off"},auto:{icon:"mdi:auto-fix",label:"Auto"},manual:{icon:"mdi:hand-back-right",label:"Manual"},force_charge:{icon:"mdi:battery-charging-high",label:"Force Charge"},force_discharge:{icon:"mdi:battery-arrow-down-outline",label:"Force Discharge"}},ut={idle:{icon:"mdi:pause-circle-outline",label:"Idle"},charge:{icon:"mdi:battery-charging",label:"Charging"},discharge:{icon:"mdi:battery-arrow-down",label:"Discharging"}},gt=Array.from({length:24},(t,e)=>e);customElements.define(ct,class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},_activeTab:{type:Number,state:!0}}}constructor(){super(),this._activeTab=0}setConfig(t){this.config={entity_prefix:lt,title:"Victron Charge Control",...t}}getCardSize(){return 12}static getConfigElement(){return document.createElement(dt)}static getStubConfig(){return{entity_prefix:lt,title:"Victron Charge Control"}}_eid(t,e){return`${t}.${this.config.entity_prefix}_${e}`}_state(t,e){return this.hass?.states?.[this._eid(t,e)]}_val(t,e){return this._state(t,e)?.state}_callService(t,e,i){return this.hass.callService(t,e,i)}_setNumber(t,e){this._callService("number","set_value",{entity_id:this._eid("number",t),value:Number(e)})}_toggleSwitch(t){const e="on"===this._val("switch",t);this._callService("switch",e?"turn_off":"turn_on",{entity_id:this._eid("switch",t)})}_selectMode(t){this._callService("select","select_option",{entity_id:this._eid("select","control_mode"),option:t})}_pressButton(t){this._callService("button","press",{entity_id:this._eid("button",t)})}_parseHours(t){return t&&"unknown"!==t&&"unavailable"!==t?t.split(",").map(t=>parseInt(t.trim(),10)).filter(t=>!isNaN(t)&&t>=0&&t<=23):[]}_toggleBlockedHour(t,e){const i="charging"===t?"blocked_charging_hours":"blocked_discharging_hours",r=this._parseHours(this._val("text",i)),s=r.includes(e)?r.filter(t=>t!==e):[...r,e].sort((t,e)=>t-e);this._callService("text","set_value",{entity_id:this._eid("text",i),value:s.join(", ")})}_renderSection(t,e,i){return L`
      <div class="section">
        <div class="section-header">
          <ha-icon .icon=${e}></ha-icon>
          <span>${t}</span>
        </div>
        <div class="section-content">${i}</div>
      </div>`}_renderToggle(t,e){const i="on"===this._val("switch",e);return L`
      <div class="control-row">
        <span class="control-label">${t}</span>
        <ha-switch
          .checked=${i}
          @change=${()=>this._toggleSwitch(e)}
        ></ha-switch>
      </div>`}_renderSlider(t,e,i=""){const r=this._state("number",e);if(!r)return V;const s=parseFloat(r.state),{min:o=0,max:n=100,step:a=1}=r.attributes;return L`
      <div class="control-row">
        <span class="control-label">${t}</span>
        <div class="slider-wrap">
          <input type="range"
            min=${o} max=${n} step=${a}
            .value=${String(s)}
            @change=${t=>this._setNumber(e,t.target.value)}
          />
          <span class="slider-value">${s}${i}</span>
        </div>
      </div>`}_renderHourChips(t){const e="charging"===t?"blocked_charging_hours":"blocked_discharging_hours",i=this._parseHours(this._val("text",e));return L`
      <div class="hour-grid">
        ${gt.map(e=>L`
          <button
            class="hour-chip ${i.includes(e)?"blocked":""}"
            @click=${()=>this._toggleBlockedHour(t,e)}
          >${String(e).padStart(2,"0")}</button>
        `)}
      </div>`}_renderControlsView(){const t=this._val("select","control_mode")||"off",e=this._val("sensor","desired_action")||"idle",i=ut[e]||ut.idle,r=this._val("sensor","target_setpoint")||"0",s="auto"===t,o="on"===this._val("switch","grid_feed_in_control");return L`
      <!-- Mode & Status -->
      ${this._renderSection("Mode","mdi:cog",L`
        <div class="mode-group">
          ${ht.map(e=>{const i=pt[e];return L`
              <button
                class="mode-btn ${t===e?"active":""}"
                data-mode=${e}
                @click=${()=>this._selectMode(e)}
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
        </div>
      `)}

      <!-- Charge / Discharge -->
      ${this._renderSection("Charge / Discharge","mdi:battery-charging",L`
        ${this._renderToggle("Charge Allowed","charge_allowed")}
        ${this._renderToggle("Discharge Allowed","discharge_allowed")}
        ${this._renderSlider("Charge Power","charge_power"," W")}
        ${this._renderSlider("Discharge Power","discharge_power"," W")}
      `)}

      <!-- Battery Limits -->
      ${this._renderSection("Battery Limits","mdi:battery-medium",L`
        ${this._renderSlider("Min SOC","min_soc","%")}
        ${this._renderSlider("Max SOC","max_soc","%")}
      `)}

      <!-- Grid Settings -->
      ${this._renderSection("Grid Settings","mdi:transmission-tower",L`
        ${this._renderSlider("Idle Setpoint","idle_setpoint"," W")}
        ${this._renderSlider("Min Grid Setpoint","min_grid_setpoint"," W")}
        ${this._renderSlider("Max Grid Setpoint","max_grid_setpoint"," W")}
      `)}

      <!-- Auto Mode (visible only when mode=auto) -->
      ${s?this._renderSection("Auto Mode","mdi:auto-fix",L`
        ${this._renderSlider("Cheapest Hours","cheapest_hours_auto_charge"," h")}
        ${this._renderSlider("Expensive Hours","expensive_hours_auto_discharge"," h")}
        ${this._renderSlider("Charge Price Threshold","charge_price_threshold"," ct/kWh")}
        ${this._renderSlider("Discharge Price Threshold","discharge_price_threshold"," ct/kWh")}
      `):V}

      <!-- Grid Feed-in -->
      ${this._renderSection("Grid Feed-in","mdi:solar-power",L`
        ${this._renderToggle("Feed-in Control","grid_feed_in_control")}
        ${o?L`
          ${this._renderSlider("Price Threshold","grid_feed_in_price_threshold"," ct/kWh")}
          ${this._renderSlider("Default Max Feed-in","default_max_grid_feed_in"," W")}
          ${this._renderSlider("Reduced Max Feed-in","reduced_max_grid_feed_in"," W")}
        `:V}
      `)}

      <!-- Blocked Hours -->
      ${this._renderSection("Blocked Hours","mdi:clock-alert",L`
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
      </div>`}render(){if(!this.hass||!this.config)return V;if(!this._state("select","control_mode"))return L`
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
        </ha-card>`;const t=this._val("sensor","desired_action")||"idle",e=ut[t]||ut.idle;return L`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
            <span>${this.config.title}</span>
          </div>
          <div class="header-badge" data-action=${t}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </div>
        </div>
        <div class="card-content">
          ${0===this._activeTab?this._renderControlsView():V}
        </div>
      </ha-card>`}static get styles(){return o`
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
    `}}),customElements.define(dt,class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config={...t}}_changed(t,e){this.config={...this.config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config}}))}render(){return this.config?L`
      <div class="editor">
        <div class="row">
          <label for="title">Title</label>
          <input id="title" type="text"
            .value=${this.config.title||"Victron Charge Control"}
            @input=${t=>this._changed("title",t.target.value)}
          />
        </div>
        <div class="row">
          <label for="prefix">Entity Prefix</label>
          <input id="prefix" type="text"
            .value=${this.config.entity_prefix||lt}
            @input=${t=>this._changed("entity_prefix",t.target.value)}
          />
          <small>Common prefix of all entity IDs (e.g. victron_charge_control)</small>
        </div>
      </div>`:V}static get styles(){return o`
      .editor { padding: 16px; }
      .row { display: flex; flex-direction: column; margin-bottom: 12px; }
      label { font-size: 0.85em; font-weight: 500; margin-bottom: 4px; color: var(--primary-text-color); }
      input {
        padding: 8px; border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px; font-size: 0.9em; font-family: inherit;
      }
      small { font-size: 0.75em; color: var(--secondary-text-color); margin-top: 4px; }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:ct,name:"Victron Charge Controller",description:"Control and monitor your Victron ESS charge controller",preview:!0}),console.info("%c VICTRON-CHARGE-CONTROLLER-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;","color: #03a9f4; background: transparent; font-weight: 700; border: 1px solid #03a9f4; border-radius: 0 4px 4px 0; padding: 2px 6px;");
