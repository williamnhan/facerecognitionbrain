(this.webpackJsonpfacerecognitionbrain=this.webpackJsonpfacerecognitionbrain||[]).push([[0],{102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},354:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(45),i=n.n(r),o=(n(102),n(90)),m=n(91),A=n(96),u=n(95),l=function(){return c.a.createElement("nav",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement("p",{className:"f3 link dim black underline pa3 pointer"},"Sign out"))},g=n(92),E=n.n(g),s=n(93),f=n.n(s),v=(n(103),function(){return c.a.createElement("div",{className:"ma4 mt0"},c.a.createElement(E.a,{className:"Tilt br2 shadow-2",options:{max:55},style:{height:150,width:150}},c.a.createElement("div",{className:"Tilt-inner"},c.a.createElement("img",{style:{paddingTop:"5px"},alt:"logo",src:f.a}))))}),I=(n(104),function(e){var t=e.onInputChange,n=e.onButtonSubmit;return c.a.createElement("div",null,c.a.createElement("p",{className:"f3"},"This Magix Brain will detect faces in your pictures. Git it a time."),c.a.createElement("div",{className:"center"},c.a.createElement("div",{className:"form center pa4 br3 shadow-5"},c.a.createElement("input",{className:"f4 pa2 w-70 center",type:"text",onChange:t}),c.a.createElement("button",{className:"w-30 grow f4 link ph3 pv2 did white bg-light-purple",onClick:n},"Detect"))))}),h=function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"white f3"},"Nhan, your current rank is ..."),c.a.createElement("div",{className:"white f3"},"#5"))},d=function(e){var t=e.imageUrl;return c.a.createElement("div",{className:"center"},c.a.createElement("div",{className:"absolute mt2"},c.a.createElement("img",{src:t,alt:"",width:"500px",heigh:"auto"})))},B=(n(105),n(94)),p=n.n(B),k=n(46),y=n.n(k),N=new y.a.App({apiKey:"c1ce31734c96424f8087b7ca55fe961f"}),C={particles:{number:{value:50,density:{enable:!0,value_area:400}}}},Q=function(e){Object(A.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).onInputChange=function(t){e.setState({input:t.target.value})},e.onButtonSubmit=function(){e.setState({imageUrl:e.state.input},(function(){N.models.predict(y.a.FACE_DETECT_MODEL,e.state.imageUrl).then((function(e){console.log(e.outputs[0].data.regions[0].region_info.bounding_box)}),(function(e){}))}))},e.state={input:"",imageUrl:""},e}return Object(m.a)(n,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(p.a,{className:"particles",params:C}),c.a.createElement(l,null),c.a.createElement(v,null),c.a.createElement(h,null),c.a.createElement(I,{onInputChange:this.onInputChange,onButtonSubmit:this.onButtonSubmit}),c.a.createElement(d,{imageUrl:this.state.imageUrl}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(353);i.a.render(c.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},93:function(e,t){e.exports="data:image/png;base64,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"},97:function(e,t,n){e.exports=n(354)}},[[97,1,2]]]);
//# sourceMappingURL=main.2a9dfbe2.chunk.js.map