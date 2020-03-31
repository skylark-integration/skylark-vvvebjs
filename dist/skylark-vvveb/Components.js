/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-jquery","./Vvveb","./tmpl","./inputs"],function(t,e,i,r,s){var n=e;return i.Components={base_sort:100,_components:{},_nodesLookup:{},_attributesLookup:{},_classesLookup:{},_classesRegexLookup:{},componentPropertiesElement:"#right-panel .component-properties",componentPropertiesDefaultSection:"content",get:function(t){return this._components[t]},add:function(t,e){if(e.type=t,this._components[t]=e,e.nodes)for(var i in e.nodes)this._nodesLookup[e.nodes[i]]=e;if(e.attributes)if(e.attributes.constructor===Array)for(var i in e.attributes)this._attributesLookup[e.attributes[i]]=e;else for(var i in e.attributes)void 0===this._attributesLookup[i]&&(this._attributesLookup[i]={}),void 0===this._attributesLookup[i][e.attributes[i]]&&(this._attributesLookup[i][e.attributes[i]]={}),this._attributesLookup[i][e.attributes[i]]=e;if(e.classes)for(var i in e.classes)this._classesLookup[e.classes[i]]=e;if(e.classesRegex)for(var i in e.classesRegex)this._classesRegexLookup[e.classesRegex[i]]=e},extend:function(t,i,r){var s=r;(inheritData=this._components[t])&&((s=e.extend(!0,{},inheritData,r)).properties=e.merge(e.merge([],inheritData.properties?inheritData.properties:[]),r.properties?r.properties:[])),s.properties.sort(function(t,e){return void 0===t.sort&&(t.sort=0),void 0===e.sort&&(e.sort=0),t.sort<e.sort?-1:t.sort>e.sort?1:0}),this.add(i,s)},matchNode:function(t){var e={};if(!t||!t.tagName)return!1;if(t.attributes&&t.attributes.length){for(var i in t.attributes)if(t.attributes[i]&&(attr=t.attributes[i].name,value=t.attributes[i].value,attr in this._attributesLookup)){if(void 0!==(e=this._attributesLookup[attr]).name)return e;if(value in e)return e[value]}for(var i in t.attributes)if(attr=t.attributes[i].name,value=t.attributes[i].value,"class"==attr){for(j in classes=value.split(" "),classes)if(classes[j]in this._classesLookup)return this._classesLookup[classes[j]];for(regex in this._classesRegexLookup)if(regexObj=new RegExp(regex),regexObj.exec(value))return this._classesRegexLookup[regex]}}return tagName=t.tagName.toLowerCase(),tagName in this._nodesLookup&&this._nodesLookup[tagName]},render:function(t){var s=this._components[t],a=(n(this.componentPropertiesElement),this.componentPropertiesDefaultSection),o={};n(this.componentPropertiesElement+" .tab-pane").each(function(){var t=this.dataset.section;o[t]=e(this)});var u=o[a].find('.section[data-section="default"]');i.preservePropertySections&&u.length||(o[a].html("").append(r("vvveb-input-sectioninput",{key:"default",header:s.name})),u=o[a].find(".section")),o[a].find('[data-header="default"] span').html(s.name),u.html(""),s.beforeInit&&s.beforeInit(i.Builder.selectedEl.get(0));var l=function(t,e){return e.input.on("propertyChange",function(r,s,n){var a=i.Builder.selectedEl;return e.child&&(a=a.find(e.child)),e.parent&&(a=a.parent(e.parent)),e.onChange&&(a=e.onChange(a,s,n,t)),e.htmlAttr&&(oldValue=a.attr(e.htmlAttr),"class"==e.htmlAttr&&e.validValues?(a.removeClass(e.validValues.join(" ")),a=a.addClass(s)):a="style"==e.htmlAttr?i.StyleManager.setStyle(a,e.key,s):"innerHTML"==e.htmlAttr?i.ContentManager.setHtml(a,s):a.attr(e.htmlAttr,s),i.Undo.addMutation({type:"attributes",target:a.get(0),attributeName:e.htmlAttr,oldValue:oldValue,newValue:a.attr(e.htmlAttr)})),t.onChange&&(a=t.onChange(a,e,s,n)),e.child||e.parent||i.Builder.selectNode(a),a})},p=i.Builder.selectedEl;for(var d in s.properties){var c=s.properties[d],h=p;if(c.beforeInit&&c.beforeInit(h.get(0)),c.child&&(h=h.find(c.child)),c.data?c.data.key=c.key:c.data={key:c.key},void 0===c.group&&(c.group=null),c.input=c.inputtype.init(c.data),c.init)c.inputtype.setValue(c.init(h.get(0)));else if(c.htmlAttr){if("style"==c.htmlAttr)var f=i.StyleManager.getStyle(h,c.key);else if("innerHTML"==c.htmlAttr)f=i.ContentManager.getHtml(h);else f=h.attr(c.htmlAttr);f&&"class"==c.htmlAttr&&c.validValues&&(f=f.split(" ").filter(function(t){return-1!=c.validValues.indexOf(t)})),c.inputtype.setValue(f)}l(s,c);var m=a;if(c.section&&(m=c.section),c.inputtype==SectionInput)u=o[m].find('.section[data-section="'+c.key+'"]'),i.preservePropertySections&&u.length?u.html(""):(o[m].append(c.input),u=o[m].find('.section[data-section="'+c.key+'"]'));else{var v=e(r("vvveb-property",c));v.find(".input").append(c.input),u.append(v)}c.inputtype.afterInit&&c.inputtype.afterInit(c.input)}s.init&&s.init(i.Builder.selectedEl.get(0))}}});
//# sourceMappingURL=sourcemaps/Components.js.map
