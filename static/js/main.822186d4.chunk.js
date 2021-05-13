(this["webpackJsonpvaccine-availability-checker"]=this["webpackJsonpvaccine-availability-checker"]||[]).push([[0],{13:function(e,t,n){"use strict";n.r(t),n.d(t,"VACCINE_REGISTRATION_URL",(function(){return a})),n.d(t,"SERVER_API_URL",(function(){return i})),n.d(t,"GET_STATES",(function(){return c})),n.d(t,"GET_DISTRICTS",(function(){return o})),n.d(t,"GET_CENTERS_BY_DISTRICT",(function(){return r})),n.d(t,"GET_CENTERS_BY_DISTRICT_ADMIN",(function(){return l})),n.d(t,"DEFAULT_STATE",(function(){return s})),n.d(t,"DEFAULT_DISTRICTS_SELECTED",(function(){return d})),n.d(t,"DEFAULT_VACCINE",(function(){return u})),n.d(t,"DEFAULT_AGE",(function(){return f})),n.d(t,"DEFAULT_DURATION",(function(){return v})),n.d(t,"REFRESH_INTERVAL",(function(){return b})),n.d(t,"REFRESH_INTERVAL_FAST",(function(){return j})),n.d(t,"DEFAULT_NOTIFICATION_ENABLED",(function(){return h})),n.d(t,"getCentersByDistrict",(function(){return g})),n.d(t,"getRefreshInterval",(function(){return p}));var a="https://selfregistration.cowin.gov.in/",i="https://cdn-api.co-vin.in/api/v2",c="".concat(i,"/admin/location/states"),o="".concat(i,"/admin/location/districts"),r="".concat(i,"/appointment/sessions/public/calendarByDistrict"),l="".concat(i,"/appointment/sessions/calendarByDistrict"),s="16",d=[294,265,276],u="any",f="all",v=1,b=60,j=10,h=!1,g=function(){return"true"===localStorage.getItem("godMode")?l:r},p=function(){return"true"===localStorage.getItem("godMode")?j:b}},135:function(e,t,n){"use strict";n.r(t);n(85);var a=n(0),i=n.n(a),c=n(9),o=n.n(c),r=n(11),l=n(12),s=(n(90),n(91),n(32)),d=n(41),u=n.n(d),f=n(176),v=n(13),b=n(21),j=n.n(b),h=n(33),g=n(35),p=n.n(g),O=n(171),m=n(178),S=n(173),x=n(170),E=n(166),y=n(174),_=n(175),w=n(172),T=n(179),C=n(180),A=n(177),I=n(72),D=n.n(I),N=n(16),R=n(55),k=n(73),G=n.n(k),F=n(13),L=F.getCentersByDistrict,U=F.REFRESH_INTERVAL,M=F.GET_CENTERS_BY_DISTRICT_ADMIN,V=function(){var e=Object(h.a)(j.a.mark((function e(t,n){var a,i,c,o,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a=[],i=function(e){for(var i=function(n){var i=p.a.get(M,{params:{district_id:t[e],date:u()().add(7*n,"days").format("DD-MM-YYYY")}}).then((function(e){return e.data.centers})).catch((function(a){return console.log("Realtime API failed with error: ".concat(a,", falling back to cached APIs")),p.a.get("".concat(L()),{params:{district_id:t[e],date:u()().add(7*n,"days").format("DD-MM-YYYY")}}).then((function(e){return e.data.centers})).catch((function(e){return console.log(e),setTimeout((function(){window.location.reload()}),1e3*U),[]}))}));a.push(i)},c=0;c<4*n;c++)i(c)},c=0;c<t.length;c++)i(c);return e.next=5,Promise.all(a);case 5:return o=e.sent,r=o.reduce((function(e,t){return[].concat(Object(R.a)(e),Object(R.a)(t))}),[]),e.abrupt("return",W(r));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),W=function(e){var t=new Set,n=new Set,a=B(e).map((function(e,a){var i={all:{any_total:0}};return e.sessions.forEach((function(e){var a,c,o,l,s,d,u,f=e.min_age_limit,v=e.available_capacity,b=e.vaccine;t.add(b),n.add(f),i=Object(r.a)(Object(r.a)({},i),{},(u={},Object(N.a)(u,f,Object(r.a)(Object(r.a)({},i[f]),{},(o={},Object(N.a)(o,b,Object(r.a)(Object(r.a)({},null===(a=i[f])||void 0===a?void 0:a[b]),{},Object(N.a)({},e.date,v))),Object(N.a)(o,"any",Object(r.a)(Object(r.a)({},null===(c=i[f])||void 0===c?void 0:c.any),{},Object(N.a)({},e.date,v))),o))),Object(N.a)(u,"all",Object(r.a)(Object(r.a)({},i.all),{},(d={},Object(N.a)(d,b,Object(r.a)(Object(r.a)({},null===(l=i.all)||void 0===l?void 0:l[b]),{},Object(N.a)({},e.date,v))),Object(N.a)(d,"any",Object(r.a)(Object(r.a)({},null===(s=i.all)||void 0===s?void 0:s.any),{},Object(N.a)({},e.date,v))),d))),u));var j="".concat(b,"_total");i[f][j]=i[f][j]?i[f][j]+v:v,i[f].any_total=i[f].any_total?i[f].any_total+v:v,i.all[j]=i.all[j]?i.all[j]+v:v,i.all.any_total+=v})),e.availability=i,e}));return[e,t,n,a]},B=function(e){var t={},n=[];return e.forEach((function(e,a){var i=t[e.center_id];if(void 0===i)n.push(e),t[e.center_id]=n.length-1;else{var c=n[i];n[i]=G()(c,e)}})),n};var Y=n(3),P=function(e){var t=e.centers,n=e.vaccineSelected,c=e.ageGroupSelected,o=e.filterDataModel,r=e.shouldNotify,s=e.setShouldNotify,d=i.a.useState("true"===localStorage.getItem("isNotificationEnabled")||v.DEFAULT_NOTIFICATION_ENABLED),u=Object(l.a)(d,2),f=u[0],b=u[1],g=i.a.useState(null),p=Object(l.a)(g,2),O=p[0],m=p[1],S=i.a.useState([]),y=Object(l.a)(S,2),_=y[0],w=y[1];Object(a.useEffect)((function(){localStorage.setItem("isNotificationEnabled",f)}),[f]),Object(a.useEffect)((function(){var e,a=null===t||void 0===t?void 0:t.reduce((function(e,t){var a,i,o=null===t||void 0===t||null===(a=t.availability)||void 0===a||null===(i=a[c])||void 0===i?void 0:i["".concat(n,"_total")];if(o){var r={total:o,centerName:t.name,pincode:t.pincode};t.notification=r,e.push(t)}return e}),[]);a=null===(e=a)||void 0===e?void 0:e.sort((function(e,t){var n=e.notification.total;return t.notification.total-n})),w(a||[])}),[t,n,c,o]),Object(a.useEffect)((function(){var e,t;null===(e=window.navigator)||void 0===e||null===(t=e.serviceWorker)||void 0===t||t.ready.then((function(e){m(e)}));var n=D.a.parse(window.location.search);void 0!==n.godMode&&localStorage.setItem("godMode",n.godMode)}),[]),Object(a.useEffect)((function(){r&&(T(),s(!1))}),[r]);var T=function(){var e;f&&(null===_||void 0===_?void 0:_.length)&&(null===O||void 0===O||O.showNotification("Vaccine slots are available",{actions:[{action:"default",title:"Show Slots"},{action:"external-navigation",title:"Book Slots"}],body:(e=_,e.slice(0,2).reduce((function(e,t){var n=t.notification,a=n.total,i=n.centerName,c=n.pincode;return e+"\nCenter: ".concat(i,"\nPincode: ").concat(c,"\nSlots Available: ").concat(a,"\n")}),"")),data:{options:{action:"default",close:!0,notificationCloseEvent:!1,url:document.location.toString(),externalUrl:v.VACCINE_REGISTRATION_URL}},tag:"vaccine-availability-notification",renotify:!0,persistent:!0,lang:"en-US",icon:"https://ayushya.github.io/covid-vaccine-checker/logo512.png"}))},C=function(){var e=Object(h.a)(j.a.mark((function e(){var t,n,a,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=null===(t=window.Notification)||void 0===t?void 0:t.permission,e.t0=!0,e.next=e.t0===("denied"===n)?4:e.t0===("granted"===n)?6:e.t0===("default"===n)?8:13;break;case 4:return alert('Enable Notifications from browser\'s Site Settings.\nGoogle Search: "Learn how to unblock notifications on browser"'),e.abrupt("return");case 6:return b(!f),e.abrupt("return");case 8:return e.next=10,window.Notification.requestPermission();case 10:return"granted"===e.sent&&(null===(a=window.navigator)||void 0===a||null===(i=a.serviceWorker)||void 0===i||i.ready.then((function(e){e.showNotification("You will receive a notification similar to this when a vaccine is available."),m(e),b(!0)}))),e.abrupt("return");case 13:return alert("Notificatons aren't supported in your browser, please use a Desktop"),e.abrupt("return");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Y.jsxs)(x.a,{variant:"outlined",color:"secondary",onClick:C,style:{margin:"8px",height:"56px",minWidth:"245px"},children:[function(){var e,t=null===(e=window.Notification)||void 0===e?void 0:e.permission;return"denied"===t?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(E.a,{children:"notifications_none"}),Object(Y.jsx)("div",{children:"\xa0 Notifications Blocked"})]}):"granted"===t&&f?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(E.a,{children:"notifications_off"}),Object(Y.jsx)("div",{children:"\xa0 Stop Notifications"})]}):"default"!==t&&f?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(E.a,{children:"notifications_none"}),Object(Y.jsx)("div",{children:"\xa0 Not Supported"})]}):Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(E.a,{children:"notification_add"}),Object(Y.jsx)("div",{children:"\xa0 Get Notifications"})]})}(),Object(Y.jsx)("span",{style:{fontSize:"8px",color:"#000"},children:"\xa0(Beta)"})]})},J=Object(O.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}})),q=function(e){var t,n,c=J(),o=e.states,s=e.setStates,d=e.stateSelected,u=e.setStateSelected,f=e.districts,b=e.setDistricts,g=e.districtsSelected,O=e.setDistrictsSelected,I=e.setRawCenters,D=e.centers,N=e.setCenters,R=e.vaccines,k=e.setVaccines,G=e.vaccineSelected,F=e.setVaccineSelected,L=e.ageGroup,U=e.setAgeGroup,M=e.ageGroupSelected,W=e.setAgeGroupSelected,B=e.durationSelected,q=e.setDurationSelected,H=e.gridApi,z=e.setFilterDataModel,X=i.a.useState(Object(v.getRefreshInterval)()),$=Object(l.a)(X,2),K=$[0],Q=$[1],Z=i.a.useState(!1),ee=Object(l.a)(Z,2),te=ee[0],ne=ee[1],ae=Object(r.a)(Object(r.a)({},e),{},{shouldNotify:te,setShouldNotify:ne});Object(a.useEffect)((function(){p.a.get(v.GET_STATES).then((function(e){s(e.data.states)})),g.length&&(oe(d),re())}),[]),function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e=K-1;0===e&&g.length&&re(!0),e>=0&&Q(e)}),1e3);var ie=function(){var e=(null===H||void 0===H?void 0:H.getFilterModel())||{};z(e)},ce=function(e){ie(),I(null),N(null),e&&(k(null),F(v.DEFAULT_VACCINE),U(null),W(v.DEFAULT_AGE))},oe=function(e){p.a.get("".concat(v.GET_DISTRICTS,"/").concat(e)).then((function(e){b(e.data.districts)}))},re=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:B;ce(t),new Promise(function(){var t=Object(h.a)(j.a.mark((function t(i){var c,o,r,s,d,u;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V(n,a);case 2:c=t.sent,o=Object(l.a)(c,4),r=o[0],s=o[1],d=o[2],u=o[3],I(r),N(u),k(s),U(d),Q(Object(v.getRefreshInterval)()),e&&ne(!0),i();case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},le=function(e){switch(e){case 18:return"18-44";case 45:return"45+";default:return e}};return Object(Y.jsxs)("div",{style:{display:"flex",overflowX:"auto",marginRight:"8px"},children:[Object(Y.jsxs)(w.a,{variant:"outlined",className:c.formControl,children:[Object(Y.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"States"}),Object(Y.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:d,onChange:function(e){var t=e.target.value;u(t),b(null),O([]),ce(!0),oe(t)},label:"State",children:[Object(Y.jsx)(C.a,{value:"",children:Object(Y.jsx)("em",{children:"None"})}),null===o||void 0===o?void 0:o.map((function(e,t){var n=e.state_id,a=e.state_name;return Object(Y.jsx)(C.a,{value:n,children:a},t)}))]})]}),f?Object(Y.jsxs)(w.a,{variant:"outlined",className:c.formControl,children:[Object(Y.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Districts"}),Object(Y.jsx)(A.a,{labelId:"demo-simple-select-outlined-label",multiple:!0,id:"demo-simple-select-outlined",value:g,onChange:function(e){var t=e.target.value;O(t),re(!1,!0,t,B)},label:"Districts",renderValue:function(e){return f.reduce((function(t,n){return e.some((function(e){return n.district_id===e}))?"".concat(t,", ").concat(n.district_name):t}),"").slice(1)},children:null===f||void 0===f?void 0:f.map((function(e,t){var n=e.district_id,a=e.district_name;return Object(Y.jsxs)(C.a,{value:n,children:[Object(Y.jsx)(m.a,{checked:g.indexOf(n)>-1}),Object(Y.jsx)(S.a,{primary:a})]},t)}))})]}):null,R?Object(Y.jsxs)(w.a,{variant:"outlined",className:c.formControl,children:[Object(Y.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Vaccines"}),Object(Y.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:G,onChange:function(e){ie();var t=e.target.value;F(t);var n=D;N(null),setTimeout((function(){N(n)}),0)},label:"Vaccines",children:[Object(Y.jsx)(C.a,{value:v.DEFAULT_VACCINE,children:Object(Y.jsx)("em",{children:"Any"})}),null===(t=Array.from(R))||void 0===t?void 0:t.map((function(e,t){return Object(Y.jsx)(C.a,{value:e,children:e},t)}))]})]}):null,L?Object(Y.jsxs)(w.a,{variant:"outlined",className:c.formControl,children:[Object(Y.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Age Group"}),Object(Y.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:M,onChange:function(e){ie();var t=e.target.value;W(t);var n=D;N(null),setTimeout((function(){N(n)}),0)},label:"Age Group",children:[Object(Y.jsx)(C.a,{value:v.DEFAULT_AGE,children:Object(Y.jsx)("em",{children:"All"})}),null===(n=Array.from(L))||void 0===n?void 0:n.map((function(e,t){return Object(Y.jsx)(C.a,{value:e,children:le(e)},t)}))]})]}):null,R&&L?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsxs)(w.a,{variant:"outlined",className:c.formControl,children:[Object(Y.jsx)(T.a,{id:"demo-simple-select-outlined-label",children:"Duration"}),Object(Y.jsxs)(A.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:B,onChange:function(e){var t=e.target.value;q(t),re(!1,!1,g,t)},label:"Duration",children:[Object(Y.jsx)(C.a,{value:"1",children:"1 Month"}),Object(Y.jsx)(C.a,{value:"2",children:"2 Month"})]})]}),Object(Y.jsxs)(x.a,{variant:"outlined",color:"primary",onClick:function(){Q(0),re()},style:{margin:"8px",height:"56px",minWidth:"152px"},children:[Object(Y.jsx)(E.a,{children:"cached"}),Object(Y.jsxs)("div",{children:["\xa0 ",function(){switch(K){case 0:return"Refreshing";default:return"in ".concat(K," s")}}()]})]}),Object(Y.jsx)(P,Object(r.a)({},ae)),Object(Y.jsx)(y.a,{href:"https://www.notion.so/Covid-Vaccine-Checker-9f555f4295764092a4d28e207e60e392",target:"_blank",style:{alignSelf:"center",textDecoration:"none",minWidth:"156px"},children:Object(Y.jsxs)(_.a,{variant:"extended",children:["Usage guide \xa0",Object(Y.jsx)(E.a,{children:"help_outline"})]})})]}):null]})},H=function(){var e=i.a.useState(null),t=Object(l.a)(e,2),n=t[0],c=t[1],o=i.a.useState(localStorage.getItem("stateSelected")||v.DEFAULT_STATE),d=Object(l.a)(o,2),b=d[0],j=d[1],h=i.a.useState(null),g=Object(l.a)(h,2),p=g[0],O=g[1],m=i.a.useState(JSON.parse(localStorage.getItem("districtsSelected"))||v.DEFAULT_DISTRICTS_SELECTED),S=Object(l.a)(m,2),x=S[0],E=S[1],y=i.a.useState(null),_=Object(l.a)(y,2),w=_[0],T=_[1],C=i.a.useState(null),A=Object(l.a)(C,2),I=A[0],D=A[1],N=i.a.useState(null),R=Object(l.a)(N,2),k=R[0],G=R[1],F=i.a.useState(localStorage.getItem("vaccineSelected")||v.DEFAULT_VACCINE),L=Object(l.a)(F,2),U=L[0],M=L[1],V=i.a.useState(null),W=Object(l.a)(V,2),B=W[0],P=W[1],J=i.a.useState(localStorage.getItem("ageGroupSelected")||v.DEFAULT_AGE),H=Object(l.a)(J,2),z=H[0],X=H[1],$=i.a.useState(localStorage.getItem("durationSelected")||v.DEFAULT_DURATION),K=Object(l.a)($,2),Q=K[0],Z=K[1],ee=i.a.useState(null),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],ie=i.a.useState(JSON.parse(localStorage.getItem("filterDataModel"))||{}),ce=Object(l.a)(ie,2),oe=ce[0],re=ce[1],le={states:n,setStates:c,stateSelected:b,setStateSelected:j,districts:p,setDistricts:O,districtsSelected:x,setDistrictsSelected:E,rawCenters:w,setRawCenters:T,centers:I,setCenters:D,vaccines:k,setVaccines:G,vaccineSelected:U,setVaccineSelected:M,ageGroup:B,setAgeGroup:P,ageGroupSelected:z,setAgeGroupSelected:X,durationSelected:Q,setDurationSelected:Z,gridApi:ne,setGridApi:ae,filterDataModel:oe,setFilterDataModel:re};Object(a.useEffect)((function(){localStorage.setItem("stateSelected",b),localStorage.setItem("districtsSelected",JSON.stringify(x)),localStorage.setItem("vaccineSelected",U),localStorage.setItem("ageGroupSelected",z),localStorage.setItem("durationSelected",Q),localStorage.setItem("filterDataModel",JSON.stringify(oe)),setTimeout((function(){null===ne||void 0===ne||ne.setFilterModel(oe)}),0)}),[b,x,U,z,Q,ne]);var se=Array.apply(null,new Array(28*parseInt(Q))).map((function(e,t){return u()().add(t,"days").format("DD-MM-YYYY")})),de=function(e){var t=e.value;switch(t){case void 0:return"NA";case 0:return"Booked";default:return"<a href=".concat(v.VACCINE_REGISTRATION_URL,' target="_blank" style="color:#fff; text-decoration: none"}>').concat(t,"</a>")}},ue=function(e){var t=e.data,n=e.value,a=t.address,i=t.name,c=t.pincode,o=encodeURIComponent("".concat(i,", ").concat(a,", ").concat(c)),r="http://maps.google.com/?q=".concat(o);return"<a href=".concat(r,' target="_blank" style="color:#000; text-decoration: none"}>').concat(n,"</a>")},fe=function(e){var t={display:"flex",justifyContent:"center",fontWeight:"700",border:"1px solid rgb(186, 191, 199)"};switch(e.value){case void 0:return Object(r.a)({color:"rgba(0, 0, 0, 0.87)",backgroundColor:"#e0e0e0"},t);case 0:return Object(r.a)({color:"#fff",backgroundColor:"rgb(220, 0, 78)"},t);default:return Object(r.a)({color:"#fff",backgroundColor:"#2ecc71",cursor:"pointer"},t)}};return Object(Y.jsxs)("div",{children:[Object(Y.jsx)(q,Object(r.a)({},le)),(null===I||void 0===I?void 0:I.length)?Object(Y.jsx)("div",{className:"ag-theme-alpine",style:{height:"calc(100vh - 72px)",width:"100%"},children:Object(Y.jsxs)(s.AgGridReact,{defaultColDef:{width:120,floatingFilter:!0,resizable:!0,suppressMovable:!0},enableCellTextSelection:!0,defaultColGroupDef:{marryChildren:!0},animateRows:!0,isExternalFilterPresent:function(){return!0},doesExternalFilterPass:function(e){var t;return void 0!==(null===(t=e.data.availability[z])||void 0===t?void 0:t["".concat(U,"_total")])},onGridReady:function(e){ae(e.api)},tooltipShowDelay:0,rowData:I,children:[Object(Y.jsx)(s.AgGridColumn,{field:"pincode",sortable:!0,filter:!0,cellRenderer:ue,tooltipValueGetter:function(){return"Open in Google Maps"}}),Object(Y.jsx)(s.AgGridColumn,{field:"name",tooltipValueGetter:function(e){var t=e.value;return"Where is ".concat(t," ?")},sortable:!0,filter:!0,width:200,cellRenderer:ue}),Object(Y.jsx)(s.AgGridColumn,{headerName:"Fee",field:"fee_type",valueGetter:function(e){var t=e.data,n=t.fee_type,a=t.vaccine_fees;return(null===a||void 0===a?void 0:a[0].fee)||n},valueFormatter:function(e){var t=e.data,n=t.fee_type,a=t.vaccine_fees;return a?"\u20b9 ".concat(null===a||void 0===a?void 0:a[0].fee):n},sortable:!0,filter:!0,cellStyle:function(e){var t={display:"flex",justifyContent:"center",fontWeight:"700",border:"1px solid rgb(186, 191, 199)"};switch(e.value){case"Free":return Object(r.a)({color:"#fff",backgroundColor:"#2196f3"},t);default:return Object(r.a)({color:"#fff",backgroundColor:"#ff9800"},t)}}}),Object(Y.jsx)(s.AgGridColumn,{headerName:"# Total",field:"availability.".concat(z,".").concat(U,"_total"),sortable:!0,filter:!1,width:120,cellStyle:fe,sort:"desc",cellRenderer:de}),null===se||void 0===se?void 0:se.map((function(e,t){return Object(Y.jsx)(s.AgGridColumn,{headerName:e,field:"availability.".concat(z,".").concat(U,".").concat(e),sortable:!0,filter:!1,width:130,cellStyle:fe,cellRenderer:de,onCellClicked:function(e){var t,n=e.event;e.value>0&&(null===(t=n.target.querySelector("a"))||void 0===t||t.click())}},t)}))]})}):x.length?Object(Y.jsx)("div",{style:{height:"calc(100vh - 72px)",width:"100%",display:"flex",justifyContent:"center"},children:Object(Y.jsx)(f.a,{style:{alignSelf:"center"}})}):null]})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,182)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),i(e),c(e),o(e)}))},X=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function $(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(Object(Y.jsx)(i.a.StrictMode,{children:Object(Y.jsx)(H,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/covid-vaccine-checker",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/covid-vaccine-checker","/service-worker.js");X?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):$(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):$(t,e)}))}}(),z()},85:function(e,t,n){}},[[135,1,2]]]);
//# sourceMappingURL=main.822186d4.chunk.js.map