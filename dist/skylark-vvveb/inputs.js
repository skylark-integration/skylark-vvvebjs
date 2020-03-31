/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-jquery","./Vvveb","./tmpl","skylark-bootstrap3/button"],function(e,t,n,i){var u={init:function(e){},onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.value,this])},renderTemplate:function(e,t){return i("vvveb-input-"+e,t)},setValue:function(e){t("input",this.element).val(e)},render:function(e,n){if(this.element=t(this.renderTemplate(e,n)),this.events)for(var i in this.events)ev=this.events[i][0],fun=this[this.events[i][1]],el=this.events[i][2],this.element.on(ev,el,{element:this.element,input:this},fun);return this.element}},a=e.extend({},u,{events:[["blur","onChange","input"]],init:function(e){return this.render("textinput",e)}}),r=e.extend({},u,{onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.checked,this])},events:[["change","onChange","input"]],init:function(e){return this.render("checkboxinput",e)}}),s=e.extend({},u,{events:[["change","onChange","select"]],setValue:function(e){t("select",this.element).val(e)},init:function(e){return this.render("select",e)}}),o=e.extend({},a,{events:[["change","onChange","input"]],init:function(e){return this.render("textinput",e)}}),l=e.extend({},u,{events:[["change","onChange","input"]],init:function(e){return this.render("rangeinput",e)}}),h=e.extend({},u,{events:[["change","onChange","input"]],init:function(e){return this.render("numberinput",e)}}),p=e.extend({},u,{number:0,unit:"px",events:[["change","onChange","select"],["change keyup mouseup","onChange","input"]],onChange:function(e){if(e.data&&e.data.element){input=e.data.input,""!=this.value&&(input[this.name]=this.value),""==input.unit&&(input.unit="px");var n="";"auto"==input.unit?(t(e.data.element).addClass("auto"),n=input.unit):(t(e.data.element).removeClass("auto"),n=input.number+input.unit),e.data.element.trigger("propertyChange",[n,this])}},setValue:function(e){this.number=parseInt(e),this.unit=e.replace(this.number,""),"auto"==this.unit&&t(this.element).addClass("auto"),t("input",this.element).val(this.number),t("select",this.element).val(this.unit)},init:function(e){return this.render("cssunitinput",e)}}),c=e.extend({},u,{rgb2hex:function(e){if(e)return(e=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===e.length?"#"+("0"+parseInt(e[1],10).toString(16)).slice(-2)+("0"+parseInt(e[2],10).toString(16)).slice(-2)+("0"+parseInt(e[3],10).toString(16)).slice(-2):e},events:[["change","onChange","input"]],setValue:function(e){t("input",this.element).val(this.rgb2hex(e))},init:function(e){return this.render("colorinput",e)}}),d=e.extend({},u,{events:[["blur","onChange","input[type=text]"],["change","onUpload","input[type=file]"]],setValue:function(e){-1==e.indexOf("data:image")&&t('input[type="text"]',this.element).val(e)},onUpload:function(e,n){if(this.files&&this.files[0]){var i=new FileReader;i.onload=function(n){image=n.target.result,e.data.element.trigger("propertyChange",[image,this]);var i=new FormData;i.append("file",file),t.ajax({type:"POST",url:"upload.php",data:i,processData:!1,contentType:!1,success:function(n){console.log("File uploaded at: ",n),e.data.element.trigger("propertyChange",[n,this]),t('input[type="text"]',e.data.element).val(n)},error:function(e){alert(e.responseText)}})},i.readAsDataURL(this.files[0]),file=this.files[0]}},init:function(e){return this.render("imageinput",e)}}),g=e.extend({},a,{events:[["blur","onChange","input"]],init:function(e){return this.render("textinput",e)}}),m=e.extend({},u,{onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.value,this])},events:[["change","onChange","input"]],setValue:function(e){t("input",this.element).removeAttr("checked"),e&&t("input[value="+e+"]",this.element).attr("checked","true").prop("checked",!0)},init:function(e){return this.render("radioinput",e)}}),f=e.extend({},m,{setValue:function(e){t("input",this.element).removeAttr("checked"),t("btn",this.element).removeClass("active"),e&&""!=e&&t("input[value="+e+"]",this.element).attr("checked","true").prop("checked",!0).parent().button("toggle")},init:function(e){return this.render("radiobuttoninput",e)}}),v=e.extend({},a,{onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.checked?this.getAttribute("data-value-on"):this.getAttribute("data-value-off"),this])},events:[["change","onChange","input"]],init:function(e){return this.render("toggle",e)}}),x=e.extend({},a,{events:[["blur","onChange","input"]],init:function(e){return this.render("textinput",e)}}),C=e.extend({},a,{events:[["blur","onChange","input"]],init:function(e){return this.render("textinput",e)}}),b=e.extend({},a,{events:[["blur","onChange","input"]],init:function(e){return this.render("textinput",e)}}),I=e.extend({},u,{events:[["change","onChange","select"],["click","onChange","button"]],setValue:function(e){t("select",this.element).val(e)},init:function(e){return this.render("grid",e)}}),k=e.extend({},u,{events:[["blur","onChange","input"],["click","onChange","button"]],init:function(e){return this.render("textvalue",e)}}),y=e.extend({},u,{events:[["click","onChange","button"]],setValue:function(e){t("button",this.element).val(e)},init:function(e){return this.render("button",e)}}),V=e.extend({},u,{events:[["click","onChange","button"]],setValue:function(e){return!1},init:function(e){return this.render("sectioninput",e)}}),A=e.extend({},u,{events:[["change","onChange","select"]],setValue:function(e){t("select",this.element).val(e)},init:function(e){return this.render("listinput",e)}}),T=e.extend({},u,{events:[["autocomplete.change","onAutocompleteChange","input"]],onAutocompleteChange:function(e,t,n){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[t,this])},init:function(e){return this.element=this.render("textinput",e),t("input",this.element).autocomplete(e.url),this.element}}),L=e.extend({},u,{events:[["autocompletelist.change","onAutocompleteChange","input"]],onAutocompleteChange:function(e,t,n){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[t,this])},setValue:function(e){t("input",this.element).data("autocompleteList").setValue(e)},init:function(e){return this.element=this.render("textinput",e),t("input",this.element).autocompleteList(e),this.element}});return n.inputs={Input:u,TextInput:a,CheckboxInput:r,SelectInput:s,LinkInput:o,RangeInput:l,NumberInput:h,CssUnitInput:p,ColorInput:c,ImageInput:d,FileUploadInput:g,RadioInput:m,RadioButtonInput:f,ToggleInput:v,ValueTextInput:x,GridLayoutInput:C,ProductsInput:b,GridInput:I,TextValueInput:k,ButtonInput:y,SectionInput:V,ListInput:A,AutocompleteInput:T,AutocompleteList:L}});
//# sourceMappingURL=sourcemaps/inputs.js.map
