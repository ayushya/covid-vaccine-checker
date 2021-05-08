(this["webpackJsonpvaccine-availability-checker"]=this["webpackJsonpvaccine-availability-checker"]||[]).push([[0],{115:function(e,t,n){"use strict";n.r(t);n(78);var a=n(0),i=n.n(a),c=n(9),r=n.n(c),o=n(10),l=n(12),s=(n(83),n(84),n(32)),u=n(47),d=n.n(u),f=n(155),v=n(13),b=n(21),j=n.n(b),h=n(33),g=n(40),p=n.n(g),O=n(153),m=n(157),S=n(160),x=n(152),E=n(148),y=n(154),T=n(158),_=n(159),A=n(156),C=n(16),w=n(51),I=n(68),N=n.n(I),D=n(13),F=D.GET_CENTERS_BY_DISTRICT,R=D.REFRESH_INTERVAL,k=function(){var e=Object(h.a)(j.a.mark((function e(t,n){var a,i,c,r,o,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a=[],i=0;i<t.length;i++)for(c=0;c<4*n;c++)r=p.a.get("".concat(F),{params:{district_id:t[i],date:d()().add(7*c,"days").format("DD-MM-YYYY")}}).then((function(e){return e.data.centers})).catch((function(e){return console.log(e),setTimeout((function(){window.location.reload()}),1e3*R),[]})),a.push(r);return e.next=4,Promise.all(a);case 4:return o=e.sent,l=o.reduce((function(e,t){return[].concat(Object(w.a)(e),Object(w.a)(t))}),[]),e.abrupt("return",G(l));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),G=function(e){var t=new Set,n=new Set,a=L(e).map((function(e,a){var i={all:{any_total:0}};return e.sessions.forEach((function(e){var a,c,r,l,s,u,d,f=e.min_age_limit,v=e.available_capacity,b=e.vaccine;t.add(b),n.add(f),i=Object(o.a)(Object(o.a)({},i),{},(d={},Object(C.a)(d,f,Object(o.a)(Object(o.a)({},i[f]),{},(r={},Object(C.a)(r,b,Object(o.a)(Object(o.a)({},null===(a=i[f])||void 0===a?void 0:a[b]),{},Object(C.a)({},e.date,v))),Object(C.a)(r,"any",Object(o.a)(Object(o.a)({},null===(c=i[f])||void 0===c?void 0:c.any),{},Object(C.a)({},e.date,v))),r))),Object(C.a)(d,"all",Object(o.a)(Object(o.a)({},i.all),{},(u={},Object(C.a)(u,b,Object(o.a)(Object(o.a)({},null===(l=i.all)||void 0===l?void 0:l[b]),{},Object(C.a)({},e.date,v))),Object(C.a)(u,"any",Object(o.a)(Object(o.a)({},null===(s=i.all)||void 0===s?void 0:s.any),{},Object(C.a)({},e.date,v))),u))),d));var j="".concat(b,"_total");i[f][j]=i[f][j]?i[f][j]+v:v,i[f].any_total=i[f].any_total?i[f].any_total+v:v,i.all[j]=i.all[j]?i.all[j]+v:v,i.all.any_total+=v})),e.availability=i,e}));return[e,t,n,a]},L=function(e){var t={},n=[];return e.forEach((function(e,a){var i=t[e.center_id];if(void 0===i)n.push(e),t[e.center_id]=n.length-1;else{var c=n[i];n[i]=N()(c,e)}})),n};var U=n(3),V=function(e){var t=e.centers,n=e.vaccineSelected,c=e.ageGroupSelected,r=e.filterDataModel,o=e.shouldNotify,s=e.setShouldNotify,u=i.a.useState(localStorage.getItem("isNotificationEnabled")||v.DEFAULT_NOTIFICATION_ENABLED),d=Object(l.a)(u,2),f=d[0],b=d[1],g=i.a.useState(null),p=Object(l.a)(g,2),O=p[0],m=p[1],S=i.a.useState([]),y=Object(l.a)(S,2),T=y[0],_=y[1];Object(a.useEffect)((function(){localStorage.setItem("isNotificationEnabled",f)}),[f]),Object(a.useEffect)((function(){var e=null===t||void 0===t?void 0:t.reduce((function(e,t){var a,i,r=null===t||void 0===t||null===(a=t.availability)||void 0===a||null===(i=a[c])||void 0===i?void 0:i["".concat(n,"_total")];if(r){var o={total:r,centerName:t.name,pincode:t.pincode};t.notification=o,e.push(t)}return e}),[]);_(e||[])}),[t,n,c,r]),Object(a.useEffect)((function(){navigator.serviceWorker.ready.then((function(e){m(e)}))}),[]),Object(a.useEffect)((function(){o&&(A(),s(!1))}),[o]);var A=function(){var e;f&&(null===T||void 0===T?void 0:T.length)&&(null===O||void 0===O||O.showNotification("Vaccine slots are available",{body:(e=T,e.reduce((function(e,t){var n=t.notification,a=n.total,i=n.centerName,c=n.pincode;return e+"\nCenter: ".concat(i,"\nPincode: ").concat(c,"\nSlots Available: ").concat(a,"\n")}),"")),data:{options:{action:"default",close:!0,notificationCloseEvent:!1,url:document.location.toString()}},persistent:!0,lang:"en-US",icon:"https://ayushya.github.io/covid-vaccine-checker/logo512.png"}))},C=function(){var e=Object(h.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=null===(t=Notification)||void 0===t?void 0:t.permission,e.t0=!0,e.next=e.t0===("denied"===n)?4:e.t0===("granted"===n)?6:e.t0===("default"===n)?8:13;break;case 4:return alert('Enable Notifications from browser\'s Site Settings.\nGoogle Search: "Learn how to unblock notifications on browser"'),e.abrupt("return");case 6:return b(!f),e.abrupt("return");case 8:return e.next=10,Notification.requestPermission();case 10:return"granted"===e.sent&&navigator.serviceWorker.ready.then((function(e){e.showNotification("You will receive a notification similar to this when a vaccine is available."),m(e),b(!0)})),e.abrupt("return");case 13:return alert("Notificatons aren't supported in your browser, please use a Desktop"),e.abrupt("return");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(U.jsxs)(x.a,{variant:"outlined",color:"secondary",onClick:C,style:{margin:"8px",height:"56px",minWidth:"245px"},children:[function(){var e,t=null===(e=Notification)||void 0===e?void 0:e.permission;return"denied"===t?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(E.a,{children:"notifications_none"}),Object(U.jsx)("div",{children:"\xa0 Notifications Blocked"})]}):"granted"===t&&f?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(E.a,{children:"notifications_off"}),Object(U.jsx)("div",{children:"\xa0 Stop Notifications"})]}):"default"!==t&&f?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(E.a,{children:"notifications_none"}),Object(U.jsx)("div",{children:"\xa0 Not Supported"})]}):Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(E.a,{children:"notification_add"}),Object(U.jsx)("div",{children:"\xa0 Get Notifications"})]})}(),Object(U.jsx)("span",{style:{fontSize:"8px",color:"#000"},children:"\xa0(Beta)"})]})},M=Object(O.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}})),W=function(e){var t,n,c=M(),r=e.states,s=e.setStates,u=e.stateSelected,d=e.setStateSelected,f=e.districts,b=e.setDistricts,g=e.districtsSelected,O=e.setDistrictsSelected,C=e.setRawCenters,w=e.centers,I=e.setCenters,N=e.vaccines,D=e.setVaccines,F=e.vaccineSelected,R=e.setVaccineSelected,G=e.ageGroup,L=e.setAgeGroup,W=e.ageGroupSelected,B=e.setAgeGroupSelected,P=e.durationSelected,Y=e.setDurationSelected,J=e.gridApi,H=e.setFilterDataModel,q=i.a.useState(v.REFRESH_INTERVAL),z=Object(l.a)(q,2),X=z[0],$=z[1],K=i.a.useState(!1),Q=Object(l.a)(K,2),Z=Q[0],ee=Q[1],te=Object(o.a)(Object(o.a)({},e),{},{shouldNotify:Z,setShouldNotify:ee});Object(a.useEffect)((function(){p.a.get(v.GET_STATES).then((function(e){s(e.data.states)})),g.length&&(ie(u),ce())}),[]),function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e=X-1;0===e&&g.length&&ce(!0),e>=0&&$(e)}),1e3);var ne=function(){var e=(null===J||void 0===J?void 0:J.getFilterModel())||{};H(e)},ae=function(e){ne(),C(null),I(null),e&&(D(null),R(v.DEFAULT_VACCINE),L(null),B(v.DEFAULT_AGE))},ie=function(e){p.a.get("".concat(v.GET_DISTRICTS,"/").concat(e)).then((function(e){b(e.data.districts)}))},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:P;ae(t),new Promise(function(){var t=Object(h.a)(j.a.mark((function t(i){var c,r,o,s,u,d;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k(n,a);case 2:c=t.sent,r=Object(l.a)(c,4),o=r[0],s=r[1],u=r[2],d=r[3],C(o),I(d),D(s),L(u),$(v.REFRESH_INTERVAL),e&&ee(!0),i();case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},re=function(e){switch(e){case 18:return"18-44";case 45:return"45+";default:return e}};return Object(U.jsxs)("div",{style:{display:"flex",overflowX:"auto",marginRight:"8px"},children:[Object(U.jsxs)(y.a,{variant:"outlined",className:c.formControl,children:[Object(U.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"States"}),Object(U.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:u,onChange:function(e){var t=e.target.value;d(t),b(null),O([]),ae(!0),ie(t)},label:"State",children:[Object(U.jsx)(_.a,{value:"",children:Object(U.jsx)("em",{children:"None"})}),null===r||void 0===r?void 0:r.map((function(e,t){var n=e.state_id,a=e.state_name;return Object(U.jsx)(_.a,{value:n,children:a},t)}))]})]}),f?Object(U.jsxs)(y.a,{variant:"outlined",className:c.formControl,children:[Object(U.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Districts"}),Object(U.jsx)(A.a,{labelId:"demo-simple-select-outlined-label",multiple:!0,id:"demo-simple-select-outlined",value:g,onChange:function(e){var t=e.target.value;O(t),ce(!1,!0,t,P)},label:"Districts",renderValue:function(e){return f.reduce((function(t,n){return e.some((function(e){return n.district_id===e}))?"".concat(t,", ").concat(n.district_name):t}),"").slice(1)},children:null===f||void 0===f?void 0:f.map((function(e,t){var n=e.district_id,a=e.district_name;return Object(U.jsxs)(_.a,{value:n,children:[Object(U.jsx)(m.a,{checked:g.indexOf(n)>-1}),Object(U.jsx)(S.a,{primary:a})]},t)}))})]}):null,N?Object(U.jsxs)(y.a,{variant:"outlined",className:c.formControl,children:[Object(U.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Vaccines"}),Object(U.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:F,onChange:function(e){ne();var t=e.target.value;R(t);var n=w;I(null),setTimeout((function(){I(n)}),0)},label:"Vaccines",children:[Object(U.jsx)(_.a,{value:v.DEFAULT_VACCINE,children:Object(U.jsx)("em",{children:"Any"})}),null===(t=Array.from(N))||void 0===t?void 0:t.map((function(e,t){return Object(U.jsx)(_.a,{value:e,children:e},t)}))]})]}):null,G?Object(U.jsxs)(y.a,{variant:"outlined",className:c.formControl,children:[Object(U.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Age Group"}),Object(U.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:W,onChange:function(e){ne();var t=e.target.value;B(t);var n=w;I(null),setTimeout((function(){I(n)}),0)},label:"Age Group",children:[Object(U.jsx)(_.a,{value:v.DEFAULT_AGE,children:Object(U.jsx)("em",{children:"All"})}),null===(n=Array.from(G))||void 0===n?void 0:n.map((function(e,t){return Object(U.jsx)(_.a,{value:e,children:re(e)},t)}))]})]}):null,N&&G?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsxs)(y.a,{variant:"outlined",className:c.formControl,children:[Object(U.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Duration"}),Object(U.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:P,onChange:function(e){var t=e.target.value;Y(t),ce(!1,!1,g,t)},label:"Duration",children:[Object(U.jsx)(_.a,{value:"1",children:"1 Month"}),Object(U.jsx)(_.a,{value:"2",children:"2 Month"})]})]}),Object(U.jsxs)(x.a,{variant:"outlined",color:"primary",onClick:function(){$(0),ce()},style:{margin:"8px",height:"56px",minWidth:"152px"},children:[Object(U.jsx)(E.a,{children:"cached"}),Object(U.jsxs)("div",{children:["\xa0 ",function(){switch(X){case 0:return"Refreshing";default:return"in ".concat(X," s")}}()]})]}),Object(U.jsx)(V,Object(o.a)({},te))]}):null]})},B=function(){var e=i.a.useState(null),t=Object(l.a)(e,2),n=t[0],c=t[1],r=i.a.useState(localStorage.getItem("stateSelected")||v.DEFAULT_STATE),u=Object(l.a)(r,2),b=u[0],j=u[1],h=i.a.useState(null),g=Object(l.a)(h,2),p=g[0],O=g[1],m=i.a.useState(JSON.parse(localStorage.getItem("districtsSelected"))||v.DEFAULT_DISTRICTS_SELECTED),S=Object(l.a)(m,2),x=S[0],E=S[1],y=i.a.useState(null),T=Object(l.a)(y,2),_=T[0],A=T[1],C=i.a.useState(null),w=Object(l.a)(C,2),I=w[0],N=w[1],D=i.a.useState(null),F=Object(l.a)(D,2),R=F[0],k=F[1],G=i.a.useState(localStorage.getItem("vaccineSelected")||v.DEFAULT_VACCINE),L=Object(l.a)(G,2),V=L[0],M=L[1],B=i.a.useState(null),P=Object(l.a)(B,2),Y=P[0],J=P[1],H=i.a.useState(localStorage.getItem("ageGroupSelected")||v.DEFAULT_AGE),q=Object(l.a)(H,2),z=q[0],X=q[1],$=i.a.useState(localStorage.getItem("durationSelected")||v.DEFAULT_DURATION),K=Object(l.a)($,2),Q=K[0],Z=K[1],ee=i.a.useState(null),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],ie=i.a.useState(JSON.parse(localStorage.getItem("filterDataModel"))||{}),ce=Object(l.a)(ie,2),re=ce[0],oe=ce[1],le={states:n,setStates:c,stateSelected:b,setStateSelected:j,districts:p,setDistricts:O,districtsSelected:x,setDistrictsSelected:E,rawCenters:_,setRawCenters:A,centers:I,setCenters:N,vaccines:R,setVaccines:k,vaccineSelected:V,setVaccineSelected:M,ageGroup:Y,setAgeGroup:J,ageGroupSelected:z,setAgeGroupSelected:X,durationSelected:Q,setDurationSelected:Z,gridApi:ne,setGridApi:ae,filterDataModel:re,setFilterDataModel:oe};Object(a.useEffect)((function(){localStorage.setItem("stateSelected",b),localStorage.setItem("districtsSelected",JSON.stringify(x)),localStorage.setItem("vaccineSelected",V),localStorage.setItem("ageGroupSelected",z),localStorage.setItem("durationSelected",Q),localStorage.setItem("filterDataModel",JSON.stringify(re)),setTimeout((function(){null===ne||void 0===ne||ne.setFilterModel(re)}),0)}),[b,x,V,z,Q,ne]);var se=Array.apply(null,new Array(28*parseInt(Q))).map((function(e,t){return d()().add(t,"days").format("DD-MM-YYYY")})),ue=function(e){var t=e.value;switch(t){case void 0:return"NA";case 0:return"Booked";default:return"<a href=".concat(v.VACCINE_REGISTRATION_URL,' target="_blank" style="color:#fff; text-decoration: none"}>').concat(t,"</a>")}},de=function(e){var t={display:"flex",justifyContent:"center",fontWeight:"700",border:"1px solid rgb(186, 191, 199)"};switch(e.value){case void 0:return Object(o.a)({color:"rgba(0, 0, 0, 0.87)",backgroundColor:"#e0e0e0"},t);case 0:return Object(o.a)({color:"#fff",backgroundColor:"rgb(220, 0, 78)"},t);default:return Object(o.a)({color:"#fff",backgroundColor:"#2ecc71",cursor:"pointer"},t)}};return Object(U.jsxs)("div",{children:[Object(U.jsx)(W,Object(o.a)({},le)),(null===I||void 0===I?void 0:I.length)?Object(U.jsx)("div",{className:"ag-theme-alpine",style:{height:"calc(100vh - 72px)",width:"100%"},children:Object(U.jsxs)(s.AgGridReact,{defaultColDef:{width:120,floatingFilter:!0,resizable:!0,suppressMovable:!0},enableCellTextSelection:!0,defaultColGroupDef:{marryChildren:!0},animateRows:!0,isExternalFilterPresent:function(){return!0},doesExternalFilterPass:function(e){var t;return void 0!==(null===(t=e.data.availability[z])||void 0===t?void 0:t["".concat(V,"_total")])},onGridReady:function(e){ae(e.api)},tooltipShowDelay:0,rowData:I,children:[Object(U.jsx)(s.AgGridColumn,{field:"pincode",sortable:!0,filter:!0}),Object(U.jsx)(s.AgGridColumn,{field:"name",tooltipField:"name",sortable:!0,filter:!0,width:200}),Object(U.jsx)(s.AgGridColumn,{headerName:"Fee",field:"fee_type",valueGetter:function(e){var t=e.data,n=t.fee_type,a=t.vaccine_fees;return(null===a||void 0===a?void 0:a[0].fee)||n},valueFormatter:function(e){var t=e.data,n=t.fee_type,a=t.vaccine_fees;return a?"\u20b9 ".concat(null===a||void 0===a?void 0:a[0].fee):n},sortable:!0,filter:!0,cellStyle:function(e){var t={display:"flex",justifyContent:"center",fontWeight:"700",border:"1px solid rgb(186, 191, 199)"};switch(e.value){case"Free":return Object(o.a)({color:"#fff",backgroundColor:"#2196f3"},t);default:return Object(o.a)({color:"#fff",backgroundColor:"#ff9800"},t)}}}),Object(U.jsx)(s.AgGridColumn,{headerName:"# Total",field:"availability.".concat(z,".").concat(V,"_total"),sortable:!0,filter:!1,width:120,cellStyle:de,sort:"desc",cellRenderer:ue}),null===se||void 0===se?void 0:se.map((function(e,t){return Object(U.jsx)(s.AgGridColumn,{headerName:e,field:"availability.".concat(z,".").concat(V,".").concat(e),sortable:!0,filter:!1,width:130,cellStyle:de,cellRenderer:ue,onCellClicked:function(e){var t,n=e.event;e.value>0&&(null===(t=n.target.querySelector("a"))||void 0===t||t.click())}},t)}))]})}):x.length?Object(U.jsx)("div",{style:{height:"calc(100vh - 72px)",width:"100%",display:"flex",justifyContent:"center"},children:Object(U.jsx)(f.a,{style:{alignSelf:"center"}})}):null]})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,162)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),c(e),r(e)}))},Y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function J(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(U.jsx)(i.a.StrictMode,{children:Object(U.jsx)(B,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/covid-vaccine-checker",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/covid-vaccine-checker","/service-worker.js");Y?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):J(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):J(t,e)}))}}(),P()},13:function(e,t,n){"use strict";n.r(t),n.d(t,"VACCINE_REGISTRATION_URL",(function(){return a})),n.d(t,"SERVER_API_URL",(function(){return i})),n.d(t,"GET_STATES",(function(){return c})),n.d(t,"GET_DISTRICTS",(function(){return r})),n.d(t,"GET_CENTERS_BY_DISTRICT",(function(){return o})),n.d(t,"DEFAULT_STATE",(function(){return l})),n.d(t,"DEFAULT_DISTRICTS_SELECTED",(function(){return s})),n.d(t,"DEFAULT_VACCINE",(function(){return u})),n.d(t,"DEFAULT_AGE",(function(){return d})),n.d(t,"DEFAULT_DURATION",(function(){return f})),n.d(t,"REFRESH_INTERVAL",(function(){return v})),n.d(t,"DEFAULT_NOTIFICATION_ENABLED",(function(){return b}));var a="https://selfregistration.cowin.gov.in/",i="https://cdn-api.co-vin.in/api/v2",c="".concat(i,"/admin/location/states"),r="".concat(i,"/admin/location/districts"),o="".concat(i,"/appointment/sessions/public/calendarByDistrict"),l="16",s=[294,265,276],u="any",d="all",f=1,v=300,b=!1},78:function(e,t,n){}},[[115,1,2]]]);
//# sourceMappingURL=main.b92f48b1.chunk.js.map