(function(t){function e(e){for(var n,r,l=e[0],o=e[1],c=e[2],d=0,p=[];d<l.length;d++)r=l[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,l=1;l<a.length;l++){var o=a[l];0!==s[o]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},s={app:0},i=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"container"},[a("home-view")],1)])},i=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main-component",{attrs:{beeps:t.beeps.data(),loading:t.beeps.loading,loaded:t.beeps.loaded},on:{reload:function(e){return t.beeps.reload()}}})},l=[],o=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("d4ec")),c=a("bee2"),u=function(){function t(){Object(o["a"])(this,t)}return Object(c["a"])(t,[{key:"loadBeeps",value:function(){return this.query("GET","/beeps")}},{key:"query",value:function(t,e,a,n){return new Promise((function(s,i){fetch(e+"?"+new URLSearchParams(n),{method:t,body:a&&JSON.stringify(a),headers:{"Content-Type":"application/json",cache:"no-cache"}}).then((function(t){if(!t.ok)throw new Error(t.statusText);s(t.json())})).catch(i)}))}}]),t}(),d=u,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"title"},[t._v("Beeps.")]),a("section",{staticClass:"section"},[a("beep-input",{attrs:{user:"mrkva fero"}}),a("login-form")],1),a("section",{staticClass:"section"},[t._l(t.beeps,(function(t){return[a("beep-list-item",{key:t.id,attrs:{beep:t}})]}))],2),a("button",{staticClass:"button is-warning is-small",on:{click:function(e){return t.$emit("reload")}}},[t._v("RELOAD")])])},f=[],v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",{staticClass:"media"},[a("figure",{staticClass:"media-left"},[a("p",{staticClass:"image is-64x64"},[a("avatar-placeholder",{attrs:{id:t.beep.author.email}})],1)]),a("div",{staticClass:"media-content"},[a("div",{staticClass:"content"},[a("p",[a("strong",[t._v(t._s(t.beep.author.email))]),t._v(" "),a("small",[t._v(t._s(t.beep.created.toLocaleString()))]),a("br"),t._v(" "+t._s(t.beep.body)+" ")])])])])},h=[],m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("img",{attrs:{src:"https://avatars.dicebear.com/api/"+t.variant+"/"+t.id+".svg",alt:"Avatar for "+t.id+"."}})},b=[],_={props:{id:{type:String,required:!0},variant:{type:String,default:"gridy"}}},y=_,g=a("2877"),C=Object(g["a"])(y,m,b,!1,null,null,null),j=C.exports,O={props:{beep:{type:Object,required:!0}},components:{AvatarPlaceholder:j}},w=O,x=Object(g["a"])(w,v,h,!1,null,null,null),k=x.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",{staticClass:"media"},[a("figure",{staticClass:"media-left"},[a("p",{staticClass:"image is-64x64"},[a("avatar-placeholder",{attrs:{id:t.user}})],1)]),t._m(0)])},S=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"media-content"},[a("div",{staticClass:"field"},[a("p",{staticClass:"control"},[a("textarea",{staticClass:"textarea",attrs:{placeholder:"Add a beep..."}})])]),a("nav",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("div",{staticClass:"level-item"},[a("a",{staticClass:"button is-info"},[t._v("Submit")])])]),a("div",{staticClass:"level-right"},[a("div",{staticClass:"level-item"})])])])}],P={props:{user:{type:String}},components:{AvatarPlaceholder:j}},$=P,T=Object(g["a"])($,E,S,!1,null,null,null),B=T.exports,A=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},D=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"field"},[a("p",{staticClass:"control has-icons-left has-icons-right"},[a("input",{staticClass:"input",attrs:{type:"email",placeholder:"Email"}}),a("span",{staticClass:"icon is-small is-left"},[a("i",{staticClass:"fas fa-envelope"})]),a("span",{staticClass:"icon is-small is-right"},[a("i",{staticClass:"fas fa-check"})])])]),a("div",{staticClass:"field"},[a("p",{staticClass:"control has-icons-left"},[a("input",{staticClass:"input",attrs:{type:"password",placeholder:"Password"}}),a("span",{staticClass:"icon is-small is-left"},[a("i",{staticClass:"fas fa-lock"})])])]),a("div",{staticClass:"field"},[a("p",{staticClass:"control"},[a("button",{staticClass:"button is-success"},[t._v(" Login ")])])])])}],L={components:{}},M=L,q=Object(g["a"])(M,A,D,!1,null,null,null),J=q.exports,R={props:{beeps:{type:Array},loading:{type:Boolean},loaded:{type:Boolean}},components:{BeepListItem:k,BeepInput:B,LoginForm:J}},I=R,F=Object(g["a"])(I,p,f,!1,null,"504c8fcd",null),G=F.exports,H=(a("d81d"),a("96cf"),a("1da1")),N=a("1315"),U=function(t){return"undefined"===typeof t||null===t||t instanceof N["DateTime"]?t:t instanceof Date?N["DateTime"].fromJSDate(t):N["DateTime"].fromMillis(t)},V=function(){function t(e){Object(o["a"])(this,t),this._connector=e,this._data=null,this.loading=!1,this.loaded=!1,this.reset()}return Object(c["a"])(t,[{key:"reload",value:function(){var t=Object(H["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,this._connector.loadBeeps();case 3:e=t.sent,this._data=e.data.map((function(t){var e,a,n;return t.created=U(null===(e=t.created)||void 0===e?void 0:e.js),t.published=U(null===(a=t.published)||void 0===a?void 0:a.js),t.updated=U(null===(n=t.updated)||void 0===n?void 0:n.js),t})),this.loading=!1,this.loaded=!0;case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"reset",value:function(){this.loaded=!1,this.loading=!1}},{key:"data",value:function(){return this.loaded?this._data:null}}]),t}(),z=V,K={components:{MainComponent:G},data:function(){return{beeps:new z(new d)}},mounted:function(){this.beeps.reload()}},Q=K,W=Object(g["a"])(Q,r,l,!1,null,null,null),X=W.exports,Y={components:{HomeView:X}},Z=Y,tt=Object(g["a"])(Z,s,i,!1,null,null,null),et=tt.exports,at=(a("abe2"),a("289d"));n["a"].use(at["a"]),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(et)}}).$mount("#app")},abe2:function(t,e,a){}});
//# sourceMappingURL=app.b8b3b139.js.map