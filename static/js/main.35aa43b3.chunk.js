(this["webpackJsonpno-barrier-chat"]=this["webpackJsonpno-barrier-chat"]||[]).push([[0],{108:function(e,t,a){e.exports=a(277)},113:function(e,t,a){},114:function(e,t,a){},277:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(106),i=a.n(r),l=(a(113),a(5)),c=a(6),o=a(8),u=a(7),m=a(9),g=(a(114),a(56)),h=a.n(g);a(115),a(116);h.a.initializeApp({apiKey:"AIzaSyBlKx7tzmawALlymKEkgJZiLdY4IE2VXHg",authDomain:"translatechat-6c518.firebaseapp.com",databaseURL:"https://translatechat-6c518.firebaseio.com",projectId:"translatechat-6c518",storageBucket:"translatechat-6c518.appspot.com",messagingSenderId:"187513714020",appId:"1:187513714020:web:aa171bc1b36018a37d3671"});var d=h.a;var f=function(e){return s.a.createElement("button",{className:"submitButton",type:"submit"},e.label)},p=a(3),v=a.n(p),b=a(36),E=a.n(b),S="trnsl.1.1.20191120T174117Z.30abf07a083257c3.606e1a38fc565562205063e541cb970657ab2600";var k=function(e,t,a,n){v.a.database().ref("".concat(a,"/settings/language")).once("value").then((function(s){var r=s.val();E()({method:"get",url:"https://translate.yandex.net/api/v1.5/tr.json/translate",responseType:"json",params:{key:S,text:e,format:"plain",lang:r}}).then((function(e){var s=e.data.text.join(""),r=v.a.database().ref("".concat(a,"/chats/").concat(t,"/messages")),i={message:s,type:"recieved",time:Date(Date.now().toString()).split(" GMT").splice(1,1)};r.push(i),v.a.database().ref("".concat(a,"/chats/").concat(t,"/nickname")).set(n)})).catch((function(e){console.log(e)}))}))},I=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleSubmit=function(t){t.preventDefault();var a=v.a.database().ref("".concat(e.props.sender,"/chats/").concat(e.props.reciever,"/messages")),n={message:e.state.text,type:"sent",time:Date(Date.now().toString()).split(" GMT").splice(0,1)};a.push(n),k(e.state.text,e.props.sender,e.props.reciever,e.props.nickname)},e.handleChange=function(t){e.setState({text:t.target.value})},e.state={text:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"chatForm",action:"",onSubmit:this.handleSubmit},s.a.createElement("textarea",{name:"",id:"",cols:"30",rows:"10",value:this.state.text,onChange:this.handleChange,disabled:!this.props.reciever,required:!0}),s.a.createElement(f,{label:"Send"}))}}]),t}(n.Component),y=a(37),O=a.n(y);var C=function(e){return s.a.createElement("div",{className:"recentMessagesDiv"},s.a.createElement("div",{className:"chatHeader"},e.userImg?s.a.createElement("img",{src:e.userImg,alt:""}):s.a.createElement("img",{src:O.a,alt:""}),e.chattingWith?s.a.createElement("h2",null,e.chattingWith):s.a.createElement("h2",null,"No chat has been selected!")),s.a.createElement("ul",{className:"recentMessages"},e.messages.map((function(e,t){return s.a.createElement("li",{key:t,className:e.type},s.a.createElement("p",{className:"time"},e.time),s.a.createElement("p",null,e.message))}))))};var j=function(e){return s.a.createElement("li",{className:"friendButton"},s.a.createElement("button",{onClick:function(t){e.function(t.currentTarget.value,t.currentTarget.id)},value:e.name,id:e.uid},e.imgUrl?s.a.createElement("img",{src:e.imgUrl,alt:"A picture of ".concat(e.name)}):s.a.createElement("img",{src:O.a,alt:"The user has no picture"}),s.a.createElement("p",null,e.name)),s.a.createElement("button",{className:"deleteButton",onClick:function(t){e.deleteFunction(t.currentTarget.value)},value:e.index},s.a.createElement("i",{className:"fas fa-trash-alt"})))},N=a(16);var w=function(e){return s.a.createElement("div",{className:"alert"},s.a.createElement("h2",null,e.message),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){e.functionToClose(),console.log(e)}},"Ok"),e.resend?s.a.createElement("button",{onClick:function(){v.a.auth().currentUser.sendEmailVerification()}},"Resend email"):""))},U=(a(141),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).addFriend=function(t){t.preventDefault();var a=[];e.state.openedChats.includes(e.state.nickname)||e.state.nickname===e.props.userNickname?e.setState({errorMessage:"You already have an opened chat with ".concat(e.state.nickname),error:!0}):d.database().ref().once("value").then((function(t){var n=t.val(),s=[];for(var r in n)if("generalConfig"!==r){a.push(r);var i=d.database().ref("".concat(r,"/settings/nickname"));s.push(i.once("value"))}Promise.all(s).then((function(t){var n=!1;t.forEach((function(s,r){s.val()===e.state.nickname?(n=!0,d.database().ref("".concat(a[r],"/chats")).once("value").then((function(t){var n=[],s=t.val();for(var i in s)n.push(i);n.length<=5?(d.database().ref("".concat(e.props.userId,"/chats")).update(Object(N.a)({},a[r],{nickname:e.state.nickname,messages:""})),d.database().ref("".concat(a[r],"/chats")).update(Object(N.a)({},e.props.userId,{nickname:e.props.userNickname,messages:""}))):e.setState({errorMessage:"The user you are trying to reach has already 5 conversations opened.",error:!0})}))):r!==t.length-1||n||(console.log(n),e.setState({errorMessage:"".concat(e.state.nickname," doesn't have an account!"),error:!0}))}))}))}))},e.handleChange=function(t){e.setState({nickname:t.target.value})},e.closeAlert=function(){e.setState({error:!1})},e.state={nickname:null,openedChats:[],error:!1,errorMessage:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.database().ref("".concat(this.props.userId,"/chats")).on("value",(function(t){var a=[],n=t.val();for(var s in n)a.push(n[s].nickname);e.setState({openedChats:a})}))}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.error?s.a.createElement(w,{message:this.state.errorMessage,functionToClose:this.closeAlert,resend:!1}):"",s.a.createElement("form",{className:"addFriendBar",action:"",onSubmit:this.addFriend},s.a.createElement("label",{htmlFor:"nickname"},"Enter nickname of a friend to start a conversation:"),s.a.createElement("input",{type:"text",id:"nickname",value:this.state.nickname,onChange:this.handleChange,required:!0}),s.a.createElement(f,{label:"Add"})))}}]),t}(n.Component)),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).select=function(e,t){var n=function(n){var s=[],r=n.val();if(null!=r){if(r.length)s.push(r);else for(var i in r)s.push(r[i]);console.log(s)}a.setState({userId:a.props.userId,userEmail:a.props.userEmail,messages:s,chattingWithName:e,chattingWithUid:t,language:""})};console.log("".concat(a.state.userId,"/").concat(t));var s=d.database().ref("".concat(a.state.userId,"/chats/").concat(t,"/messages"));s.off("value",n),s.on("value",n)},a.deleteConversation=function(e){d.database().ref("".concat(a.state.userId,"/chats/").concat(a.state.friends[e].uid)).remove().then((function(){console.log("deleted")})),d.database().ref("".concat(a.state.friends[e].uid,"/chats/").concat(a.state.userId)).remove().then((function(){console.log("deleted")}))},a.state={userId:e.userId,userNickname:e.name,userEmail:null,chattingWithName:null,chattingWithUid:null,languageToTransalte:null,friends:[],messages:[],language:"",userImg:null},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;null!==this.state.chattingWithUid&&d.database().ref("".concat(this.state.chattingWithUid,"/settings")).once("value").then((function(t){e.setState({language:t.val().language})}));d.database().ref("".concat(this.state.userId,"/chats")).on("value",(function(t){var a=t.val(),n=[];for(var s in a)console.log(a[s]),n.push({uid:s,name:a[s].nickname});e.setState({friends:n})}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{className:"chatPageContainer"},s.a.createElement("div",{className:"listOfFriends"},this.state.friends.length<=5?s.a.createElement(U,{userId:this.state.userId,userNickname:this.state.userNickname}):null,s.a.createElement("ul",null,this.state.friends.map((function(t,a){return s.a.createElement(j,{key:a,uid:t.uid,name:t.name,imgUrl:t.imgUrl?t.imgUrl:null,userNickname:e.state.userNickname,function:e.select,index:a,deleteFunction:e.deleteConversation})})))),s.a.createElement("div",{className:"messagesAndTextContainer"},s.a.createElement("h2",null,"Hi ".concat(this.props.name,"! Start chatting without worrying about language barrier! ")),s.a.createElement(C,{messages:this.state.messages,chattingWith:this.state.chattingWithName,userImg:this.state.userImg}),s.a.createElement(I,{language:this.state.language,sender:this.state.userId,reciever:this.state.chattingWithUid,nickname:this.state.userNickname}))))}}]),t}(n.Component),F=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){e.setState(Object(N.a)({},t.target.id,t.target.value))},e.signIn=function(t){t.preventDefault(),v.a.auth().signInWithEmailAndPassword(e.state.email,e.state.password).then((function(e){})).catch((function(e){var t=e.code,a=e.message;console.log(t),console.log(a)}))},e.state={email:"",password:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"signIn",action:"",onSubmit:this.signIn},s.a.createElement("h2",null,"Sign In"),s.a.createElement("label",{htmlFor:"email"},"Enter email"),s.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange,value:this.state.email,required:!0}),s.a.createElement("label",{htmlFor:"password"},"Enter password"),s.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange,value:this.state.password,required:!0}),s.a.createElement(f,{label:"Sign in"}))}}]),t}(n.Component),A=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).state={languages:[]},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;E()({method:"get",url:"https://translate.yandex.net/api/v1.5/tr.json/getLangs",responseType:"json",params:{key:"trnsl.1.1.20191120T174117Z.30abf07a083257c3.606e1a38fc565562205063e541cb970657ab2600",ui:"en"}}).then((function(t){var a=t.data.langs,n=[],s=[];for(var r in a)n.push({name:a[r],code:r});n=n.sort(),s=s.sort(),n=n.sort((function(e,t){return e.name<t.name?-1:e.name==t.name?0:1})),e.setState({languages:n})}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"language"},"Select your language:  "),s.a.createElement("select",{name:"language",id:"language",onChange:this.props.function,required:!0},this.state.languages.map((function(e){return s.a.createElement("option",{id:e.name,value:e.code,selected:"English"===e.name?"selected":""},e.name," ")}))))}}]),t}(n.Component),T=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).getLanguage=function(t){console.log(t.target.value),e.setState({language:t.target.value})},e.createUser=function(t){t.preventDefault(),v.a.auth().createUserWithEmailAndPassword(e.state.email,e.state.password).then((function(t){var a={chats:!1,settings:{language:e.state.language,nickname:e.state.name,email:e.state.email}};console.log(a,"here"),console.log("user",t.user.uid),v.a.database().ref("".concat(t.user.uid)).update(a),t.user.sendEmailVerification().then((function(){})).catch((function(e){console.log(e)})),t.user.updateProfile({displayName:e.state.name,language:e.state.language})})).catch((function(e){e.code;var t=e.message;console.log(t)}))},e.handleChange=function(t){e.setState(Object(N.a)({},t.target.id,t.target.value))},e.state={email:"",password:"",name:"",language:"en",signedUp:!1},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"signUp",action:"",onSubmit:this.createUser},s.a.createElement("h2",null,"Sign up"),s.a.createElement("label",{htmlFor:"name"},"Enter nickname"),s.a.createElement("input",{type:"text",id:"name",maxLength:10,onChange:this.handleChange,value:this.state.name,required:!0}),s.a.createElement("label",{htmlFor:"email"},"Enter email"),s.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange,value:this.state.email,required:!0}),s.a.createElement("label",{htmlFor:"password"},"Enter password"),s.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange,value:this.state.password,required:!0}),s.a.createElement(A,{function:this.getLanguage}),s.a.createElement(f,{label:"Sign up"}))}}]),t}(n.Component),D=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).signInGuest=function(t){t.preventDefault(),v.a.auth().setPersistence(v.a.auth.Auth.Persistence.NONE).then((function(){return v.a.auth().signInAnonymously().then((function(t){var a=t.user.uid;v.a.database().ref("/generalConfig").once("value").then((function(t){e.setState({userId:a}),console.log(t.val().guestNumber);var n={chats:!1,settings:{language:e.state.language,nickname:"guest".concat(t.val().guestNumber),email:null,isGuest:!0}};v.a.database().ref("".concat(a)).update(n)}))})).catch((function(e){e.code;var t=e.message;console.log(t)}))})).catch((function(e){e.code,e.message}))},e.handleChange=function(t){e.setState(Object(N.a)({},t.target.id,t.target.value))},e.getLanguage=function(t){console.log(t.target.value),e.setState({language:t.target.value})},e.state={email:"",password:"",name:"",language:"en",userId:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"guestSignIn",action:"",onSubmit:this.signInGuest},s.a.createElement("h2",null,"Sign up Guest"),s.a.createElement("p",null,"Signing in as a guest means you wont be able to select your nickname and will only be able to  get access to your conversations while logged in. If your refresh the page you will automatically logged out."),s.a.createElement(A,{function:this.getLanguage}),s.a.createElement(f,{label:"Sign in"}))}}]),t}(n.Component),W=function(){v.a.auth().signOut()};var L=function(e){return s.a.createElement("header",null,s.a.createElement("h1",null,"No Barriers Chat!"),e.signedIn?s.a.createElement("nav",null,s.a.createElement("button",{onClick:W},"Sign Out"),s.a.createElement("button",null,"Settings")):"")};var M=function(){return s.a.createElement("footer",null,s.a.createElement("p",null,"Made by Juan Acaiturri Copyright \xa9 2019"))},V=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).getLanguageFromSignUp=function(t){e.setState({language:t})},e.closeAlert=function(){e.setState({alert:!1}),console.log(e.state)},e.selectOption=function(t){e.setState({optionSelected:t.target.value})},e.seeFriendList=function(){console.log(e.state.friendsVisible),e.state.friendsVisible?e.setState({friendsVisible:!1}):e.setState({friendsVisible:!0})},e.state={signedIn:!1,userId:null,userEmail:null,name:null,language:null,verified:null,alert:!1,optionSelected:"signIn",friendsVisible:!1},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.auth().onAuthStateChanged((function(t){if(t&&t.emailVerified)e.setState({signedIn:!0,userId:t.uid,name:t.displayName,email:t.email,language:""});else if(t&&!t.emailVerified&&t.email)e.setState({alert:!0});else if(t&&null===t.email){var a=d.database().ref("/generalConfig");a.once("value").then((function(n){e.setState({signedIn:!0,userId:t.uid,email:null,name:"guest".concat(n.val().guestNumber)}),a.update({guestNumber:n.val().guestNumber+1})}))}else e.setState({signedIn:!1,userId:null})}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(L,{signedIn:this.state.signedIn,friendListAppear:this.seeFriendList}),s.a.createElement("main",null,this.state.signedIn?s.a.createElement(x,{userId:this.state.userId,name:this.state.name,language:this.state.language,friendsVisible:this.state.friendsVisible}):s.a.createElement("div",{className:"options"},this.state.alert?s.a.createElement(w,{functionToClose:this.closeAlert,message:"Please verify your email and refresh after!",resend:!0}):"",s.a.createElement("div",{className:"optionsButtons"},s.a.createElement("button",{onClick:this.selectOption,value:"signIn",className:"signIn"===this.state.optionSelected?"":"inactive"},"Sign In"),s.a.createElement("button",{onClick:this.selectOption,value:"signUp",className:"signUp"===this.state.optionSelected?"":"inactive"},"Sign Up"),s.a.createElement("button",{onClick:this.selectOption,value:"guestSignIn",className:"guestSignIn"===this.state.optionSelected?"":"inactive"},"Guest Sign In")),"signIn"===this.state.optionSelected?s.a.createElement(F,null):"signUp"===this.state.optionSelected?s.a.createElement(T,{function:this.getLanguageFromSignUp}):s.a.createElement(D,null))),s.a.createElement(M,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},37:function(e,t,a){e.exports=a.p+"static/media/noImage.8c35acc9.png"}},[[108,1,2]]]);
//# sourceMappingURL=main.35aa43b3.chunk.js.map