import{b as we}from"./chunk-4BZJI3GO.js";import{$ as x,Fa as Ie,Ia as Ee,Ja as X,O as Te,U as K,Y as Ce,Z as xe,_ as Z,fa as J,ia as W}from"./chunk-UXAPX6VQ.js";import{c as ve,d as ae,f as re,g as le,h as ce}from"./chunk-S35HUXPS.js";import{f as G}from"./chunk-N63SZ2MC.js";import{a as be,b as ye}from"./chunk-QIMRRRQA.js";import{Ab as m,Bb as C,Cb as ie,Da as i,Db as ue,Ea as me,Hb as A,Jb as B,Ka as fe,Kb as _e,Oa as v,Pa as V,Q as F,R as N,Rb as he,Sa as k,Ua as ge,V as te,Va as s,Vb as oe,W as P,a as pe,ab as g,bb as r,ca as S,da as $,ea as se,fb as M,ga as y,jc as L,kb as c,la as H,lb as l,lc as R,mb as T,mc as z,nb as I,nc as U,o as Q,ob as w,oc as D,pb as b,qb as j,rb as O,sb as f,tb as q,ub as E,vb as u,xb as _,yb as h,z as ee,zb as ne}from"./chunk-73DFFZXF.js";var Fe=class e{constructor(o,t){this.http=o;this.router=t}apiURL="http://127.0.0.1:8000/api";getToken(){return localStorage.getItem("authToken")}getHeaders(){let o=this.getToken();return new be(pe({"Content-Type":"application/json"},o?{Authorization:`Bearer ${o}`}:{}))}getRooms(o=1,t=4){return this.http.get(this.apiURL.concat(`/rooms?page=${o}&limit=${t}`),{headers:this.getHeaders()}).pipe(ee(a=>a.status===401||a.status===403?(localStorage.removeItem("authToken"),this.router.navigate(["/login"]),Q(()=>new Error("No autorizado. Redirigiendo al login..."))):Q(()=>a)))}getRoom(o){return this.http.get(this.apiURL.concat(`/rooms/show?hab_id=${o}`),{headers:this.getHeaders()}).pipe(ee(t=>t.status===401||t.status===403?(localStorage.removeItem("authToken"),this.router.navigate(["/login"]),Q(()=>new Error("No autorizado. Redirigiendo al login..."))):Q(()=>t)))}static \u0275fac=function(t){return new(t||e)(te(ye),te(G))};static \u0275prov=F({token:e,factory:e.\u0275fac,providedIn:"root"})};var Se=(()=>{class e extends Ie{pathId;ngOnInit(){this.pathId="url(#"+K()+")"}static \u0275fac=(()=>{let t;return function(n){return(t||(t=y(e)))(n||e)}})();static \u0275cmp=v({type:e,selectors:[["PlusIcon"]],features:[k],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(a,n){a&1&&(se(),c(0,"svg",0)(1,"g"),T(2,"path",1),l(),c(3,"defs")(4,"clipPath",2),T(5,"rect",3),l()()()),a&2&&(M(n.getClassNames()),g("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role),i(),g("clip-path",n.pathId),i(3),r("id",n.pathId))},encapsulation:2})}return e})();var Oe=["header"],Be=["title"],Ne=["subtitle"],Pe=["content"],He=["footer"],Ve=["*",[["p-header"]],[["p-footer"]]],qe=["*","p-header","p-footer"];function Ae(e,o){e&1&&b(0)}function Le(e,o){if(e&1&&(c(0,"div",8),E(1,1),s(2,Ae,1,0,"ng-container",6),l()),e&2){let t=f();i(2),r("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function ze(e,o){if(e&1&&(I(0),m(1),w()),e&2){let t=f(2);i(),C(t.header)}}function Ue(e,o){e&1&&b(0)}function Ge(e,o){if(e&1&&(c(0,"div",9),s(1,ze,2,1,"ng-container",10)(2,Ue,1,0,"ng-container",6),l()),e&2){let t=f();i(),r("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),i(),r("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function Ke(e,o){if(e&1&&(I(0),m(1),w()),e&2){let t=f(2);i(),C(t.subheader)}}function Ze(e,o){e&1&&b(0)}function Je(e,o){if(e&1&&(c(0,"div",11),s(1,Ke,2,1,"ng-container",10)(2,Ze,1,0,"ng-container",6),l()),e&2){let t=f();i(),r("ngIf",t.subheader&&!t._subtitleTemplate&&!t.subtitleTemplate),i(),r("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function We(e,o){e&1&&b(0)}function Xe(e,o){e&1&&b(0)}function Ye(e,o){if(e&1&&(c(0,"div",12),E(1,2),s(2,Xe,1,0,"ng-container",6),l()),e&2){let t=f();i(2),r("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var et=({dt:e})=>`
.p-card {
    background: ${e("card.background")};
    color: ${e("card.color")};
    box-shadow: ${e("card.shadow")};
    border-radius: ${e("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${e("card.caption.gap")};
}

.p-card-body {
    padding: ${e("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${e("card.body.gap")};
}

.p-card-title {
    font-size: ${e("card.title.font.size")};
    font-weight: ${e("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${e("card.subtitle.color")};
}
`,tt={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},$e=(()=>{class e extends J{name="card";theme=et;classes=tt;static \u0275fac=(()=>{let t;return function(n){return(t||(t=y(e)))(n||e)}})();static \u0275prov=F({token:e,factory:e.\u0275fac})}return e})();var nt=(()=>{class e extends W{header;subheader;set style(t){Te(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=fe(null);_componentStyle=P($e);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=y(e)))(n||e)}})();static \u0275cmp=v({type:e,selectors:[["p-card"]],contentQueries:function(a,n,p){if(a&1&&(u(p,Ce,5),u(p,xe,5),u(p,Oe,4),u(p,Be,4),u(p,Ne,4),u(p,Pe,4),u(p,He,4),u(p,Z,4)),a&2){let d;_(d=h())&&(n.headerFacet=d.first),_(d=h())&&(n.footerFacet=d.first),_(d=h())&&(n.headerTemplate=d.first),_(d=h())&&(n.titleTemplate=d.first),_(d=h())&&(n.subtitleTemplate=d.first),_(d=h())&&(n.contentTemplate=d.first),_(d=h())&&(n.footerTemplate=d.first),_(d=h())&&(n.templates=d)}},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[A([$e]),k],ngContentSelectors:qe,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[4,"ngIf"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(a,n){a&1&&(q(Ve),c(0,"div",0),s(1,Le,3,1,"div",1),c(2,"div",2),s(3,Ge,3,2,"div",3)(4,Je,3,2,"div",4),c(5,"div",5),E(6),s(7,We,1,0,"ng-container",6),l(),s(8,Ye,3,1,"div",7),l()()),a&2&&(M(n.styleClass),r("ngClass","p-card p-component")("ngStyle",n._style()),g("data-pc-name","card"),i(),r("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),i(2),r("ngIf",n.header||n.titleTemplate||n._titleTemplate),i(),r("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),i(3),r("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),i(),r("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[D,L,R,U,z,x],encapsulation:2,changeDetection:0})}return e})(),Me=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=V({type:e});static \u0275inj=N({imports:[nt,x,x]})}return e})();var it=["header"],ot=["expandicon"],at=["collapseicon"],rt=["content"],lt=["*",[["p-header"]]],ct=["*","p-header"],dt=(e,o)=>({"p-fieldset p-component":!0,"p-fieldset-toggleable":e,"p-fieldset-expanded":o}),pt=e=>({transitionParams:e,height:"0"}),st=e=>({value:"hidden",params:e}),mt=e=>({transitionParams:e,height:"*"}),ft=e=>({value:"visible",params:e});function gt(e,o){e&1&&T(0,"PlusIcon",11),e&2&&(r("styleClass","p-fieldset-toggler"),g("data-pc-section","togglericon"))}function ut(e,o){e&1&&b(0)}function _t(e,o){if(e&1&&(c(0,"span",12),s(1,ut,1,0,"ng-container",6),l()),e&2){let t=f(3);g("data-pc-section","togglericon"),i(),r("ngTemplateOutlet",t.expandIconTemplate||t._expandIconTemplate)}}function ht(e,o){if(e&1&&(I(0),s(1,gt,1,2,"PlusIcon",9)(2,_t,2,2,"span",10),w()),e&2){let t=f(2);i(),r("ngIf",!t.expandIconTemplate&&!t._expandIconTemplate),i(),r("ngIf",t.expandIconTemplate||t._expandIconTemplate)}}function bt(e,o){e&1&&T(0,"MinusIcon",11),e&2&&(r("styleClass","p-fieldset-toggler"),g("aria-hidden",!0)("data-pc-section","togglericon"))}function yt(e,o){e&1&&b(0)}function vt(e,o){if(e&1&&(c(0,"span",12),s(1,yt,1,0,"ng-container",6),l()),e&2){let t=f(3);g("data-pc-section","togglericon"),i(),r("ngTemplateOutlet",t.collapseIconTemplate||t._collapseIconTemplate)}}function Tt(e,o){if(e&1&&(I(0),s(1,bt,1,3,"MinusIcon",9)(2,vt,2,2,"span",10),w()),e&2){let t=f(2);i(),r("ngIf",!t.collapseIconTemplate&&!t._collapseIconTemplate),i(),r("ngIf",t.collapseIconTemplate||t._collapseIconTemplate)}}function Ct(e,o){e&1&&b(0)}function xt(e,o){if(e&1){let t=j();I(0),c(1,"button",7),O("click",function(n){S(t);let p=f();return $(p.toggle(n))})("keydown",function(n){S(t);let p=f();return $(p.onKeyDown(n))}),s(2,ht,3,2,"ng-container",8)(3,Tt,3,2,"ng-container",8)(4,Ct,1,0,"ng-container",6),l(),w()}if(e&2){let t=f(),a=ne(4);i(),g("id",t.id+"_header")("aria-controls",t.id+"_content")("aria-expanded",!t.collapsed)("aria-label",t.buttonAriaLabel),i(),r("ngIf",t.collapsed),i(),r("ngIf",!t.collapsed),i(),r("ngTemplateOutlet",a)}}function It(e,o){e&1&&b(0)}function wt(e,o){if(e&1&&(c(0,"span",13),m(1),l(),E(2,1),s(3,It,1,0,"ng-container",6)),e&2){let t=f();g("data-pc-section","legendtitle"),i(),C(t.legend),i(2),r("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function Et(e,o){e&1&&b(0)}var Ft=({dt:e})=>`
.p-fieldset {
    background: ${e("fieldset.background")};
    border: 1px solid ${e("fieldset.border.color")};
    border-radius: ${e("fieldset.border.radius")};
    color: ${e("fieldset.color")};
    padding:  ${e("fieldset.padding")};
    margin: 0;
}

.p-fieldset-legend {
    background: ${e("fieldset.legend.background")};
    border-radius: ${e("fieldset.legend.border.radius")};
    border-width: ${e("fieldset.legend.border.width")};
    border-style: solid;
    border-color: ${e("fieldset.legend.border.color")};
    padding: ${e("fieldset.legend.padding")};
    transition: background ${e("fieldset.transition.duration")}, color ${e("fieldset.transition.duration")}, outline-color ${e("fieldset.transition.duration")}, box-shadow ${e("fieldset.transition.duration")};
}

.p-fieldset-toggleable > .p-fieldset-legend {
    padding: 0;
}

.p-fieldset-toggle-button {
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    display: flex;
    gap: ${e("fieldset.legend.gap")};
    align-items: center;
    justify-content: center;
    padding: ${e("fieldset.legend.padding")};
    background: transparent;
    border: 0 none;
    border-radius: ${e("fieldset.legend.border.radius")};
    transition: background ${e("fieldset.transition.duration")}, color ${e("fieldset.transition.duration")}, outline-color ${e("fieldset.transition.duration")}, box-shadow ${e("fieldset.transition.duration")};
    outline-color: transparent;
}

.p-fieldset-legend-label {
    font-weight: ${e("fieldset.legend.font.weight")};
}

.p-fieldset-toggle-button:focus-visible {
    box-shadow: ${e("fieldset.legend.focus.ring.shadow")};
    outline: ${e("fieldset.legend.focus.ring.width")} ${e("fieldset.legend.focus.ring.style")} ${e("fieldset.legend.focus.ring.color")};
    outline-offset: ${e("fieldset.legend.focus.ring.offset")};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover {
    color: ${e("fieldset.legend.hover.color")};
    background: ${e("fieldset.legend.hover.background")};
}

.p-fieldset-toggle-icon {
    color: ${e("fieldset.toggle.icon.color")};
    transition: color ${e("fieldset.transition.duration")};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
    color: ${e("fieldset.toggle.icon.hover.color")};
}

.p-fieldset .p-fieldset-content {
    padding: ${e("fieldset.content.padding")};
}

/* For PrimeNG */
.p-fieldset-toggleable.p-fieldset-expanded > .p-fieldset-content-container:not(.ng-animating) {
    overflow: visible
}

.p-fieldset-toggleable .p-fieldset-content-container {
    overflow: hidden;
}
`,St={root:({props:e})=>["p-fieldset p-component",{"p-fieldset-toggleable":e.toggleable}],legend:"p-fieldset-legend",legendLabel:"p-fieldset-legend-label",toggleButton:"p-fieldset-toggle-button",toggleIcon:"p-fieldset-toggle-icon",contentContainer:"p-fieldset-content-container",content:"p-fieldset-content"},Re=(()=>{class e extends J{name="fieldset";theme=Ft;classes=St;static \u0275fac=(()=>{let t;return function(n){return(t||(t=y(e)))(n||e)}})();static \u0275prov=F({token:e,factory:e.\u0275fac})}return e})();var de=(()=>{class e extends W{legend;toggleable;collapsed=!1;style;styleClass;transitionOptions="400ms cubic-bezier(0.86, 0, 0.07, 1)";collapsedChange=new H;onBeforeToggle=new H;onAfterToggle=new H;get id(){return K("pn_id_")}get buttonAriaLabel(){return this.legend}animating;_componentStyle=P(Re);headerTemplate;expandIconTemplate;collapseIconTemplate;contentTemplate;toggle(t){if(this.animating)return!1;this.animating=!0,this.onBeforeToggle.emit({originalEvent:t,collapsed:this.collapsed}),this.collapsed?this.expand():this.collapse(),this.onAfterToggle.emit({originalEvent:t,collapsed:this.collapsed}),t.preventDefault()}onKeyDown(t){(t.code==="Enter"||t.code==="Space")&&(this.toggle(t),t.preventDefault())}expand(){this.collapsed=!1,this.collapsedChange.emit(this.collapsed)}collapse(){this.collapsed=!0,this.collapsedChange.emit(this.collapsed)}getBlockableElement(){return this.el.nativeElement.children[0]}onToggleDone(){this.animating=!1}_headerTemplate;_expandIconTemplate;_collapseIconTemplate;_contentTemplate;templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"expandicon":this._expandIconTemplate=t.template;break;case"collapseicon":this._collapseIconTemplate=t.template;break;case"content":this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=y(e)))(n||e)}})();static \u0275cmp=v({type:e,selectors:[["p-fieldset"]],contentQueries:function(a,n,p){if(a&1&&(u(p,it,4),u(p,ot,4),u(p,at,4),u(p,rt,4),u(p,Z,4)),a&2){let d;_(d=h())&&(n.headerTemplate=d.first),_(d=h())&&(n.expandIconTemplate=d.first),_(d=h())&&(n.collapseIconTemplate=d.first),_(d=h())&&(n.contentTemplate=d.first),_(d=h())&&(n.templates=d)}},inputs:{legend:"legend",toggleable:[2,"toggleable","toggleable",oe],collapsed:[2,"collapsed","collapsed",oe],style:"style",styleClass:"styleClass",transitionOptions:"transitionOptions"},outputs:{collapsedChange:"collapsedChange",onBeforeToggle:"onBeforeToggle",onAfterToggle:"onAfterToggle"},features:[A([Re]),ge,k],ngContentSelectors:ct,decls:9,vars:28,consts:[["legendContent",""],[3,"ngClass","ngStyle"],[1,"p-fieldset-legend"],[4,"ngIf","ngIfElse"],["role","region",1,"p-fieldset-content-container"],[1,"p-fieldset-content"],[4,"ngTemplateOutlet"],["tabindex","0","role","button",1,"p-fieldset-toggle-button",3,"click","keydown"],[4,"ngIf"],[3,"styleClass",4,"ngIf"],["class","p-fieldset-toggler",4,"ngIf"],[3,"styleClass"],[1,"p-fieldset-toggler"],[1,"p-fieldset-legend-label"]],template:function(a,n){if(a&1){let p=j();q(lt),c(0,"fieldset",1)(1,"legend",2),s(2,xt,5,7,"ng-container",3)(3,wt,4,3,"ng-template",null,0,he),l(),c(5,"div",4),O("@fieldsetContent.done",function(){return S(p),$(n.onToggleDone())}),c(6,"div",5),E(7),s(8,Et,1,0,"ng-container",6),l()()()}if(a&2){let p=ne(4);M(n.styleClass),r("ngClass",_e(17,dt,n.toggleable,!n.collapsed&&n.toggleable))("ngStyle",n.style),g("id",n.id)("data-pc-name","fieldset")("data-pc-section","root"),i(),g("data-pc-section","legend"),i(),r("ngIf",n.toggleable)("ngIfElse",p),i(3),r("@fieldsetContent",n.collapsed?B(22,st,B(20,pt,n.transitionOptions)):B(26,ft,B(24,mt,n.animating?n.transitionOptions:"0ms"))),g("id",n.id+"_content")("aria-labelledby",n.id+"_header")("aria-hidden",n.collapsed)("data-pc-section","toggleablecontent"),i(),g("data-pc-section","content"),i(2),r("ngTemplateOutlet",n.contentTemplate||n._contentTemplate)}},dependencies:[D,L,R,U,z,X,we,Se,x],encapsulation:2,data:{animation:[ve("fieldsetContent",[le("hidden",re({height:"0"})),le("visible",re({height:"*"})),ce("visible <=> hidden",[ae("{{transitionParams}}")]),ce("void => *",ae(0))])]},changeDetection:0})}return e})(),De=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=V({type:e});static \u0275inj=N({imports:[de,x,x]})}return e})();function kt(e,o){if(e&1&&(c(0,"b",13),m(1),l()),e&2){let t=f();i(),C(t.room.paciente.pac_fecha_ingreso)}}function Mt(e,o){e&1&&(c(0,"b",13),m(1,"\xA0"),l())}function Rt(e,o){e&1&&(c(0,"div")(1,"b",14),m(2,"Ocupat"),l()())}function Dt(e,o){e&1&&(c(0,"div")(1,"b",14),m(2,"Lliure"),l()())}function Qt(e,o){if(e&1){let t=j();c(0,"div",15)(1,"p-button",16),O("click",function(){S(t);let n=f();return $(n.openRoom())}),l(),c(2,"div",17)(3,"b"),m(4,"Edat"),l(),m(5),l(),c(6,"div",18)(7,"b"),m(8,"Nom"),l(),m(9),l()()}if(e&2){let t=f();i(5),ie(" | ",t.room.paciente.pac_edad,""),i(4),ue(" | ",t.room.paciente.pac_nombre," ",t.room.paciente.pac_apellidos,"")}}function jt(e,o){e&1&&(c(0,"div",15),T(1,"p-button",19),c(2,"div",17)(3,"b"),m(4,"Edat"),l(),m(5," |"),l(),c(6,"div",18)(7,"b"),m(8,"Nom"),l(),m(9," |"),l()()),e&2&&(i(),r("disabled",!0))}var Qe=class e{constructor(o){this.router=o}room;openRoom(){this.router.navigate(["habitacions",this.room.hab_id])}static \u0275fac=function(t){return new(t||e)(me(G))};static \u0275cmp=v({type:e,selectors:[["app-room-card"]],inputs:{room:"room"},decls:19,vars:9,consts:[[1,"card","w-full","!p-0","!pb-3"],[1,"flex","flex-row"],[1,"flex","justify-between","items-center","p-5","bg-[var(--primary-color)]","rounded-tl-[var(--content-border-radius)]","rounded-br-[var(--content-border-radius)]","w-[10rem]","text-center"],[1,"text-white","text-4xl","font-bold"],[1,"p-5","flex","gap-3","items-center","w-4/6"],[1,"text-2xl"],["class","text-lg mt-1 pl-2 border-l-2 border-blue-600",4,"ngIf"],[1,"p-5","w-1/6","flex","flex-col","justify-center","items-center"],[4,"ngIf"],[1,"!m-5","mt-1","!mb-2"],["legend","Observacions",1,"m-5","!p-0",3,"toggleable"],[1,"h-[57px]","overflow-hidden","line-clamp-3","break-words","text-lg","justify-center"],["class","flex gap-5 max-h-[40px] min-h-[40px]",4,"ngIf"],[1,"text-lg","mt-1","pl-2","border-l-2","border-blue-600"],[1,"text-xl"],[1,"flex","gap-5","max-h-[40px]","min-h-[40px]"],["iconPos","right","icon","pi pi-arrow-right","label","Entrar","size","large",1,"w-1/4","flex","justify-between",3,"click"],[1,"p-3","border","border-[var(--p-fieldset-border-color)]","rounded-[var(--content-border-radius)]","w-1/4","truncate"],[1,"p-3","border","border-[var(--p-fieldset-border-color)]","rounded-[var(--content-border-radius)]","w-2/4","truncate"],["iconPos","right","icon","pi pi-arrow-right","label","Entrar l'habitaci\xF3","size","large",1,"w-1/4","flex","justify-between",3,"disabled"]],template:function(t,a){t&1&&(c(0,"div",0)(1,"div",1)(2,"div",2)(3,"span",3),m(4),l()(),c(5,"div",4)(6,"b",5),m(7,"Data"),l(),s(8,kt,2,1,"b",6)(9,Mt,2,0,"b",6),l(),c(10,"div",7),s(11,Rt,3,0,"div",8)(12,Dt,3,0,"div",8),l()(),c(13,"div",9)(14,"p-fieldset",10)(15,"p",11),m(16),l()(),s(17,Qt,10,3,"div",12)(18,jt,10,1,"div",12),l()()),t&2&&(i(4),C(a.room.hab_id),i(4),r("ngIf",a.room.paciente!==null),i(),r("ngIf",a.room.paciente===null),i(2),r("ngIf",a.room.paciente!==null),i(),r("ngIf",a.room.paciente===null),i(2),r("toggleable",!1),i(2),ie(" ",a.room.hab_obs," "),i(),r("ngIf",a.room.paciente!==null),i(),r("ngIf",a.room.paciente===null))},dependencies:[D,R,Me,De,de,X,Ee],encapsulation:2})};export{Me as a,Fe as b,De as c,Qe as d};
