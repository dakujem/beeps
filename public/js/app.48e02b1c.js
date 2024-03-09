(function(e){function t(t){for(var n,i,o=t[0],c=t[1],u=t[2],f=0,p=[];f<o.length;f++)i=o[f],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var c=r[o];0!==s[c]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},s={app:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},4702:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("link",{attrs:{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css",integrity:"sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==",crossorigin:"anonymous"}}),r("div",{staticClass:"container"},[r("home-view")],1)])},a=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main-layout",{scopedSlots:e._u([{key:"default",fn:function(){return[r("beeps-list",{attrs:{beeps:e.beeps.data(),loading:e.beeps.loading,loaded:e.beeps.loaded},on:{reload:function(t){return e.beeps.reload()}}})]},proxy:!0},{key:"input",fn:function(){return[r("beep-input",{attrs:{connector:e.connector.binding(e.connector.postBeep),user:e.user},on:{submit:e.beepSubmitted}})]},proxy:!0},{key:"auth",fn:function(){return[r("user-auth",{attrs:{connector:e.connector.binding(e.connector.authenticate),user:e.user},on:{login:e.userLoggedIn,logout:e.userLoggedOut}})]},proxy:!0}])})},o=[],c=(r("99af"),r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("96cf"),r("1da1")),u=r("d4ec"),l=r("bee2"),f=(r("b0c0"),r("262e")),p=r("2caf"),d=r("9072"),h=function(e){Object(f["a"])(r,e);var t=Object(p["a"])(r);function r(e){var n,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return Object(u["a"])(this,r),n=t.call(this,e.statusText||"Connection to the API failed."),n.name="HttpError",n.cause=a,n.response=e,n.data=s,n}return Object(l["a"])(r,[{key:"text",value:function(){return this.response.statusText}},{key:"code",value:function(){return this.response.statusCode}},{key:"content",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("undefined"!==typeof this.data&&null!==this.data){e.next=2;break}return e.abrupt("return",this.response.bodyUsed?null:this.response.json());case 2:return e.abrupt("return",this.data||null);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),r}(Object(d["a"])(Error)),m=h,v=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(u["a"])(this,e),this._bearer=t}return Object(l["a"])(e,[{key:"bearer",value:function(e){this._bearer=e}},{key:"binding",value:function(e){var t=this;return function(r){for(var n=arguments.length,s=new Array(n>1?n-1:0),a=1;a<n;a++)s[a-1]=arguments[a];return e.call.apply(e,[t,r].concat(s))}}},{key:"loadBeeps",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.query("GET","/api/beeps"));case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"postBeep",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.query("POST","/api/beeps",t));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"authenticate",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.query("POST","/api/session",t));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"query",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t,r){var n,s,a=this,i=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=i.length>2&&void 0!==i[2]?i[2]:null,s=i.length>3&&void 0!==i[3]?i[3]:null,e.abrupt("return",new Promise((function(e,i){var o={"Content-Type":"application/json",cache:"no-cache"};return a._bearer&&(o.authorization="Bearer ".concat(a._bearer)),fetch(r+(s?"?"+new URLSearchParams(s):""),{method:t.toUpperCase(),body:n&&JSON.stringify(n),headers:o}).then((function(t){if(!t.ok)throw new m(t);e(t.json())})).catch((function(e){i(e)}))})));case 3:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"fuck__query",value:function(e,t,r,n){return new Promise((function(s,a){fetch(t+"?"+new URLSearchParams(n),{method:e,body:r&&JSON.stringify(r),headers:{"Content-Type":"application/json",cache:"no-cache"}}).then((function(e){if(!e.ok)throw new Error(e.statusText);s(e.json())})).catch(a)}))}}]),e}(),b=v,g=(r("d81d"),r("1315")),y=function(e){return"undefined"===typeof e||null===e||e instanceof g["DateTime"]?e:e instanceof Date?g["DateTime"].fromJSDate(e):g["DateTime"].fromMillis(e)},_=function(){function e(t){Object(u["a"])(this,e),this._connector=t,this._data=null,this.loading=!1,this.loaded=!1,this.reset()}return Object(l["a"])(e,[{key:"reload",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,this._connector.loadBeeps();case 3:t=e.sent,this._data=t.data.map((function(e){var t,r,n;return e.created=y(null===(t=e.created)||void 0===t?void 0:t.js),e.published=y(null===(r=e.published)||void 0===r?void 0:r.js),e.updated=y(null===(n=e.updated)||void 0===n?void 0:n.js),e})),this.loading=!1,this.loaded=!0;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"reset",value:function(){this.loaded=!1,this.loading=!1}},{key:"data",value:function(){return this.loaded?this._data:null}}]),e}(),k=_,w=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pt-4"},[r("h1",{staticClass:"title mb-0"},[e._v("🦚 beeps.")]),e._m(0),r("section",{staticClass:"section pt-1"},[e._t("input"),e._t("auth")],2),r("section",{staticClass:"section"},[e._t("default")],2),e._m(1)])},x=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"links has-text-right is-size-4"},[r("a",{attrs:{href:"https://dev.to/dakujem",title:"The author's blog"}},[r("i",{staticClass:"fab fa-dev"})]),r("a",{attrs:{href:"https://github.com/dakujem/beeps",title:"GitHub: dakujem/beeps (sources)"}},[r("i",{staticClass:"fab fa-github"})])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section is-size-7 has-text-grey-light"},[r("p",[e._v(" The authors and providers of the site are not responsible for the content. E-mail addresses are not checked for validity and should thus be treated as purely fictional. ")]),r("p",[e._v(" The source code can be found on GitHub "),r("i",{staticClass:"fab fa-github"}),e._v(": "),r("a",{attrs:{href:"https://github.com/dakujem/beeps"}},[e._v("dakujem/beeps")]),e._v(". ")])])}],C={props:{},components:{}},O=C,j=(r("c525"),r("2877")),E=Object(j["a"])(O,w,x,!1,null,"66bcc625",null),S=E.exports,$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"beeps-list"},[e.loading?[e._m(0)]:e._e(),e.loaded?[e._l(e.beeps,(function(e){return[r("beep-list-item",{key:e.id,attrs:{beep:e}})]}))]:e._e(),r("button",{staticClass:"button is-warning is-small",on:{click:function(t){return e.$emit("reload")}}},[e._v("RELOAD")])],2)},R=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"block"},[r("span",{staticClass:"tag is-success is-medium"},[e._v(" LOADING... ")])])}],P=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("article",{staticClass:"media"},[r("figure",{staticClass:"media-left"},[r("p",{staticClass:"image is-64x64"},[r("avatar-placeholder",{attrs:{id:e.beep.author.email}})],1)]),r("div",{staticClass:"media-content"},[r("div",{staticClass:"content"},[r("p",[r("strong",[e._v(e._s(e.beep.author.email))]),e._v(" "),r("small",[e._v(e._s(e.beep.created.toLocaleString()))]),e._v(" "),e.beep.public?e._e():r("small",{attrs:{title:"Private beep."}},[r("i",{staticClass:"fas fa-lock"})]),r("br"),e._v(" "+e._s(e.beep.body)+" ")])])])])},T=[],I=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("img",{attrs:{src:"https://api.dicebear.com/7.x/"+e.variant+"/svg?seed="+e.md5(e.id),alt:"Avatar for "+e.id+"."}})},L=[],A=r("6821"),B=r.n(A),D={props:{id:{type:String,required:!0},variant:{type:String,default:"bottts"}},methods:{md5:function(e){return B()(e)}}},q=D,z=Object(j["a"])(q,I,L,!1,null,null,null),U=z.exports,M={props:{beep:{type:Object,required:!0}},components:{AvatarPlaceholder:U}},F=M,G=Object(j["a"])(F,P,T,!1,null,null,null),N=G.exports,J={props:{beeps:{type:Array},loading:{type:Boolean},loaded:{type:Boolean}},components:{BeepListItem:N}},H=J,Z=Object(j["a"])(H,$,R,!1,null,"434b0aa8",null),K=Z.exports,V=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.user?e._e():r("div",{staticClass:"section"},[r("div",{staticClass:"block"},[e._v(" Log in to beep some. ")])]),e.user?r("article",{staticClass:"media"},[r("figure",{staticClass:"media-left"},[r("p",{staticClass:"image is-64x64",attrs:{title:"That's you!"}},[r("avatar-placeholder",{attrs:{id:e.user}})],1)]),r("div",{staticClass:"media-content"},[r("div",{staticClass:"field"},[r("p",{staticClass:"control"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.text,expression:"form.text"}],staticClass:"textarea",attrs:{placeholder:"Beep some..."},domProps:{value:e.form.text},on:{input:function(t){t.target.composing||e.$set(e.form,"text",t.target.value)}}})]),e.form.errors.has("text")?r("p",{staticClass:"help is-danger"},[e._v(e._s(e.form.errors.get("text")))]):e._e()]),r("div",{staticClass:"field"},[r("p",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.public,expression:"form.public"}],staticClass:"checkbox mr-4",attrs:{type:"checkbox",id:"checkbox"},domProps:{checked:Array.isArray(e.form.public)?e._i(e.form.public,null)>-1:e.form.public},on:{change:function(t){var r=e.form.public,n=t.target,s=!!n.checked;if(Array.isArray(r)){var a=null,i=e._i(r,a);n.checked?i<0&&e.$set(e.form,"public",r.concat([a])):i>-1&&e.$set(e.form,"public",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.form,"public",s)}}}),r("label",{staticClass:"checkbox",attrs:{for:"checkbox"}},[r("span",{class:{strike:!e.form.public}},[e._v("Make it public.")]),e.form.public?e._e():r("span",{staticClass:"has-text-grey-light ml-4"},[e._v("We'll keep it private to this user only.")])])])]),r("nav",{staticClass:"level"},[r("div",{staticClass:"level-left"},[r("div",{staticClass:"level-item"},[r("button",{staticClass:"button is-primary is-large mr-4",attrs:{title:"Submit the post.",disabled:e.sending},on:{click:e.submitForm}},[e.sending?[e._v(" Beeping... ")]:[e._v(" Beep ")]],2),r("span",{staticClass:"has-text-grey-light"},[e._v(" as "+e._s(e.user)+" ")])])]),e._m(0)])])]):e._e()])},W=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"level-right"},[r("div",{staticClass:"level-item"})])}],Q=(r("b64b"),function(){function e(){Object(u["a"])(this,e),this._errors={}}return Object(l["a"])(e,[{key:"has",value:function(e){return Object.prototype.hasOwnProperty.call(this._errors,e)}},{key:"any",value:function(){return Object.keys(this._errors).length>0}},{key:"getFirst",value:function(e){if(this._errors[e])return this._errors[e][0]}},{key:"get",value:function(e){if(this._errors[e])return this._errors[e]}},{key:"record",value:function(e){this._errors=e}},{key:"clear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?delete this._errors[e]:this._errors={}}}]),e}()),X=Q,Y=function(){function e(t){for(var r in Object(u["a"])(this,e),this._originalData=t,t)this[r]=t[r];this.errors=new X}return Object(l["a"])(e,[{key:"data",value:function(){var e={};for(var t in this._originalData)e[t]=this[t];return e}},{key:"reset",value:function(){for(var e in this._originalData)this[e]=this._originalData[e];this.errors.clear()}},{key:"hook",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",t.then((function(e){return r.reset(),e})).catch(function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t instanceof m)){e.next=5;break}return e.next=3,t.content();case 3:n=e.sent,r.recordErrors((null===n||void 0===n?void 0:n.errors)||{});case 5:throw t;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onSuccess",value:function(){var e=this;return function(t){return e.reset(),t}}},{key:"onError",value:function(){var e=this;return function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(r){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(r instanceof m)){t.next=5;break}return t.next=3,r.content();case 3:n=t.sent,e.recordErrors((null===n||void 0===n?void 0:n.errors)||{});case 5:throw r;case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},{key:"hooks",value:function(){return[this.onSuccess(),this.onError()]}},{key:"recordErrors",value:function(e){this.errors.record(e)}}]),e}(),ee=Y,te={props:{connector:{type:[Function],required:!0}},methods:{makeConnection:function(){return this.connector.apply(this,arguments)}}},re={mixins:[te],props:{connector:{type:[Function],required:!0},user:{type:String}},data:function(){return{form:new ee({text:null,public:!1}),sending:!1}},components:{AvatarPlaceholder:U},mounted:function(){this.form.text=sessionStorage.getItem("text")},methods:{submitForm:function(){var e=this;this.sending=!0,this.makeConnection(this.form.data()).then((function(t){e.$emit("submit",null===t||void 0===t?void 0:t.data)})).then(this.form.onSuccess()).catch(this.form.onError()).catch(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r instanceof m){t.next=2;break}throw r;case 2:return t.t0=e,t.t1=r,t.next=6,r.content();case 6:t.t2=t.sent,t.t0.$emit.call(t.t0,"error",t.t1,t.t2);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).finally((function(){e.sending=!1}))}},watch:{"form.text":function(e){e?sessionStorage.setItem("text",e):sessionStorage.removeItem("text")}}},ne=re,se=(r("89cd"),Object(j["a"])(ne,V,W,!1,null,"600aeb9b",null)),ae=se.exports,ie=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("article",{staticClass:"media"},[r("figure",{staticClass:"media-left"},[e.user?e._e():r("p",{staticClass:"image is-64x64"},[e.userId?r("avatar-placeholder",{attrs:{id:e.userId}}):e._e()],1)]),r("div",{staticClass:"media-content"},[r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-half-desktop is-offset-one-quarter-desktop"},[e.user?e._e():r("form",{attrs:{action:"#",novalidate:""},on:{submit:function(t){return t.preventDefault(),e.submitForm()}}},[r("div",{staticClass:"field"},[r("p",{staticClass:"control has-icons-left has-icons-right"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.username,expression:"form.username"}],class:["input",e.usernameError?"is-danger":null],attrs:{type:"email",placeholder:"Email",disabled:e.sending},domProps:{value:e.form.username},on:{input:function(t){t.target.composing||e.$set(e.form,"username",t.target.value)}}}),e._m(0),e.usernameOkay?r("span",{staticClass:"icon is-small is-right"},[r("i",{staticClass:"fas fa-check"})]):e._e(),e.usernameError?r("span",{staticClass:"icon is-small is-right is-danger"},[r("i",{staticClass:"fas fa-times"})]):e._e()]),e.usernameError?r("p",{staticClass:"help is-danger"},[e._v(e._s(e.form.errors.get("username")))]):e._e()]),r("div",{staticClass:"field"},[r("p",{staticClass:"control has-icons-left has-icons-right"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],staticClass:"input",attrs:{type:"password",placeholder:"Password",disabled:e.sending},domProps:{value:e.form.password},on:{input:function(t){t.target.composing||e.$set(e.form,"password",t.target.value)}}}),e._m(1),e.passwordOkay?r("span",{staticClass:"icon is-small is-right"},[r("i",{staticClass:"fas fa-check"})]):e._e(),e.passwordError?r("span",{staticClass:"icon is-small is-right is-danger"},[r("i",{staticClass:"fas fa-times"})]):e._e()]),e.passwordError?r("p",{staticClass:"help is-danger"},[e._v(e._s(e.form.errors.get("password")))]):e._e()]),r("nav",{staticClass:"level"},[r("div",{staticClass:"level-left"},[r("div",{staticClass:"level-item"},[r("button",{class:["button","is-primary","mr-4"],attrs:{disabled:e.sending}},[e.sending?[e._v(" Sending... ")]:[e._v(" Log in ")]],2)])]),e._m(2)])])])]),e.user?r("form",{staticClass:"has-text-right",attrs:{action:"#"},on:{submit:function(t){return t.preventDefault(),e.$emit("logout")}}},[r("button",{class:["button","is-danger","is-small"],attrs:{title:"log out / sign out"}},[e._v(" Log "+e._s(e.user)+" out. ")])]):e._e()])])},oe=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon is-small is-left"},[r("i",{staticClass:"fas fa-envelope"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"icon is-small is-left"},[r("i",{staticClass:"fas fa-lock"})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"level-right"},[r("div",{staticClass:"level-item"},[r("span",{staticClass:"has-text-primary is-size-4 mr-2"},[e._v(" 🛈 ")]),r("span",{staticClass:"has-text-grey is-size-7"},[e._v(" Enter any valid e-mail and any non-empty password. ")])])])}],ce={mixins:[te],props:{user:{type:[String],default:null}},data:function(){return{form:new ee({username:"",password:""}),sending:!1}},components:{AvatarPlaceholder:U},methods:{submitForm:function(){var e=this;this.sending=!0,this.makeConnection(this.form.data()).then((function(t){var r;return e.$emit("login",null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.token,e.form.username),t})).then(this.form.onSuccess()).catch(this.form.onError()).catch(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r instanceof m){t.next=2;break}throw r;case 2:return t.t0=e,t.t1=r,t.next=6,r.content();case 6:t.t2=t.sent,t.t0.$emit.call(t.t0,"error",t.t1,t.t2);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).finally((function(){e.sending=!1}))}},computed:{userId:function(){return null!==this.user?this.user:""!==this.form.username?this.form.username:null},usernameOkay:function(){return!this.form.errors.has("username")&&/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.username)},usernameError:function(){return this.form.errors.has("username")},passwordOkay:function(){return""!==this.form.password},passwordError:function(){return this.form.errors.has("password")}}},ue=ce,le=Object(j["a"])(ue,ie,oe,!1,null,"fa524c24",null),fe=le.exports,pe={beforeCreate:function(){var e=this.$options.utils;if(e)for(var t=Object.keys(e),r=0;r<t.length;r++)this[t[r]]=e[t[r]]}},de=new b,he={mixins:[pe],components:{MainLayout:S,BeepsList:K,BeepInput:ae,UserAuth:fe},data:function(){return{beeps:new k(de),user:null,token:null}},mounted:function(){this.token=sessionStorage.getItem("token"),this.user=sessionStorage.getItem("user"),this.token||this.beeps.reload()},methods:{userLoggedIn:function(e,t){console.log("USER LOGGED IN",t,e),this.user=t,this.token=e},userLoggedOut:function(){console.log("USER LOGGED OUT",this.username),this.user=null,this.token=null},beepSubmitted:function(){console.log("BEEP SUBMITTED"),this.beeps.reload()}},watch:{user:function(e){e?sessionStorage.setItem("user",e):sessionStorage.removeItem("user")},token:function(e){e?(sessionStorage.setItem("token",e),de.bearer(e)):(sessionStorage.removeItem("token"),de.bearer(null)),this.beeps.reload()}},utils:{connector:de}},me=he,ve=Object(j["a"])(me,i,o,!1,null,null,null),be=ve.exports,ge={components:{HomeView:be}},ye=ge,_e=Object(j["a"])(ye,s,a,!1,null,null,null),ke=_e.exports,we=(r("abe2"),r("289d"));n["a"].use(we["a"]),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(ke)}}).$mount("#app")},"89cd":function(e,t,r){"use strict";r("a601")},a601:function(e,t,r){},abe2:function(e,t,r){},c525:function(e,t,r){"use strict";r("4702")}});
//# sourceMappingURL=app.48e02b1c.js.map