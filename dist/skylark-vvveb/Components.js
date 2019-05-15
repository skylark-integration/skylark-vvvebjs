/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./Vvveb","./tmpl"],function(t,e,i){return e.Components={_components:{},_nodesLookup:{},_attributesLookup:{},_classesLookup:{},_classesRegexLookup:{},componentPropertiesElement:"#right-panel .component-properties",get:function(t){return this._components[t]},add:function(t,e){if(e.type=t,this._components[t]=e,e.nodes)for(var i in e.nodes)this._nodesLookup[e.nodes[i]]=e;if(e.attributes)if(e.attributes.constructor===Array)for(var i in e.attributes)this._attributesLookup[e.attributes[i]]=e;else for(var i in e.attributes)void 0===this._attributesLookup[i]&&(this._attributesLookup[i]={}),void 0===this._attributesLookup[i][e.attributes[i]]&&(this._attributesLookup[i][e.attributes[i]]={}),this._attributesLookup[i][e.attributes[i]]=e;if(e.classes)for(var i in e.classes)this._classesLookup[e.classes[i]]=e;if(e.classesRegex)for(var i in e.classesRegex)this._classesRegexLookup[e.classesRegex[i]]=e},extend:function(t,e,i){var r=i;(inheritData=this._components[t])&&((r=langx.extend(!0,{},inheritData,i)).properties=langx.merge(langx.merge([],inheritData.properties?inheritData.properties:[]),i.properties?i.properties:[])),r.properties.sort(function(t,e){return void 0===t.sort&&(t.sort=0),void 0===e.sort&&(e.sort=0),t.sort<e.sort?-1:t.sort>e.sort?1:0}),this.add(e,r)},matchNode:function(t){var e={};if(!t||!t.tagName)return!1;if(t.attributes&&t.attributes.length){for(var i in t.attributes)if(t.attributes[i]&&(attr=t.attributes[i].name,value=t.attributes[i].value,attr in this._attributesLookup)){if(void 0!==(e=this._attributesLookup[attr]).name)return e;if(value in e)return e[value]}for(var i in t.attributes)if(attr=t.attributes[i].name,value=t.attributes[i].value,"class"==attr){for(j in classes=value.split(" "),classes)if(classes[j]in this._classesLookup)return this._classesLookup[classes[j]];for(regex in this._classesRegexLookup)if(regexObj=new RegExp(regex),regexObj.exec(value))return this._classesRegexLookup[regex]}}return tagName=t.tagName.toLowerCase(),tagName in this._nodesLookup&&this._nodesLookup[tagName]},render:function(r){var s=this._components[r],a=jQuery(this.componentPropertiesElement),n=a.find('.section[data-section="default"]');e.preservePropertySections&&n.length||(a.html("").append(i("vvveb-input-sectioninput",{key:"default",header:s.name})),n=a.find(".section")),a.find('[data-header="default"] span').html(s.name),n.html(""),s.beforeInit&&s.beforeInit(e.Builder.selectedEl.get(0));var o=function(t,i){return i.input.on("propertyChange",function(r,s,a){var n=e.Builder.selectedEl;return i.child&&(n=n.find(i.child)),i.parent&&(n=n.parent(i.parent)),i.onChange&&(n=i.onChange(n,s,a,t)),i.htmlAttr&&(oldValue=n.attr(i.htmlAttr),"class"==i.htmlAttr&&i.validValues?(n.removeClass(i.validValues.join(" ")),n=n.addClass(s)):n="style"==i.htmlAttr?n.css(i.key,s):n.attr(i.htmlAttr,s),e.Undo.addMutation({type:"attributes",target:n.get(0),attributeName:i.htmlAttr,oldValue:oldValue,newValue:n.attr(i.htmlAttr)})),t.onChange&&(n=t.onChange(n,i,s,a)),i.child||i.parent||e.Builder.selectNode(n),n})},u=e.Builder.selectedEl;for(var l in s.properties){var p=s.properties[l],d=u;if(p.beforeInit&&p.beforeInit(d.get(0)),p.child&&(d=d.find(p.child)),p.data?p.data.key=p.key:p.data={key:p.key},void 0===p.group&&(p.group=null),p.input=p.inputtype.init(p.data),p.init)p.inputtype.setValue(p.init(d.get(0)));else if(p.htmlAttr){if("style"==p.htmlAttr)var c=getStyle(d.get(0),p.key);else c=d.attr(p.htmlAttr);c&&"class"==p.htmlAttr&&p.validValues&&(c=c.split(" ").filter(function(t){return-1!=p.validValues.indexOf(t)})),p.inputtype.setValue(c)}if(o(s,p),p.inputtype==SectionInput)n=a.find('.section[data-section="'+p.key+'"]'),e.preservePropertySections&&n.length?n.html(""):(a.append(p.input),n=a.find('.section[data-section="'+p.key+'"]'));else{var h=t(i("vvveb-property",p));h.find(".input").append(p.input),n.append(h)}p.inputtype.afterInit&&p.inputtype.afterInit(p.input)}s.init&&s.init(e.Builder.selectedEl.get(0))}}});
//# sourceMappingURL=sourcemaps/Components.js.map
