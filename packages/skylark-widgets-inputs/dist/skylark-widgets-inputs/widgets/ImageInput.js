/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(e,t,n,a,i){var l=a.inherit({events:[["blur","onChange","input[type=text]"],["change","onUpload","input[type=file]"]],setValue:function(e){-1==e.indexOf("data:image")&&t('input[type="text"]',this.element).val(e)},onUpload:function(e,n){if(this.files&&this.files[0]){var a=new FileReader;a.onload=function(n){image=n.target.result,e.data.element.trigger("propertyChange",[image,this]);var a=new FormData;a.append("file",file),t.ajax({type:"POST",url:"upload.php",data:a,processData:!1,contentType:!1,success:function(n){console.log("File uploaded at: ",n),e.data.element.trigger("propertyChange",[n,this]),t('input[type="text"]',e.data.element).val(n)},error:function(e){alert(e.responseText)}})},a.readAsDataURL(this.files[0]),file=this.files[0]}},init:function(e){return this.render("imageinput",e)}});return n.ImageInput=l});
//# sourceMappingURL=../sourcemaps/widgets/ImageInput.js.map
