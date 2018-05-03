!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";var i=function(){function i(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}}();function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var A=void 0;void 0===A&&(A={modules:[]});var r=null;function s(t){var e=t.getBoundingClientRect(),o={};for(var i in e)o[i]=e[i];if(t.ownerDocument!==document){var n=t.ownerDocument.defaultView.frameElement;if(n){var r=s(n);o.top+=r.top,o.bottom+=r.top,o.left+=r.left,o.right+=r.left}}return o}function a(t){var e=(getComputedStyle(t)||{}).position,o=[];if("fixed"===e)return[t];for(var i=t;(i=i.parentNode)&&i&&1===i.nodeType;){var n=void 0;try{n=getComputedStyle(i)}catch(t){}if(null==n)return o.push(i),o;var r=n,s=r.overflow,a=r.overflowX,l=r.overflowY;/(auto|scroll|overlay)/.test(s+l+a)&&("absolute"!==e||0<=["relative","absolute","fixed"].indexOf(n.position))&&o.push(i)}return o.push(t.ownerDocument.body),t.ownerDocument!==document&&o.push(t.ownerDocument.defaultView),o}var l,h=(l=0,function(){return++l}),f={},d=function(){var t=r;t&&document.body.contains(t)||((t=document.createElement("div")).setAttribute("data-tether-id",h()),M(t.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(t),r=t);var e=t.getAttribute("data-tether-id");return void 0===f[e]&&(f[e]=s(t),k(function(){delete f[e]})),f[e]};function p(){r&&document.body.removeChild(r),r=null}function T(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i=s(t),n=d();return i.top-=n.top,i.left-=n.left,void 0===i.width&&(i.width=document.body.scrollWidth-i.left-i.right),void 0===i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function S(t){return t.offsetParent||document.documentElement}var c=null;function P(){if(c)return c;var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");M(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return c={width:n,height:n}}function M(){var o=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=[];return Array.prototype.push.apply(t,arguments),t.slice(1).forEach(function(t){if(t)for(var e in t)({}).hasOwnProperty.call(t,e)&&(o[e]=t[e])}),o}function u(e,t){if(void 0!==e.classList)t.split(" ").forEach(function(t){t.trim()&&e.classList.remove(t)});else{var o=new RegExp("(^| )"+t.split(" ").join("|")+"( |$)","gi"),i=v(e).replace(o," ");b(e,i)}}function g(e,t){if(void 0!==e.classList)t.split(" ").forEach(function(t){t.trim()&&e.classList.add(t)});else{u(e,t);var o=v(e)+" "+t;b(e,o)}}function m(t,e){if(void 0!==t.classList)return t.classList.contains(e);var o=v(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function v(t){return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString?t.className.baseVal:t.className}function b(t,e){t.setAttribute("class",e)}function W(e,o,t){t.forEach(function(t){-1===o.indexOf(t)&&m(e,t)&&u(e,t)}),o.forEach(function(t){m(e,t)||g(e,t)})}var y=[],k=function(t){y.push(t)},_=function(){for(var t=void 0;t=y.pop();)t()},w=function(){function t(){n(this,t)}return i(t,[{key:"on",value:function(t,e,o){var i=!(arguments.length<=3||void 0===arguments[3])&&arguments[3];void 0===this.bindings&&(this.bindings={}),void 0===this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if(void 0!==this.bindings&&void 0!==this.bindings[t])if(void 0===e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if(void 0!==this.bindings&&this.bindings[t]){for(var e=0,o=arguments.length,i=Array(1<o?o-1:0),n=1;n<o;n++)i[n-1]=arguments[n];for(;e<this.bindings[t].length;){var r=this.bindings[t][e],s=r.handler,a=r.ctx,l=r.once,h=a;void 0===h&&(h=this),s.apply(h,i),l?this.bindings[t].splice(e,1):++e}}}}]),t}();A.Utils={getActualBoundingClientRect:s,getScrollParents:a,getBounds:T,getOffsetParent:S,extend:M,addClass:g,removeClass:u,hasClass:m,updateClasses:W,defer:k,flush:_,uniqueId:h,Evented:w,getScrollBarSize:P,removeUtilElements:p};var B=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},C=(i=function(){function i(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}}(),function(t,e,o){for(var i=!0;i;){var n=t,r=e,s=o;i=!1,null===n&&(n=Function.prototype);var a=Object.getOwnPropertyDescriptor(n,r);if(void 0!==a){if("value"in a)return a.value;var l=a.get;if(void 0===l)return;return l.call(s)}var h=Object.getPrototypeOf(n);if(null===h)return;t=h,e=r,o=s,i=!0,a=h=void 0}});function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}if(void 0===A)throw new Error("You must include the utils.js file before tether.js");var a=(J=A.Utils).getScrollParents,S=(T=J.getBounds,J.getOffsetParent),g=(M=J.extend,J.addClass),u=J.removeClass,P=(W=J.updateClasses,k=J.defer,_=J.flush,J.getScrollBarSize),p=J.removeUtilElements;function O(t,e){var o=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return e<=t+o&&t-o<=e}var E,x,z,j,Y=function(){if("undefined"==typeof document)return"";for(var t=document.createElement("div"),e=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),L=[],D=function(){L.forEach(function(t){t.position(!1)}),_()};function X(){return performance&&performance.now?performance.now():+new Date}z=x=E=null,j=function t(){if(void 0!==x&&16<x)return x=Math.min(x-16,250),void(z=setTimeout(t,250));void 0!==E&&X()-E<10||(null!=z&&(clearTimeout(z),z=null),E=X(),D(),x=X()-E)},"undefined"!=typeof window&&void 0!==window.addEventListener&&["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,j)});var F={center:"center",left:"right",right:"left"},H={middle:"middle",top:"bottom",bottom:"top"},N={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},U=function(t){var e=t.left,o=t.top;return void 0!==N[t.left]&&(e=N[t.left]),void 0!==N[t.top]&&(o=N[t.top]),{left:e,top:o}};function V(){for(var i={top:0,left:0},t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o];return e.forEach(function(t){var e=t.top,o=t.left;"string"==typeof e&&(e=parseFloat(e,10)),"string"==typeof o&&(o=parseFloat(o,10)),i.top+=e,i.left+=o}),i}function R(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t}var q=function(t){var e=t.split(" "),o=B(e,2);return{top:o[0],left:o[1]}},I=q,$=function(t){function o(t){var e=this;n(this,o),C(Object.getPrototypeOf(o.prototype),"constructor",this).call(this),this.position=this.position.bind(this),L.push(this),this.history=[],this.setOptions(t,!1),A.modules.forEach(function(t){void 0!==t.initialize&&t.initialize.call(e)}),this.position()}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(o,w),i(o,[{key:"getClass",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.options.classes;return void 0!==e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=arguments.length<=1||void 0===arguments[1]||arguments[1];this.options=M({offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"},t);var i=this.options,n=i.element,r=i.target,s=i.targetModifier;if(this.element=n,this.target=r,this.targetModifier=s,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if(void 0===e[t])throw new Error("Tether Error: Both element and target must be defined");void 0!==e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),g(this.element,this.getClass("element")),!1!==this.options.addTargetClasses&&g(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=I(this.options.targetAttachment),this.attachment=I(this.options.attachment),this.offset=q(this.options.offset),this.targetOffset=q(this.options.targetOffset),void 0!==this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=a(this.target),!1!==this.options.enabled&&this.enable(o)}},{key:"getTargetBounds",value:function(){if(void 0===this.targetModifier)return T(this.target);if("visible"===this.targetModifier)return this.target===document.body?{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth}:((r={height:(t=T(this.target)).height,width:t.width,top:t.top,left:t.left}).height=Math.min(r.height,t.height-(pageYOffset-t.top)),r.height=Math.min(r.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),r.height=Math.min(innerHeight,r.height),r.height-=2,r.width=Math.min(r.width,t.width-(pageXOffset-t.left)),r.width=Math.min(r.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),r.width=Math.min(innerWidth,r.width),r.width-=2,r.top<pageYOffset&&(r.top=pageYOffset),r.left<pageXOffset&&(r.left=pageXOffset),r);if("scroll-handle"===this.targetModifier){var t=void 0,e=this.target;e===document.body?(e=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=T(e);var o=getComputedStyle(e),i=0;(e.scrollWidth>e.clientWidth||0<=[o.overflow,o.overflowX].indexOf("scroll")||this.target!==document.body)&&(i=15);var n=t.height-parseFloat(o.borderTopWidth)-parseFloat(o.borderBottomWidth)-i,r={width:15,height:.975*n*(n/e.scrollHeight),left:t.left+t.width-parseFloat(o.borderLeftWidth)-15},s=0;n<408&&this.target===document.body&&(s=-11e-5*Math.pow(n,2)-.00727*n+22.58),this.target!==document.body&&(r.height=Math.max(r.height,24));var a=this.target.scrollTop/(e.scrollHeight-n);return r.top=a*(n-r.height-s)+t.top+parseFloat(o.borderTopWidth),this.target===document.body&&(r.height=Math.max(r.height,24)),r}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return void 0===this._cache&&(this._cache={}),void 0===this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0];!1!==this.options.addTargetClasses&&g(this.target,this.getClass("enabled")),g(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach(function(t){t!==e.target.ownerDocument&&t.addEventListener("scroll",e.position)}),t&&this.position()}},{key:"disable",value:function(){var e=this;u(this.target,this.getClass("enabled")),u(this.element,this.getClass("enabled")),this.enabled=!1,void 0!==this.scrollParents&&this.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.position)})}},{key:"destroy",value:function(){var o=this;this.disable(),L.forEach(function(t,e){t===o&&L.splice(e,1)}),0===L.length&&p()}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;void 0!==this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),void 0===this._addAttachClasses&&(this._addAttachClasses=[]);var i=this._addAttachClasses;t.top&&i.push(this.getClass("element-attached")+"-"+t.top),t.left&&i.push(this.getClass("element-attached")+"-"+t.left),e.top&&i.push(this.getClass("target-attached")+"-"+e.top),e.left&&i.push(this.getClass("target-attached")+"-"+e.left);var n=[];["left","top","bottom","right","middle","center"].forEach(function(t){n.push(o.getClass("element-attached")+"-"+t),n.push(o.getClass("target-attached")+"-"+t)}),k(function(){void 0!==o._addAttachClasses&&(W(o.element,o._addAttachClasses,n),!1!==o.options.addTargetClasses&&W(o.target,o._addAttachClasses,n),delete o._addAttachClasses)})}},{key:"position",value:function(){var a=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0];if(this.enabled){this.clearCache();var e,o,i,n,r=(e=this.targetAttachment,o=this.attachment,i=e.left,n=e.top,"auto"===i&&(i=F[o.left]),"auto"===n&&(n=H[o.top]),{left:i,top:n});this.updateAttachClasses(this.attachment,r);var s=this.cache("element-bounds",function(){return T(a.element)}),l=s.width,h=s.height;if(0===l&&0===h&&void 0!==this.lastSize){var f=this.lastSize;l=f.width,h=f.height}else this.lastSize={width:l,height:h};var d=this.cache("target-bounds",function(){return a.getTargetBounds()}),p=d,c=R(U(this.attachment),{width:l,height:h}),u=R(U(r),p),g=R(this.offset,{width:l,height:h}),m=R(this.targetOffset,p);c=V(c,g),u=V(u,m);for(var v=d.left+u.left-c.left,b=d.top+u.top-c.top,y=0;y<A.modules.length;++y){var w=A.modules[y].position.call(this,{left:v,top:b,targetAttachment:r,targetPos:d,elementPos:s,offset:c,targetOffset:u,manualOffset:g,manualTargetOffset:m,scrollbarSize:x,attachment:this.attachment});if(!1===w)return!1;void 0!==w&&"object"==typeof w&&(b=w.top,v=w.left)}var C={page:{top:b,left:v},viewport:{top:b-pageYOffset,bottom:pageYOffset-b-h+innerHeight,left:v-pageXOffset,right:pageXOffset-v-l+innerWidth}},O=this.target.ownerDocument,E=O.defaultView,x=void 0;return E.innerHeight>O.documentElement.clientHeight&&(x=this.cache("scrollbar-size",P),C.viewport.bottom-=x.height),E.innerWidth>O.documentElement.clientWidth&&(x=this.cache("scrollbar-size",P),C.viewport.right-=x.width),-1!==["","static"].indexOf(O.body.style.position)&&-1!==["","static"].indexOf(O.body.parentElement.style.position)||(C.page.bottom=O.body.scrollHeight-b-h,C.page.right=O.body.scrollWidth-v-l),void 0!==this.options.optimizations&&!1!==this.options.optimizations.moveElement&&void 0===this.targetModifier&&function(){var t=a.cache("target-offsetparent",function(){return S(a.target)}),e=a.cache("target-offsetparent-bounds",function(){return T(t)}),o=getComputedStyle(t),i=e,n={};if(["Top","Left","Bottom","Right"].forEach(function(t){n[t.toLowerCase()]=parseFloat(o["border"+t+"Width"])}),e.right=O.body.scrollWidth-e.left-i.width+n.right,e.bottom=O.body.scrollHeight-e.top-i.height+n.bottom,C.page.top>=e.top+n.top&&C.page.bottom>=e.bottom&&C.page.left>=e.left+n.left&&C.page.right>=e.right){var r=t.scrollTop,s=t.scrollLeft;C.offset={top:C.page.top-e.top+r-n.top,left:C.page.left-e.left+s-n.left}}}(),this.move(C),this.history.unshift(C),3<this.history.length&&this.history.pop(),t&&_(),!0}}},{key:"move",value:function(e){var n=this;if(void 0!==this.element.parentNode){var o={};for(var t in e)for(var i in o[t]={},e[t]){for(var r=!1,s=0;s<this.history.length;++s){var a=this.history[s];if(void 0!==a[t]&&!O(a[t][i],e[t][i])){r=!0;break}}r||(o[t][i]=!0)}var l={top:"",left:"",right:"",bottom:""},h=function(t,e){if(!1!==(void 0!==n.options.optimizations?n.options.optimizations.gpu:null)){var o=void 0,i=void 0;if(t.top?(l.top=0,o=e.top):(l.bottom=0,o=-e.bottom),t.left?(l.left=0,i=e.left):(l.right=0,i=-e.right),window.matchMedia)window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches||window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches||(i=Math.round(i),o=Math.round(o));l[Y]="translateX("+i+"px) translateY("+o+"px)","msTransform"!==Y&&(l[Y]+=" translateZ(0)")}else t.top?l.top=e.top+"px":l.bottom=e.bottom+"px",t.left?l.left=e.left+"px":l.right=e.right+"px"},f=!1;if((o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",h(o.page,e.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",h(o.viewport,e.viewport)):void 0!==o.offset&&o.offset.top&&o.offset.left?function(){l.position="absolute";var t=n.cache("target-offsetparent",function(){return S(n.target)});S(n.element)!==t&&k(function(){n.element.parentNode.removeChild(n.element),t.appendChild(n.element)}),h(o.offset,e.offset),f=!0}():(l.position="absolute",h({top:!0,left:!0},e.page)),!f)if(this.options.bodyElement)this.element.parentNode!==this.options.bodyElement&&this.options.bodyElement.appendChild(this.element);else{for(var d=!0,p=this.element.parentNode;p&&1===p.nodeType&&"BODY"!==p.tagName;){if("static"!==getComputedStyle(p).position){d=!1;break}p=p.parentNode}d||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var c={},u=!1;for(var i in l){var g=l[i];this.element.style[i]!==g&&(u=!0,c[i]=g)}u&&k(function(){M(n.element.style,c),n.trigger("repositioned")})}}}]),o}();$.modules=[],A.position=D;var G=M($,A),M=(B=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},T=(J=A.Utils).getBounds,J.extend),Z=(W=J.updateClasses,k=J.defer,["left","top","right","bottom"]);A.modules.push({position:function(t){var g=this,m=t.top,v=t.left,b=t.targetAttachment;if(!this.options.constraints)return!0;var e=this.cache("element-bounds",function(){return T(g.element)}),y=e.height,w=e.width;if(0===w&&0===y&&void 0!==this.lastSize){var o=this.lastSize;w=o.width,y=o.height}var i=this.cache("target-bounds",function(){return g.getTargetBounds()}),C=i.height,O=i.width,n=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&n.push(e),o&&n.push(o)}),n.forEach(function(e){["left","top","right","bottom"].forEach(function(t){n.push(e+"-"+t)})});var E=[],x=M({},b),A=M({},this.attachment);return this.options.constraints.forEach(function(t){var e=t.to,o=t.attachment,i=t.pin;void 0===o&&(o="");var n=void 0,r=void 0;if(0<=o.indexOf(" ")){var s=o.split(" "),a=B(s,2);r=a[0],n=a[1]}else n=r=o;var l,h,f=(l=g,"scrollParent"===(h=e)?h=l.scrollParents[0]:"window"===h&&(h=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),h===document&&(h=h.documentElement),void 0!==h.nodeType&&function(){var t=h,e=T(h),o=e,i=getComputedStyle(h);if(h=[o.left,o.top,e.width+o.left,e.height+o.top],t.ownerDocument!==document){var n=t.ownerDocument.defaultView;h[0]+=n.pageXOffset,h[1]+=n.pageYOffset,h[2]+=n.pageXOffset,h[3]+=n.pageYOffset}Z.forEach(function(t,e){"Top"===(t=t[0].toUpperCase()+t.substr(1))||"Left"===t?h[e]+=parseFloat(i["border"+t+"Width"]):h[e]-=parseFloat(i["border"+t+"Width"])})}(),h);"target"!==r&&"both"!==r||(m<f[1]&&"top"===x.top&&(m+=C,x.top="bottom"),m+y>f[3]&&"bottom"===x.top&&(m-=C,x.top="top")),"together"===r&&("top"===x.top&&("bottom"===A.top&&m<f[1]?(m+=C,x.top="bottom",m+=y,A.top="top"):"top"===A.top&&m+y>f[3]&&m-(y-C)>=f[1]&&(m-=y-C,x.top="bottom",A.top="bottom")),"bottom"===x.top&&("top"===A.top&&m+y>f[3]?(m-=C,x.top="top",m-=y,A.top="bottom"):"bottom"===A.top&&m<f[1]&&m+(2*y-C)<=f[3]&&(m+=y-C,x.top="top",A.top="top")),"middle"===x.top&&(m+y>f[3]&&"top"===A.top?(m-=y,A.top="bottom"):m<f[1]&&"bottom"===A.top&&(m+=y,A.top="top"))),"target"!==n&&"both"!==n||(v<f[0]&&"left"===x.left&&(v+=O,x.left="right"),v+w>f[2]&&"right"===x.left&&(v-=O,x.left="left")),"together"===n&&(v<f[0]&&"left"===x.left?"right"===A.left?(v+=O,x.left="right",v+=w,A.left="left"):"left"===A.left&&(v+=O,x.left="right",v-=w,A.left="right"):v+w>f[2]&&"right"===x.left?"left"===A.left?(v-=O,x.left="left",v-=w,A.left="right"):"right"===A.left&&(v-=O,x.left="left",v+=w,A.left="left"):"center"===x.left&&(v+w>f[2]&&"left"===A.left?(v-=w,A.left="right"):v<f[0]&&"right"===A.left&&(v+=w,A.left="left"))),"element"!==r&&"both"!==r||(m<f[1]&&"bottom"===A.top&&(m+=y,A.top="top"),m+y>f[3]&&"top"===A.top&&(m-=y,A.top="bottom")),"element"!==n&&"both"!==n||(v<f[0]&&("right"===A.left?(v+=w,A.left="left"):"center"===A.left&&(v+=w/2,A.left="left")),v+w>f[2]&&("left"===A.left?(v-=w,A.left="right"):"center"===A.left&&(v-=w/2,A.left="right"))),"string"==typeof i?i=i.split(",").map(function(t){return t.trim()}):!0===i&&(i=["top","left","right","bottom"]),i=i||[];var d,p,c=[],u=[];m<f[1]&&(0<=i.indexOf("top")?(m=f[1],c.push("top")):u.push("top")),m+y>f[3]&&(0<=i.indexOf("bottom")?(m=f[3]-y,c.push("bottom")):u.push("bottom")),v<f[0]&&(0<=i.indexOf("left")?(v=f[0],c.push("left")):u.push("left")),v+w>f[2]&&(0<=i.indexOf("right")?(v=f[2]-w,c.push("right")):u.push("right")),c.length&&(d=(d=void 0)!==g.options.pinnedClass?g.options.pinnedClass:g.getClass("pinned"),E.push(d),c.forEach(function(t){E.push(d+"-"+t)})),u.length&&(p=(p=void 0)!==g.options.outOfBoundsClass?g.options.outOfBoundsClass:g.getClass("out-of-bounds"),E.push(p),u.forEach(function(t){E.push(p+"-"+t)})),(0<=c.indexOf("left")||0<=c.indexOf("right"))&&(A.left=x.left=!1),(0<=c.indexOf("top")||0<=c.indexOf("bottom"))&&(A.top=x.top=!1),x.top===b.top&&x.left===b.left&&A.top===g.attachment.top&&A.left===g.attachment.left||(g.updateAttachClasses(A,x),g.trigger("update",{attachment:A,targetAttachment:x}))}),k(function(){!1!==g.options.addTargetClasses&&W(g.target,E,n),W(g.element,E,n)}),{top:m,left:v}}});var J,T=(J=A.Utils).getBounds,W=J.updateClasses;k=J.defer;A.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return T(e.element)}),r=n.height,s=n.width,a=this.getTargetBounds(),l=o+r,h=i+s,f=[];o<=a.bottom&&l>=a.top&&["left","right"].forEach(function(t){var e=a[t];e!==i&&e!==h||f.push(t)}),i<=a.right&&h>=a.left&&["top","bottom"].forEach(function(t){var e=a[t];e!==o&&e!==l||f.push(t)});var d=[],p=[];return d.push(this.getClass("abutted")),["left","top","right","bottom"].forEach(function(t){d.push(e.getClass("abutted")+"-"+t)}),f.length&&p.push(this.getClass("abutted")),f.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),k(function(){!1!==e.options.addTargetClasses&&W(e.target,p,d),W(e.element,p,d)}),!0}});B=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};return A.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){(i=i.split(" "))[1]=i[1]||i[0];var s=B(i,2);n=s[0],r=s[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return{top:e+=n,left:o+=r}}}}),G});