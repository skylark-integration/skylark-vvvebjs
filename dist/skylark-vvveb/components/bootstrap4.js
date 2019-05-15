/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","../Vvveb","../ComponentsGroup","../Components","../inputs"],function(t,e,a,n,l){bgcolorClasses=["bg-primary","bg-secondary","bg-success","bg-danger","bg-warning","bg-info","bg-light","bg-dark","bg-white"],bgcolorSelectOptions=[{value:"Default",text:""},{value:"bg-primary",text:"Primary"},{value:"bg-secondary",text:"Secondary"},{value:"bg-success",text:"Success"},{value:"bg-danger",text:"Danger"},{value:"bg-warning",text:"Warning"},{value:"bg-info",text:"Info"},{value:"bg-light",text:"Light"},{value:"bg-dark",text:"Dark"},{value:"bg-white",text:"White"}],a["Bootstrap 4"]=["html/container","html/gridrow","html/button","html/buttongroup","html/buttontoolbar","html/heading","html/image","html/jumbotron","html/alert","html/card","html/listgroup","html/hr","html/taglabel","html/badge","html/progress","html/navbar","html/breadcrumbs","html/pagination","html/form","html/textinput","html/textareainput","html/selectinput","html/fileinput","html/checkbox","html/radiobutton","html/table","html/paragraph"],n.add("_base",{name:"Element",properties:[{key:"element_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"General"}},{name:"Id",key:"id",htmlAttr:"id",sort:n.base_sort++,inline:!0,col:6,inputtype:l.TextInput},{name:"Class",key:"class",htmlAttr:"class",sort:n.base_sort++,inline:!0,col:6,inputtype:l.TextInput}]}),n.extend("_base","_base",{properties:[{key:"display_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Display"}},{name:"Display",key:"display",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.SelectInput,validValues:["block","inline","inline-block","none"],data:{options:[{value:"block",text:"Block"},{value:"inline",text:"Inline"},{value:"inline-block",text:"Inline Block"},{value:"none",text:"none"}]}},{name:"Position",key:"position",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.SelectInput,validValues:["static","fixed","relative","absolute"],data:{options:[{value:"static",text:"Static"},{value:"fixed",text:"Fixed"},{value:"relative",text:"Relative"},{value:"absolute",text:"Absolute"}]}},{name:"Top",key:"top",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,parent:"",inputtype:l.CssUnitInput},{name:"Left",key:"left",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,parent:"",inputtype:l.CssUnitInput},{name:"Bottom",key:"bottom",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,parent:"",inputtype:l.CssUnitInput},{name:"Right",key:"right",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,parent:"",inputtype:l.CssUnitInput},{name:"Float",key:"float",htmlAttr:"style",sort:n.base_sort++,col:12,inline:!0,inputtype:l.RadioButtonInput,data:{extraclass:"btn-group-sm btn-group-fullwidth",options:[{value:"none",icon:"la la-close",title:"None",checked:!0},{value:"left",title:"Left",icon:"la la-align-left",checked:!1},{value:"right",title:"Right",icon:"la la-align-right",checked:!1}]}},{name:"Opacity",key:"opacity",htmlAttr:"style",sort:n.base_sort++,col:12,inline:!0,parent:"",inputtype:l.RangeInput,data:{max:1,min:0,step:.1}},{name:"Background Color",key:"background-color",sort:n.base_sort++,col:6,inline:!0,htmlAttr:"style",inputtype:l.ColorInput},{name:"Text Color",key:"color",sort:n.base_sort++,col:6,inline:!0,htmlAttr:"style",inputtype:l.ColorInput}]}),n.extend("_base","_base",{properties:[{key:"typography_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Typography"}},{name:"Font family",key:"font-family",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"Arial, Helvetica, sans-serif",text:"Arial"},{value:'Lucida Sans Unicode", "Lucida Grande", sans-serif',text:"Lucida Grande"},{value:'Palatino Linotype", "Book Antiqua", Palatino, serif',text:"Palatino Linotype"},{value:'"Times New Roman", Times, serif',text:"Times New Roman"},{value:"Georgia, serif",text:"Georgia, serif"},{value:"Tahoma, Geneva, sans-serif",text:"Tahoma"},{value:"Comic Sans MS, cursive, sans-serif",text:"Comic Sans"},{value:"Verdana, Geneva, sans-serif",text:"Verdana"},{value:"Impact, Charcoal, sans-serif",text:"Impact"},{value:"Arial Black, Gadget, sans-serif",text:"Arial Black"},{value:"Trebuchet MS, Helvetica, sans-serif",text:"Trebuchet"},{value:'Courier New", Courier, monospace',text:'Courier New", Courier, monospace'},{value:"Brush Script MT, sans-serif",text:"Brush Script"}]}},{name:"Font weight",key:"font-weight",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"100",text:"Thin"},{value:"200",text:"Extra-Light"},{value:"300",text:"Light"},{value:"400",text:"Normal"},{value:"500",text:"Medium"},{value:"600",text:"Semi-Bold"},{value:"700",text:"Bold"},{value:"800",text:"Extra-Bold"},{value:"900",text:"Ultra-Bold"}]}},{name:"Text align",key:"text-align",htmlAttr:"style",sort:n.base_sort++,col:12,inline:!0,inputtype:l.RadioButtonInput,data:{extraclass:"btn-group-sm btn-group-fullwidth",options:[{value:"none",icon:"la la-close",title:"None",checked:!0},{value:"left",title:"Left",icon:"la la-align-left",checked:!1},{value:"center",title:"Center",icon:"la la-align-center",checked:!1},{value:"right",title:"Right",icon:"la la-align-right",checked:!1},{value:"justify",title:"Justify",icon:"la la-align-justify",checked:!1}]}},{name:"Line height",key:"line-height",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Letter spacing",key:"letter-spacing",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Text decoration",key:"text-decoration-line",htmlAttr:"style",sort:n.base_sort++,col:12,inline:!0,inputtype:l.RadioButtonInput,data:{extraclass:"btn-group-sm btn-group-fullwidth",options:[{value:"none",icon:"la la-close",title:"None",checked:!0},{value:"underline",title:"underline",icon:"la la-long-arrow-down",checked:!1},{value:"overline",title:"overline",icon:"la la-long-arrow-up",checked:!1},{value:"line-through",title:"Line Through",icon:"la la-strikethrough",checked:!1},{value:"underline overline",title:"Underline Overline",icon:"la la-arrows-v",checked:!1}]}},{name:"Decoration Color",key:"text-decoration-color",sort:n.base_sort++,col:6,inline:!0,htmlAttr:"style",inputtype:l.ColorInput},{name:"Decoration style",key:"text-decoration-style",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"solid",text:"Solid"},{value:"wavy",text:"Wavy"},{value:"dotted",text:"Dotted"},{value:"dashed",text:"Dashed"},{value:"double",text:"Double"}]}}]}),n.extend("_base","_base",{properties:[{key:"size_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Size",expanded:!1}},{name:"Width",key:"width",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Height",key:"height",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Min Width",key:"min-width",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Min Height",key:"min-height",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Max Width",key:"max-width",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Max Height",key:"max-height",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput}]}),n.extend("_base","_base",{properties:[{key:"margins_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Margin",expanded:!1}},{name:"Top",key:"margin-top",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Right",key:"margin-right",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Bottom",key:"margin-bottom",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Left",key:"margin-left",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput}]}),n.extend("_base","_base",{properties:[{key:"paddings_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Padding",expanded:!1}},{name:"Top",key:"padding-top",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Right",key:"padding-right",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Bottom",key:"padding-bottom",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Left",key:"padding-left",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput}]}),n.extend("_base","_base",{properties:[{key:"border_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Border",expanded:!1}},{name:"Style",key:"border-style",htmlAttr:"style",sort:n.base_sort++,col:12,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"solid",text:"Solid"},{value:"dotted",text:"Dotted"},{value:"dashed",text:"Dashed"}]}},{name:"Width",key:"border-width",htmlAttr:"style",sort:n.base_sort++,col:6,inline:!0,inputtype:l.CssUnitInput},{name:"Color",key:"border-color",sort:n.base_sort++,col:6,inline:!0,htmlAttr:"style",inputtype:l.ColorInput}]}),n.extend("_base","_base",{properties:[{key:"background_image_header",inputtype:l.SectionInput,name:!1,sort:n.base_sort++,data:{header:"Background Image",expanded:!1}},{name:"Image",key:"Image",sort:n.base_sort++,inputtype:l.ImageInput,init:function(e){return t(e).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/,"$1")},onChange:function(e,a){return t(e).css("background-image","url("+a+")"),e}},{name:"Repeat",key:"background-repeat",sort:n.base_sort++,htmlAttr:"style",inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"repeat-x",text:"repeat-x"},{value:"repeat-y",text:"repeat-y"},{value:"no-repeat",text:"no-repeat"}]}},{name:"Size",key:"background-size",sort:n.base_sort++,htmlAttr:"style",inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"contain",text:"contain"},{value:"cover",text:"cover"}]}},{name:"Position x",key:"background-position-x",sort:n.base_sort++,htmlAttr:"style",col:6,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"center",text:"center"},{value:"right",text:"right"},{value:"left",text:"left"}]}},{name:"Position y",key:"background-position-y",sort:n.base_sort++,htmlAttr:"style",col:6,inline:!0,inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"center",text:"center"},{value:"top",text:"top"},{value:"bottom",text:"bottom"}]}}]}),n.extend("_base","html/container",{classes:["container","container-fluid"],image:"icons/container.svg",html:'<div class="container" style="min-height:150px;"><div class="m-5">Container</div></div>',name:"Container",properties:[{name:"Type",key:"type",htmlAttr:"class",inputtype:l.SelectInput,validValues:["container","container-fluid"],data:{options:[{value:"container",text:"Default"},{value:"container-fluid",text:"Fluid"}]}},{name:"Background",key:"background",htmlAttr:"class",validValues:bgcolorClasses,inputtype:l.SelectInput,data:{options:bgcolorSelectOptions}},{name:"Background Color",key:"background-color",htmlAttr:"style",inputtype:l.ColorInput},{name:"Text Color",key:"color",htmlAttr:"style",inputtype:l.ColorInput}]}),n.extend("_base","html/heading",{image:"icons/heading.svg",name:"Heading",nodes:["h1","h2","h3","h4","h5","h6"],html:"<h1>Heading</h1>",properties:[{name:"Size",key:"size",inputtype:l.SelectInput,onChange:function(e,a){return function(e,a){var n;for(n=document.createElement(a),attributes=e.get(0).attributes,i=0,len=attributes.length;i<len;i++)n.setAttribute(attributes[i].nodeName,attributes[i].nodeValue);return t(n).append(t(e).contents()),t(e).replaceWith(n),n}(e,"h"+a)},init:function(t){var e;return(e=/H(\d)/.exec(t.nodeName))&&e[1]?e[1]:1},data:{options:[{value:"1",text:"1"},{value:"2",text:"2"},{value:"3",text:"3"},{value:"4",text:"4"},{value:"5",text:"5"},{value:"6",text:"6"}]}}]}),n.extend("_base","html/link",{nodes:["a"],name:"Link",image:"icons/link.svg",properties:[{name:"Url",key:"href",htmlAttr:"href",inputtype:l.LinkInput},{name:"Target",key:"target",htmlAttr:"target",inputtype:l.TextInput}]}),n.extend("_base","html/image",{nodes:["img"],name:"Image",html:'<img src="'+e.baseUrl+'icons/image.svg" height="128" width="128">',image:"icons/image.svg",properties:[{name:"Image",key:"src",htmlAttr:"src",inputtype:l.ImageInput},{name:"Width",key:"width",htmlAttr:"width",inputtype:l.TextInput},{name:"Height",key:"height",htmlAttr:"height",inputtype:l.TextInput},{name:"Alt",key:"alt",htmlAttr:"alt",inputtype:l.TextInput}]}),n.add("html/hr",{image:"icons/hr.svg",nodes:["hr"],name:"Horizontal Rule",html:"<hr>"}),n.extend("_base","html/label",{name:"Label",nodes:["label"],html:'<label for="">Label</label>',properties:[{name:"For id",htmlAttr:"for",key:"for",inputtype:l.TextInput}]}),n.extend("_base","html/button",{classes:["btn","btn-link"],name:"Button",image:"icons/button.svg",html:'<button type="button" class="btn btn-primary">Primary</button>',properties:[{name:"Link To",key:"href",htmlAttr:"href",inputtype:l.LinkInput},{name:"Type",key:"type",htmlAttr:"class",inputtype:l.SelectInput,validValues:["btn-default","btn-primary","btn-info","btn-success","btn-warning","btn-info","btn-light","btn-dark","btn-outline-primary","btn-outline-info","btn-outline-success","btn-outline-warning","btn-outline-info","btn-outline-light","btn-outline-dark","btn-link"],data:{options:[{value:"btn-default",text:"Default"},{value:"btn-primary",text:"Primary"},{value:"btn btn-info",text:"Info"},{value:"btn-success",text:"Success"},{value:"btn-warning",text:"Warning"},{value:"btn-info",text:"Info"},{value:"btn-light",text:"Light"},{value:"btn-dark",text:"Dark"},{value:"btn-outline-primary",text:"Primary outline"},{value:"btn btn-outline-info",text:"Info outline"},{value:"btn-outline-success",text:"Success outline"},{value:"btn-outline-warning",text:"Warning outline"},{value:"btn-outline-info",text:"Info outline"},{value:"btn-outline-light",text:"Light outline"},{value:"btn-outline-dark",text:"Dark outline"},{value:"btn-link",text:"Link"}]}},{name:"Size",key:"size",htmlAttr:"class",inputtype:l.SelectInput,validValues:["btn-lg","btn-sm"],data:{options:[{value:"",text:"Default"},{value:"btn-lg",text:"Large"},{value:"btn-sm",text:"Small"}]}},{name:"Target",key:"target",htmlAttr:"target",inputtype:l.TextInput},{name:"Disabled",key:"disabled",htmlAttr:"class",inputtype:l.ToggleInput,validValues:["disabled"],data:{on:"disabled",off:""}}]}),n.extend("_base","html/buttongroup",{classes:["btn-group"],name:"Button Group",image:"icons/button_group.svg",html:'<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',properties:[{name:"Size",key:"size",htmlAttr:"class",inputtype:l.SelectInput,validValues:["btn-group-lg","btn-group-sm"],data:{options:[{value:"",text:"Default"},{value:"btn-group-lg",text:"Large"},{value:"btn-group-sm",text:"Small"}]}},{name:"Alignment",key:"alignment",htmlAttr:"class",inputtype:l.SelectInput,validValues:["btn-group","btn-group-vertical"],data:{options:[{value:"",text:"Default"},{value:"btn-group",text:"Horizontal"},{value:"btn-group-vertical",text:"Vertical"}]}}]}),n.extend("_base","html/buttontoolbar",{classes:["btn-toolbar"],name:"Button Toolbar",image:"icons/button_toolbar.svg",html:'<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">    \t\t  <div class="btn-group mr-2" role="group" aria-label="First group">    \t\t\t<button type="button" class="btn btn-secondary">1</button>    \t\t\t<button type="button" class="btn btn-secondary">2</button>    \t\t\t<button type="button" class="btn btn-secondary">3</button>    \t\t\t<button type="button" class="btn btn-secondary">4</button>    \t\t  </div>    \t\t  <div class="btn-group mr-2" role="group" aria-label="Second group">    \t\t\t<button type="button" class="btn btn-secondary">5</button>    \t\t\t<button type="button" class="btn btn-secondary">6</button>    \t\t\t<button type="button" class="btn btn-secondary">7</button>    \t\t  </div>    \t\t  <div class="btn-group" role="group" aria-label="Third group">    \t\t\t<button type="button" class="btn btn-secondary">8</button>    \t\t  </div>    \t\t</div>'}),n.extend("_base","html/alert",{classes:["alert"],name:"Alert",image:"icons/alert.svg",html:'<div class="alert alert-warning alert-dismissible fade show" role="alert">    \t\t  <button type="button" class="close" data-dismiss="alert" aria-label="Close">    \t\t\t<span aria-hidden="true">&times;</span>    \t\t  </button>    \t\t  <strong>Holy guacamole!</strong> You should check in on some of those fields below.    \t\t</div>',properties:[{name:"Type",key:"type",htmlAttr:"class",validValues:["alert-primary","alert-secondary","alert-success","alert-danger","alert-warning","alert-info","alert-light","alert-dark"],inputtype:l.SelectInput,data:{options:[{value:"alert-primary",text:"Default"},{value:"alert-secondary",text:"Secondary"},{value:"alert-success",text:"Success"},{value:"alert-danger",text:"Danger"},{value:"alert-warning",text:"Warning"},{value:"alert-info",text:"Info"},{value:"alert-light",text:"Light"},{value:"alert-dark",text:"Dark"}]}}]}),n.extend("_base","html/badge",{classes:["badge"],image:"icons/badge.svg",name:"Badge",html:'<span class="badge badge-primary">Primary badge</span>',properties:[{name:"Color",key:"color",htmlAttr:"class",validValues:["badge-primary","badge-secondary","badge-success","badge-danger","badge-warning","badge-info","badge-light","badge-dark"],inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"badge-primary",text:"Primary"},{value:"badge-secondary",text:"Secondary"},{value:"badge-success",text:"Success"},{value:"badge-warning",text:"Warning"},{value:"badge-danger",text:"Danger"},{value:"badge-info",text:"Info"},{value:"badge-light",text:"Light"},{value:"badge-dark",text:"Dark"}]}}]}),n.extend("_base","html/card",{classes:["card"],image:"icons/panel.svg",name:"Card",html:'<div class="card">    \t\t  <img class="card-img-top" src="../libs/builder/icons/image.svg" alt="Card image cap" width="128" height="128">    \t\t  <div class="card-body">    \t\t\t<h4 class="card-title">Card title</h4>    \t\t\t<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>    \t\t\t<a href="#" class="btn btn-primary">Go somewhere</a>    \t\t  </div>    \t\t</div>'}),n.extend("_base","html/listgroup",{name:"List Group",image:"icons/list_group.svg",classes:["list-group"],html:'<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'}),n.extend("_base","html/listitem",{name:"List Item",classes:["list-group-item"],html:'<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'}),n.extend("_base","html/breadcrumbs",{classes:["breadcrumb"],name:"Breadcrumbs",image:"icons/breadcrumbs.svg",html:'<ol class="breadcrumb">    \t\t  <li class="breadcrumb-item active"><a href="#">Home</a></li>    \t\t  <li class="breadcrumb-item active"><a href="#">Library</a></li>    \t\t  <li class="breadcrumb-item active">Data 3</li>    \t\t</ol>'}),n.extend("_base","html/breadcrumbitem",{classes:["breadcrumb-item"],name:"Breadcrumb Item",html:'<li class="breadcrumb-item"><a href="#">Library</a></li>',properties:[{name:"Active",key:"active",htmlAttr:"class",validValues:["","active"],inputtype:l.ToggleInput,data:{on:"active",off:""}}]}),n.extend("_base","html/pagination",{classes:["pagination"],name:"Pagination",image:"icons/pagination.svg",html:'<nav aria-label="Page navigation example">    \t  <ul class="pagination">    \t\t<li class="page-item"><a class="page-link" href="#">Previous</a></li>    \t\t<li class="page-item"><a class="page-link" href="#">1</a></li>    \t\t<li class="page-item"><a class="page-link" href="#">2</a></li>    \t\t<li class="page-item"><a class="page-link" href="#">3</a></li>    \t\t<li class="page-item"><a class="page-link" href="#">Next</a></li>    \t  </ul>    \t</nav>',properties:[{name:"Size",key:"size",htmlAttr:"class",inputtype:l.SelectInput,validValues:["btn-lg","btn-sm"],data:{options:[{value:"",text:"Default"},{value:"btn-lg",text:"Large"},{value:"btn-sm",text:"Small"}]}},{name:"Alignment",key:"alignment",htmlAttr:"class",inputtype:l.SelectInput,validValues:["justify-content-center","justify-content-end"],data:{options:[{value:"",text:"Default"},{value:"justify-content-center",text:"Center"},{value:"justify-content-end",text:"Right"}]}}]}),n.extend("_base","html/pageitem",{classes:["page-item"],html:'<li class="page-item"><a class="page-link" href="#">1</a></li>',name:"Pagination Item",properties:[{name:"Link To",key:"href",htmlAttr:"href",child:".page-link",inputtype:l.TextInput},{name:"Disabled",key:"disabled",htmlAttr:"class",validValues:["disabled"],inputtype:l.ToggleInput,data:{on:"disabled",off:""}}]}),n.extend("_base","html/progress",{classes:["progress"],name:"Progress Bar",image:"icons/progressbar.svg",html:'<div class="progress"><div class="progress-bar w-25"></div></div>',properties:[{name:"Background",key:"background",htmlAttr:"class",validValues:bgcolorClasses,inputtype:l.SelectInput,data:{options:bgcolorSelectOptions}},{name:"Progress",key:"background",child:".progress-bar",htmlAttr:"class",validValues:["","w-25","w-50","w-75","w-100"],inputtype:l.SelectInput,data:{options:[{value:"",text:"None"},{value:"w-25",text:"25%"},{value:"w-50",text:"50%"},{value:"w-75",text:"75%"},{value:"w-100",text:"100%"}]}},{name:"Progress background",key:"background",child:".progress-bar",htmlAttr:"class",validValues:bgcolorClasses,inputtype:l.SelectInput,data:{options:bgcolorSelectOptions}},{name:"Striped",key:"striped",child:".progress-bar",htmlAttr:"class",validValues:["","progress-bar-striped"],inputtype:l.ToggleInput,data:{on:"progress-bar-striped",off:""}},{name:"Animated",key:"animated",child:".progress-bar",htmlAttr:"class",validValues:["","progress-bar-animated"],inputtype:l.ToggleInput,data:{on:"progress-bar-animated",off:""}}]}),n.extend("_base","html/jumbotron",{classes:["jumbotron"],image:"icons/jumbotron.svg",name:"Jumbotron",html:'<div class="jumbotron">    \t\t  <h1 class="display-3">Hello, world!</h1>    \t\t  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>    \t\t  <hr class="my-4">    \t\t  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>    \t\t  <p class="lead">    \t\t\t<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>    \t\t  </p>    \t\t</div>'}),n.extend("_base","html/navbar",{classes:["navbar"],image:"icons/navbar.svg",name:"Nav Bar",html:'<nav class="navbar navbar-expand-lg navbar-light bg-light">    \t\t  <a class="navbar-brand" href="#">Navbar</a>    \t\t  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">    \t\t\t<span class="navbar-toggler-icon"></span>    \t\t  </button>    \t\t    \t\t  <div class="collapse navbar-collapse" id="navbarSupportedContent">    \t\t\t<ul class="navbar-nav mr-auto">    \t\t\t  <li class="nav-item active">    \t\t\t\t<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>    \t\t\t  </li>    \t\t\t  <li class="nav-item">    \t\t\t\t<a class="nav-link" href="#">Link</a>    \t\t\t  </li>    \t\t\t  <li class="nav-item">    \t\t\t\t<a class="nav-link disabled" href="#">Disabled</a>    \t\t\t  </li>    \t\t\t</ul>    \t\t\t<form class="form-inline my-2 my-lg-0">    \t\t\t  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">    \t\t\t  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>    \t\t\t</form>    \t\t  </div>    \t\t</nav>',properties:[{name:"Color theme",key:"color",htmlAttr:"class",validValues:["navbar-light","navbar-dark"],inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"navbar-light",text:"Light"},{value:"navbar-dark",text:"Dark"}]}},{name:"Background color",key:"background",htmlAttr:"class",validValues:bgcolorClasses,inputtype:l.SelectInput,data:{options:bgcolorSelectOptions}},{name:"Placement",key:"placement",htmlAttr:"class",validValues:["fixed-top","fixed-bottom","sticky-top"],inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"fixed-top",text:"Fixed Top"},{value:"fixed-bottom",text:"Fixed Bottom"},{value:"sticky-top",text:"Sticky top"}]}}]}),n.extend("_base","html/form",{nodes:["form"],image:"icons/form.svg",name:"Form",html:'<form><div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div></form>',properties:[{name:"Style",key:"style",htmlAttr:"class",validValues:["","form-search","form-inline","form-horizontal"],inputtype:l.SelectInput,data:{options:[{value:"",text:"Default"},{value:"form-search",text:"Search"},{value:"form-inline",text:"Inline"},{value:"form-horizontal",text:"Horizontal"}]}},{name:"Action",key:"action",htmlAttr:"action",inputtype:l.TextInput},{name:"Method",key:"method",htmlAttr:"method",inputtype:l.TextInput}]}),n.extend("_base","html/textinput",{name:"Text Input",attributes:{type:"text"},image:"icons/text_input.svg",html:'<div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div>',properties:[{name:"Value",key:"value",htmlAttr:"value",inputtype:l.TextInput},{name:"Placeholder",key:"placeholder",htmlAttr:"placeholder",inputtype:l.TextInput}]}),n.extend("_base","html/selectinput",{nodes:["select"],name:"Select Input",image:"icons/select_input.svg",html:'<div class="form-group"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',beforeInit:function(e){properties=[];var a=0;return t(e).find("option").each(function(){data={value:this.value,text:this.text},a++,properties.push({name:"Option "+a,key:"option"+a,optionNode:this,inputtype:l.TextValueInput,data:data,onChange:function(e,a,l){return option=t(this.optionNode),"BUTTON"==l.nodeName?(option.remove(),n.render("html/selectinput"),e):("value"==l.name?option.attr("value",a):"text"==l.name&&option.text(a),e)}})}),this.properties=this.properties.filter(function(t){return-1===t.key.indexOf("option")}),properties.push(this.properties[0]),this.properties=properties,e},properties:[{name:"Option",key:"option1",inputtype:l.TextValueInput},{name:"Option",key:"option2",inputtype:l.TextValueInput},{name:"",key:"addChild",inputtype:l.ButtonInput,data:{text:"Add option",icon:"la-plus"},onChange:function(e){return t(e).append('<option value="value">Text</option>'),n.render("html/selectinput"),e}}]}),n.extend("_base","html/textareainput",{name:"Text Area",image:"icons/text_area.svg",html:'<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'}),n.extend("_base","html/radiobutton",{name:"Radio Button",attributes:{type:"radio"},image:"icons/radio.svg",html:'<label class="radio"><input type="radio"> Radio</label>',properties:[{name:"Name",key:"name",htmlAttr:"name",inputtype:l.TextInput}]}),n.extend("_base","html/checkbox",{name:"Checkbox",attributes:{type:"checkbox"},image:"icons/checkbox.svg",html:'<label class="checkbox"><input type="checkbox"> Checkbox</label>',properties:[{name:"Name",key:"name",htmlAttr:"name",inputtype:l.TextInput}]}),n.extend("_base","html/fileinput",{name:"Input group",attributes:{type:"file"},image:"icons/text_input.svg",html:'<div class="form-group">    \t\t\t  <input type="file" class="form-control">    \t\t\t</div>'}),n.extend("_base","html/table",{nodes:["table"],classes:["table"],image:"icons/table.svg",name:"Table",html:'<table class="table">    \t\t  <thead>    \t\t\t<tr>    \t\t\t  <th>#</th>    \t\t\t  <th>First Name</th>    \t\t\t  <th>Last Name</th>    \t\t\t  <th>Username</th>    \t\t\t</tr>    \t\t  </thead>    \t\t  <tbody>    \t\t\t<tr>    \t\t\t  <th scope="row">1</th>    \t\t\t  <td>Mark</td>    \t\t\t  <td>Otto</td>    \t\t\t  <td>@mdo</td>    \t\t\t</tr>    \t\t\t<tr>    \t\t\t  <th scope="row">2</th>    \t\t\t  <td>Jacob</td>    \t\t\t  <td>Thornton</td>    \t\t\t  <td>@fat</td>    \t\t\t</tr>    \t\t\t<tr>    \t\t\t  <th scope="row">3</th>    \t\t\t  <td>Larry</td>    \t\t\t  <td>the Bird</td>    \t\t\t  <td>@twitter</td>    \t\t\t</tr>    \t\t  </tbody>    \t\t</table>',properties:[{name:"Type",key:"type",htmlAttr:"class",validValues:["table-primary","table-secondary","table-success","table-danger","table-warning","table-info","table-light","table-dark","table-white"],inputtype:l.SelectInput,data:{options:[{value:"Default",text:""},{value:"table-primary",text:"Primary"},{value:"table-secondary",text:"Secondary"},{value:"table-success",text:"Success"},{value:"table-danger",text:"Danger"},{value:"table-warning",text:"Warning"},{value:"table-info",text:"Info"},{value:"table-light",text:"Light"},{value:"table-dark",text:"Dark"},{value:"table-white",text:"White"}]}},{name:"Responsive",key:"responsive",htmlAttr:"class",validValues:["table-responsive"],inputtype:l.ToggleInput,data:{on:"table-responsive",off:""}},{name:"Small",key:"small",htmlAttr:"class",validValues:["table-sm"],inputtype:l.ToggleInput,data:{on:"table-sm",off:""}},{name:"Hover",key:"hover",htmlAttr:"class",validValues:["table-hover"],inputtype:l.ToggleInput,data:{on:"table-hover",off:""}},{name:"Bordered",key:"bordered",htmlAttr:"class",validValues:["table-bordered"],inputtype:l.ToggleInput,data:{on:"table-bordered",off:""}},{name:"Striped",key:"striped",htmlAttr:"class",validValues:["table-striped"],inputtype:l.ToggleInput,data:{on:"table-striped",off:""}},{name:"Inverse",key:"inverse",htmlAttr:"class",validValues:["table-inverse"],inputtype:l.ToggleInput,data:{on:"table-inverse",off:""}},{name:"Head options",key:"head",htmlAttr:"class",child:"thead",inputtype:l.SelectInput,validValues:["","thead-inverse","thead-default"],data:{options:[{value:"",text:"None"},{value:"thead-default",text:"Default"},{value:"thead-inverse",text:"Inverse"}]}}]}),n.extend("_base","html/tablerow",{nodes:["tr"],name:"Table Row",html:"<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",properties:[{name:"Type",key:"type",htmlAttr:"class",inputtype:l.SelectInput,validValues:["","success","danger","warning","active"],data:{options:[{value:"",text:"Default"},{value:"success",text:"Success"},{value:"error",text:"Error"},{value:"warning",text:"Warning"},{value:"active",text:"Active"}]}}]}),n.extend("_base","html/tablecell",{nodes:["td"],name:"Table Cell",html:"<td>Cell</td>"}),n.extend("_base","html/tableheadercell",{nodes:["th"],name:"Table Header Cell",html:"<th>Head</th>"}),n.extend("_base","html/tablehead",{nodes:["thead"],name:"Table Head",html:"<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",properties:[{name:"Type",key:"type",htmlAttr:"class",inputtype:l.SelectInput,validValues:["","success","danger","warning","info"],data:{options:[{value:"",text:"Default"},{value:"success",text:"Success"},{value:"anger",text:"Error"},{value:"warning",text:"Warning"},{value:"info",text:"Info"}]}}]}),n.extend("_base","html/tablebody",{nodes:["tbody"],name:"Table Body",html:"<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"}),n.add("html/gridcolumn",{name:"Grid Column",image:"icons/grid_row.svg",classesRegex:["col-"],html:'<div class="col-sm-4"><h3>col-sm-4</h3></div>',properties:[{name:"Column",key:"column",inputtype:l.GridInput,data:{hide_remove:!0},beforeInit:function(e){_class=t(e).attr("class");for(var a,n=/col-([^-\$ ]*)?-?(\d+)/g;null!=(a=n.exec(_class));)this.data["col"+(void 0!=a[1]?"_"+a[1]:"")]=a[2]},onChange:function(t,e,a){var n=t.attr("class");return n=n.replace(new RegExp(a.name+"-\\d+?"),""),e&&(n+=" "+a.name+"-"+e),t.attr("class",n),t}}]}),n.add("html/gridrow",{name:"Grid Row",image:"icons/grid_row.svg",classes:["row"],html:'<div class="row"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',beforeInit:function(e){properties=[];var a=0;return t(e).find('[class*="col-"]').each(function(){_class=t(this).attr("class");for(var e,s=/col-([^-\$ ]*)?-?(\d+)/g,i={};null!=(e=s.exec(_class));)i["col"+(void 0!=e[1]?"_"+e[1]:"")]=e[2];a++,properties.push({name:"Column "+a,key:"column"+a,columnNode:this,col:12,inline:!0,inputtype:l.GridInput,data:i,onChange:function(e,a,l){var s=t(this.columnNode);return"BUTTON"==l.nodeName?(s.remove(),n.render("html/gridrow"),e):(_class=s.attr("class"),_class=_class.replace(new RegExp(l.name+"-\\d+?"),""),a&&(_class+=" "+l.name+"-"+a),s.attr("class",_class),e)}})}),this.properties=this.properties.filter(function(t){return-1===t.key.indexOf("column")}),properties.push(this.properties[0]),this.properties=properties,e},properties:[{name:"Column",key:"column1",inputtype:l.GridInput},{name:"Column",key:"column1",inline:!0,col:12,inputtype:l.GridInput},{name:"",key:"addChild",inputtype:l.ButtonInput,data:{text:"Add column",icon:"la la-plus"},onChange:function(e){return t(e).append('<div class="col-3">Col-3</div>'),n.render("html/gridrow"),e}}]}),n.extend("_base","html/paragraph",{nodes:["p"],name:"Paragraph",image:"icons/paragraph.svg",html:"<p>Lorem ipsum</p>",properties:[{name:"Text align",key:"text-align",htmlAttr:"class",inputtype:l.SelectInput,validValues:["","text-left","text-center","text-right"],inputtype:l.RadioButtonInput,data:{extraclass:"btn-group-sm btn-group-fullwidth",options:[{value:"",icon:"la la-close",title:"None",checked:!0},{value:"left",title:"text-left",icon:"la la-align-left",checked:!1},{value:"text-center",title:"Center",icon:"la la-align-center",checked:!1},{value:"text-right",title:"Right",icon:"la la-align-right",checked:!1}]}}]})});
//# sourceMappingURL=../sourcemaps/components/bootstrap4.js.map
