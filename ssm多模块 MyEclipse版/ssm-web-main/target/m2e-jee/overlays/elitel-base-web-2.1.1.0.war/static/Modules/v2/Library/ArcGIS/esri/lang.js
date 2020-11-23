// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/lang","dojo/_base/array dojo/_base/json dojo/_base/kernel dojo/_base/lang dojo/date dojo/has dojo/number dojo/date/locale ./kernel".split(" "),function(l,t,u,f,v,w,x,y,n){function q(b,c,a){return[f.isString(b)?b.split(""):b,c||u.global,f.isString(a)?new Function("item","index","array",a):a]}function h(b){return void 0!==b&&null!==b}function m(b,c,a){var d=a.match(/([^\(]+)(\([^\)]+\))?/i),e=f.trim(d[1]);a=c[b];var d=t.fromJson((d[2]?f.trim(d[2]):"()").replace(/^\(/,"({").replace(/\)$/,
"})")),g=d.utcOffset;if(-1===l.indexOf(z,e))e=f.getObject(e),f.isFunction(e)&&(a=e(a,b,c,d));else if("number"===typeof a||"string"===typeof a&&a&&!isNaN(Number(a)))switch(a=Number(a),e){case "NumberFormat":return x.format(a,d);case "DateString":b=new Date(a);if(d.local||d.systemLocale)return d.systemLocale?b.toLocaleDateString()+(d.hideTime?"":" "+b.toLocaleTimeString()):b.toDateString()+(d.hideTime?"":" "+b.toTimeString());b=b.toUTCString();d.hideTime&&(b=b.replace(/\s+\d\d\:\d\d\:\d\d\s+(utc|gmt)/i,
""));return b;case "DateFormat":return b=new Date(a),h(g)&&(b=v.add(b,"minute",b.getTimezoneOffset()-g)),y.format(b,d)}return h(a)?a:""}function p(b,c){var a;if(c)for(a in b)b.hasOwnProperty(a)&&(void 0===b[a]?delete b[a]:b[a]instanceof Object&&p(b[a],!0));else for(a in b)b.hasOwnProperty(a)&&void 0===b[a]&&delete b[a];return b}var z=["NumberFormat","DateString","DateFormat"],r=/<\/?[^>]+>/g,s={valueOf:function(b,c){for(var a in b)if(b[a]==c)return a;return null},stripTags:function(b){if(b){var c=
typeof b;if("string"===c)b=b.replace(r,"");else if("object"===c)for(var a in b)(c=b[a])&&"string"===typeof c&&(c=c.replace(r,"")),b[a]=c}return b},substitute:function(b,c,a){var d,e,g;h(a)&&(f.isObject(a)?(d=a.first,e=a.dateFormat,g=a.numberFormat):d=a);if(!c||"${*}"===c){c=[];for(var k in b){a=b[k];if(e&&-1!==l.indexOf(e.properties||"",k))a=m(k,b,e.formatter||"DateString");else if(g&&-1!==l.indexOf(g.properties||"",k))a=m(k,b,g.formatter||"NumberFormat");c.push(k+" \x3d "+(h(a)?a:"")+"\x3cbr/\x3e");
if(d)break}return c.join("")}return f.replace(c,f.hitch({obj:b},function(b,a){var c=a.split(":");return 1<c.length?(a=c[0],c.shift(),m(a,this.obj,c.join(":"))):e&&-1!==l.indexOf(e.properties||"",a)?m(a,this.obj,e.formatter||"DateString"):g&&-1!==l.indexOf(g.properties||"",a)?m(a,this.obj,g.formatter||"NumberFormat"):h(this.obj[a])?this.obj[a]:""}),/\$\{([^\}]+)\}/g)},filter:function(b,c,a){c=q(b,a,c);a={};var d;b=c[0];for(d in b)c[2].call(c[d],b[d],d,b)&&(a[d]=b[d]);return a},isDefined:h,fixJson:p};
w("extend-esri")&&(f.mixin(n,s),n._isDefined=h,n._getParts=q,n._sanitize=p);return s});