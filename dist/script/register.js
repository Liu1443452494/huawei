"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Formvalidator=void 0;var _createClass=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),_tools=require("./tools.js");function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Formvalidator=function(){function t(){_classCallCheck(this,t),this.inputs=(0,_tools.$)("form input","all"),this.matips=(0,_tools.$)(".matips"),this.matips_3=(0,_tools.$)(".matips_3"),this.m1_left=(0,_tools.$)(".m1_left"),this.m1_right=(0,_tools.$)(".m1_right"),this.bgs=(0,_tools.$)(".last .bg","all"),this.span1s=(0,_tools.$)(".last .span1","all"),this.form=(0,_tools.$)("form"),this.btn=(0,_tools.$)("form .button"),this.flag1=!0,this.flag2=!0,this.flag3=!0}return _createClass(t,[{key:"init",value:function(){var t=this;this.inputs[0].onblur=function(){t.isRegister(this)},this.inputs[1].onblur=function(){t.pvalidator(this),t.matips.style.display="none"},this.inputs[2].onblur=function(){t.confirmpassword(this)},this.inputs[1].oninput=function(){t.passwordTips(this)},this.inputs[0].oninput=function(){t.forbiddenLetters(this)},this.inputs[2].oninput=function(){this.parentNode.style.border=0,this.parentNode.children[2].innerHTML=""},this.datatime(),this.showOrHide(),this.onsubmit()}},{key:"isRegister",value:function(t){var e=this;this.validator(t)&&(0,_tools.ajax)({url:"http://10.31.161.144/huawei/php/register.php",data:{user:this.inputs[0].value},type:"post"}).then(function(t){t&&(e.flag1=!1,e.inputs[0].parentNode.style.border="1px solid red",e.inputs[0].parentNode.children[2].innerHTML="手机号码已经注册")})}},{key:"passwordTips",value:function(t){t.parentNode.style.border=0,t.parentNode.children[2].innerHTML="",this.matips.style.display="block",this.m1_right.style.color="#333",this.m1_left.style.color="#333",this.matips_3.style.borderBottom=0,this.matips_3.innerHTML="密码强度：";""!==t.value&&/^(\w){8,}$/.test(t.value)&&(this.m1_left.style.color="rgb(55, 204, 14)",/[a-zA-Z]/g.test(t.value)&&(this.m1_right.style.color="rgb(55, 204, 14)",this.matips_3.innerHTML="密码强度：强",this.matips_3.style.borderBottom="4px solid rgb(55, 204, 14)"))}},{key:"forbiddenLetters",value:function(t){/[a-zA-z]/g.test(t.value)&&setTimeout(function(){t.value=t.value.substr(0,t.value.length-1)},100),t.parentNode.style.border=0,t.parentNode.children[2].innerHTML=""}},{key:"validator",value:function(t){if(""!==t.value){if(/^1[3578]\d{9}$/.test(t.value))return this.flag1=!0;t.parentNode.style.border="1px solid red",t.parentNode.children[2].innerHTML="手机号码不正确",this.flag1=!1}}},{key:"pvalidator",value:function(t){""!==t.value&&(/^(\w){8,}$/.test(t.value)?(this.m1_left.style.color="rgb(55, 204, 14)",/[a-zA-Z]/g.test(t.value)?(this.m1_right.style.color="rgb(55, 204, 14)",this.matips_3.innerHTML="密码强度：强",this.flag2=!0):(t.parentNode.style.border="1px solid red",t.parentNode.children[2].innerHTML="至少包含字母和数字，不能包含空格",this.flag2=!1)):(t.parentNode.style.border="1px solid red",t.parentNode.children[2].innerHTML="至少包含8个字符",this.flag2=!1))}},{key:"confirmpassword",value:function(t){""!==t.value&&(t.value==this.inputs[1].value?this.flag3=!0:(t.parentNode.style.border="1px solid red",t.parentNode.children[2].innerHTML="密码与确认密码不一致",this.flag3=!1))}},{key:"datatime",value:function(){var t=this;t.render(this.span1s[0],2019,1900),t.render(this.span1s[1],1,12),t.render(this.span1s[2],1,31);this.span1s[0].parentNode.innerText.substr(0,4)}},{key:"render",value:function(e,t,n){var i="";if(n<t){for(var s=t;n<=s;s--)i+="<span>"+s+"</span>";e.innerHTML=i}else{for(var r=t;r<=n;r++)i+="<span>"+r+"</span>";e.innerHTML=i}for(var o=(0,_tools.$)("span","all",e),a=function(t){o[t].onclick=function(){31<o.length?e.parentNode.firstElementChild.innerHTML=o[t].innerHTML+"年":31<o.length?e.parentNode.firstElementChild.innerHTML=o[t].innerHTML+"月":e.parentNode.firstElementChild.innerHTML=o[t].innerHTML+"日",e.style.display="none"}},l=0;l<o.length;l++)a(l)}},{key:"showOrHide",value:function(){for(var t=this,n=this,e=function(e){t.bgs[e].onclick=function(){for(var t=0;t<n.span1s.length;t++)n.span1s[t].style.display="none";n.span1s[e].style.display="block"}},i=0;i<this.bgs.length;i++)e(i)}},{key:"onsubmit",value:function(){var n=this;this.btn.onclick=function(){if(""==n.inputs[0].value&&(n.inputs[0].parentNode.style.border="1px solid red",n.inputs[0].parentNode.children[2].innerHTML="手机号码不能为空",n.flag1=!1,""==n.inputs[1].value&&(n.inputs[1].parentNode.style.border="1px solid red",n.inputs[1].parentNode.children[2].innerHTML="密码不能为空",n.flag2=!1,""==n.inputs[2].value&&(n.inputs[2].parentNode.style.border="1px solid red",n.inputs[2].parentNode.children[2].innerHTML="密码不能为空",n.flag3=!1))),!(n.flag1&&n.flag2&&n.flag3))return!1;var t=n.inputs[0].value,e=n.inputs[1].value;(0,_tools.ajax)({url:"http://10.31.161.144/huawei/php/register.php",data:{username:t,password:e},type:"post"}),alert("注册成功"),location.reload(!0)}}}]),t}();exports.Formvalidator=Formvalidator;