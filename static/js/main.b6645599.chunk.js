(this["webpackJsonpgenki-vocab"]=this["webpackJsonpgenki-vocab"]||[]).push([[0],{132:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(10),i=n.n(s),r=n(60),o=n.n(r),c=(n(72),n(29)),u=n(64),h=n(61),l=n(62),d=n(66),p=n(65),j=(n.p,n(73),n(63)),m=n(130),b=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],v=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={lessonNumber:1,partNumber:0,vocabItems:[],currentQueue:[],vocabIndex:0,revealDetails:!1,currentWord:null,hasFailed:!1,showRomaji:!1},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.updateState=this.updateState.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onLessonChange=this.onLessonChange.bind(this),this.setLesson=this.setLesson.bind(this),this.onRomajiChecked=this.onRomajiChecked.bind(this),this.removeKanaFromQueue=this.removeKanaFromQueue.bind(this),this.onKanjiClicked=this.onKanjiClicked.bind(this),this.onPartChange=this.onPartChange.bind(this),this.setLesson()}},{key:"shuffleArray",value:function(e){for(var t=Object(u.a)(e),n=t.length-1;n>0;n--){var a=Math.floor(Math.random()*(n+1)),s=t[n];t[n]=t[a],t[a]=s}return t}},{key:"setLesson",value:function(){var e=this;this.updateState({vocabItems:[],currentWord:null}),console.log("Fetching Kanji from website..."),fetch("https://api.codetabs.com/v1/proxy?quest="+encodeURI("http://ohelo.org/japn/lang/genki_vocab_table.php?lesson="+this.state.lessonNumber)).then((function(e){return e.text()})).then((function(t){console.log("Fetched!");for(var n=[],a=Object(j.load)(t)("tbody").children(),s=a.length,i=1;i<s;i++){var r=a.eq(i),o=void 0;(o=3==r.children().length?{kana:r.children().eq(0).text().trim(),kanji:r.children().eq(1).text().trim(),english:r.children().eq(2).text().split(/,|;|\//).map((function(e){return e.trim()}))}:{kana:r.children().eq(0).text().trim(),kanji:r.children().eq(1).text().trim(),romaji:r.children().eq(2).text().split(/,|;|\//).map((function(e){return e.trim().toLowerCase()})),english:r.children().eq(3).text().split(/,|;|\//).map((function(e){return e.trim()}))}).romaji=o.kana.split("\uff0f").map((function(e){return m.fromKana(e).trim().toLowerCase().replace(/\u014d/gi,"ou").replace(/\u0101/gi,"aa").replace(/\u0113/gi,"ei").replace(/\u016b/gi,"uu").replace(/\u012b/gi,"ii")})),n.push(o)}n=e.shuffleArray(n),e.updateState({partNumber:0,currentQueue:n.slice(0,10),vocabItems:n,vocabIndex:e.random(n.length),revealDetails:!1},(function(){e.updateState({currentWord:e.state.currentQueue.pop()})}))}))}},{key:"random",value:function(e){return Math.floor(Math.random()*Math.floor(e))}},{key:"updateState",value:function(e,t){var n=Object(c.a)(Object(c.a)({},this.state),e);this.setState(n,t)}},{key:"strip",value:function(e){return e.trim().toLowerCase().replace(/[^0-9a-z]/gi,"").replace(/ee/gi,"ei").replace(/oo/gi,"ou")}},{key:"onKeyDown",value:function(e){var t=this;if("Enter"===e.key){if(this.state.currentWord.romaji.map((function(e){return t.strip(e)})).includes(this.strip(e.target.value)))if(this.state.hasFailed&&this.state.currentQueue.unshift(this.state.currentWord),0==this.state.currentQueue.length)if(10*this.state.partNumber>=this.state.vocabItems.length)this.updateState({lessonNumber:parseInt(this.state.lessonNumber)+1},(function(){t.setLesson()}));else{var n=parseInt(this.state.partNumber)+1;this.updateState({partNumber:n,currentQueue:this.state.vocabItems.slice(10*n,10*(n+1))},(function(){t.updateState({currentWord:t.state.currentQueue.pop()})}))}else this.updateState({currentWord:this.state.currentQueue.pop(),revealDetails:!1,hasFailed:!1});else this.updateState({revealDetails:!0,hasFailed:!0});e.target.value=""}}},{key:"onLessonChange",value:function(e){var t=this;this.updateState({lessonNumber:parseInt(e.target.value)},(function(){t.setLesson()}))}},{key:"onPartChange",value:function(e){var t=this;this.updateState({partNumber:e.target.value,currentQueue:this.state.vocabItems.slice(10*e.target.value,10*(parseInt(e.target.value)+1))},(function(){t.updateState({currentWord:t.state.currentQueue.pop()})}))}},{key:"onRomajiChecked",value:function(){this.updateState({showRomaji:!this.state.showRomaji})}},{key:"removeKanaFromQueue",value:function(){this.updateState({currentQueue:this.state.currentQueue.filter((function(e){return""!=e.kanji.trim()}))})}},{key:"onKanjiClicked",value:function(e){this.state.revealDetails&&window.open("https://jisho.org/search?keyword="+e),this.updateState({revealDetails:!0,hasFailed:!0})}},{key:"render",value:function(){var e=this,t=this.state.currentWord;if(!t)return Object(a.jsx)("div",{className:"app centered",children:"Fetching vocabulary... This may take a while."});var n=""==t.kanji?t.kana:t.kanji;return Object(a.jsxs)("div",{className:"app",children:[Object(a.jsxs)("div",{className:"centered",children:[Object(a.jsx)("select",{className:"lesson-select",onChange:function(t){return e.onLessonChange(t)},value:this.state.lessonNumber,children:b.map((function(e){return Object(a.jsxs)("option",{value:e,children:["Lesson ",e]},e)}))}),"\xa0\xa0",Object(a.jsx)("select",{className:"part-select",onChange:function(t){return e.onPartChange(t)},value:this.state.partNumber,children:function(){for(var t=[],n=0;10*n<e.state.vocabItems.length;n++)t.push(Object(a.jsxs)("option",{value:n,children:["Part ",n+1]},n));return t}()}),"\xa0\xa0",Object(a.jsx)("input",{type:"button",value:"Kanji Only",onClick:function(){return e.removeKanaFromQueue()}}),Object(a.jsx)("br",{}),Object(a.jsx)("input",{type:"checkbox",name:"romaji",checked:this.state.showRomaji,onChange:function(t){return e.onRomajiChecked(t)}}),Object(a.jsx)("label",{for:"romaji",children:" Show Romaji Pronounciations"}),Object(a.jsx)("hr",{})]}),Object(a.jsxs)("div",{className:"the-app centered",children:[Object(a.jsxs)("p",{children:[1+this.state.currentQueue.length," Left"]}),Object(a.jsx)("h1",{className:"centered kanji",children:Object(a.jsx)("a",{href:"#",onClick:function(){return e.onKanjiClicked(n)},children:n})}),this.state.revealDetails?Object(a.jsxs)("div",{children:[""!=t.kanji||this.state.showRomaji?Object(a.jsx)("p",{className:"help-text",children:"pronounciation"}):void 0,""==t.kanji?this.state.showRomaji?Object(a.jsx)("h2",{className:"pronounciation",children:t.romaji.join(", ")}):void 0:Object(a.jsxs)("h2",{className:"pronounciation",children:[t.kana,Object(a.jsx)("br",{}),this.state.showRomaji?t.romaji.join(", "):void 0]}),Object(a.jsx)("p",{className:"help-text",children:"meaning"}),Object(a.jsx)("h2",{className:"english",children:t.english.join(", ")})]}):void 0]}),Object(a.jsxs)("div",{className:"centered",children:[Object(a.jsx)("p",{className:"help-text",children:"Enter the romaji that corresponds to this word"}),Object(a.jsx)("input",{className:"main-textbox",type:"text",onKeyDown:function(t){return e.onKeyDown(t)}})]})]})}}]),n}(s.Component),f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,133)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),s(e),i(e),r(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root")),f()},72:function(e,t,n){},73:function(e,t,n){}},[[132,1,2]]]);
//# sourceMappingURL=main.b6645599.chunk.js.map