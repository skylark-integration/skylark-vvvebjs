/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","../Vvveb","../ComponentsGroup","../Components","../inputs"],function(t,e,a,i,n){var o=t;a.Widgets=["widgets/googlemaps","widgets/video","widgets/chartjs","widgets/facebookpage","widgets/paypal","widgets/instagram","widgets/twitter"],i.extend("_base","widgets/googlemaps",{name:"Google Maps",attributes:["data-component-maps"],image:"icons/map.svg",dragHtml:'<img src="'+e.baseUrl+'icons/maps.png">',html:'<div data-component-maps style="min-height:240px;min-width:240px;position:relative"><iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed" width="100" height="100" style="width:100%;height:100%;position:absolute;left:0px;pointer-events:none"></iframe></div>',z:3,q:"Paris",t:"q",onChange:function(t,e,a){return map_iframe=o("iframe",t),this[e.key]=a,mapurl="https://maps.google.com/maps?&q="+this.q+"&z="+this.z+"&t="+this.t+"&output=embed",map_iframe.attr("src",mapurl),t},properties:[{name:"Address",key:"q",inputtype:n.TextInput},{name:"Map type",key:"t",inputtype:n.SelectInput,data:{options:[{value:"q",text:"Roadmap"},{value:"w",text:"Satellite"}]}},{name:"Zoom",key:"z",inputtype:n.RangeInput,data:{max:20,min:1,step:1}}]}),i.extend("_base","widgets/video",{name:"Video",attributes:["data-component-video"],image:"icons/video.svg",dragHtml:'<img src="'+e.baseUrl+'icons/video.svg" width="100" height="100">',html:'<div data-component-video style="min-height:240px;min-width:240px;position:relative"><iframe frameborder="0" src="https://www.youtube.com/embed/-stFvGmg1A8" style="width:100%;height:100%;position:absolute;left:0px;pointer-events:none"></iframe></div>',t:"y",video_id:"",url:"",autoplay:!1,controls:!0,loop:!1,init:function(e){iframe=o("iframe",e),video=o("video",e),t("#right-panel [data-key=url]").hide(),video.length?this.url=video.src:iframe.length&&(src=iframe.attr("src"),src&&src.indexOf("youtube")?this.video_id=src.match(/youtube.com\/embed\/([^$\?]*)/)[1]:src&&src.indexOf("vimeo")&&(this.video_id=src.match(/vimeo.com\/video\/([^$\?]*)/)[1])),t("#right-panel input[name=video_id]").val(this.video_id),t("#right-panel input[name=url]").val(this.url)},onChange:function(e,a,i){switch(this[a.key]=i,this.t){case"y":t("#right-panel [data-key=video_id]").show(),t("#right-panel [data-key=url]").hide(),newnode=t('<div data-component-video><iframe src="https://www.youtube.com/embed/'+this.video_id+"?&amp;autoplay="+this.autoplay+"&amp;controls="+this.controls+"&amp;loop="+this.loop+'" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');break;case"v":t("#right-panel [data-key=video_id]").show(),t("#right-panel [data-key=url]").hide(),newnode=t('<div data-component-video><iframe src="https://player.vimeo.com/video/'+this.video_id+"?&amp;autoplay="+this.autoplay+"&amp;controls="+this.controls+"&amp;loop="+this.loop+'" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');break;case"h":t("#right-panel [data-key=video_id]").hide(),t("#right-panel [data-key=url]").show(),newnode=t('<div data-component-video><video src="'+this.url+'" '+(this.controls?" controls ":"")+(this.loop?" loop ":"")+' style="height: 100%; width: 100%;"></video></div>')}return e.replaceWith(newnode),newnode},properties:[{name:"Provider",key:"t",inputtype:n.SelectInput,data:{options:[{text:"Youtube",value:"y"},{text:"Vimeo",value:"v"},{text:"HTML5",value:"h"}]}},{name:"Video id",key:"video_id",inputtype:n.TextInput},{name:"Url",key:"url",inputtype:n.TextInput},{name:"Autoplay",key:"autoplay",inputtype:n.CheckboxInput},{name:"Controls",key:"controls",inputtype:n.CheckboxInput},{name:"Loop",key:"loop",inputtype:n.CheckboxInput}]}),i.extend("_base","widgets/facebookcomments",{name:"Facebook Comments",attributes:["data-component-facebookcomments"],image:"icons/facebook.svg",dragHtml:'<img src="'+e.baseUrl+'icons/facebook.svg">',html:'<div  data-component-facebookcomments><script>(function(d, s, id) {    \t\t\t  var js, fjs = d.getElementsByTagName(s)[0];    \t\t\t  if (d.getElementById(id)) return;    \t\t\t  js = d.createElement(s); js.id = id;    \t\t\t  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=";    \t\t\t  fjs.parentNode.insertBefore(js, fjs);    \t\t\t}(document, \'script\', \'facebook-jssdk\'));<\/script>    \t\t\t<div class="fb-comments"     \t\t\tdata-href="'+window.location.href+'"     \t\t\tdata-numposts="5"     \t\t\tdata-colorscheme="light"     \t\t\tdata-mobile=""     \t\t\tdata-order-by="social"     \t\t\tdata-width="100%"     \t\t\t></div></div>',properties:[{name:"Href",key:"business",htmlAttr:"data-href",child:".fb-comments",inputtype:n.TextInput},{name:"Item name",key:"item_name",htmlAttr:"data-numposts",child:".fb-comments",inputtype:n.TextInput},{name:"Color scheme",key:"colorscheme",htmlAttr:"data-colorscheme",child:".fb-comments",inputtype:n.TextInput},{name:"Order by",key:"order-by",htmlAttr:"data-order-by",child:".fb-comments",inputtype:n.TextInput},{name:"Currency code",key:"width",htmlAttr:"data-width",child:".fb-comments",inputtype:n.TextInput}]}),i.extend("_base","widgets/instagram",{name:"Instagram",attributes:["data-component-instagram"],image:"icons/instagram.svg",drophtml:'<img src="'+e.baseUrl+'icons/instagram.png">',html:'<div align=center data-component-instagram>    \t\t\t<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/tsxp1hhQTG/" data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/tsxp1hhQTG/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Text</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/instagram/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Instagram</a> (@instagram) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="-">-</time></p></div></blockquote>    \t\t\t<script async defer src="//www.instagram.com/embed.js"><\/script>    \t\t</div>',properties:[{name:"Widget id",key:"instgrm-permalink",htmlAttr:"data-instgrm-permalink",child:".instagram-media",inputtype:n.TextInput}]}),i.extend("_base","widgets/twitter",{name:"Twitter",attributes:["data-component-twitter"],image:"icons/twitter.svg",dragHtml:'<img src="'+e.baseUrl+'icons/twitter.svg">',html:'<div data-component-twitter><a class="twitter-timeline" data-dnt="true" data-chrome="nofooter noborders noscrollbar noheader transparent" href="https://twitter.com/twitterapi" href="https://twitter.com/twitterapi" data-widget-id="243046062967885824" ></a>    \t\t\t<script>window.twttr = (function(d, s, id) {    \t\t\t  var js, fjs = d.getElementsByTagName(s)[0],    \t\t\t\tt = window.twttr || {};    \t\t\t  if (d.getElementById(id)) return t;    \t\t\t  js = d.createElement(s);    \t\t\t  js.id = id;    \t\t\t  js.src = "https://platform.twitter.com/widgets.js";    \t\t\t  fjs.parentNode.insertBefore(js, fjs);    \t\t\t  t._e = [];    \t\t\t  t.ready = function(f) {    \t\t\t\tt._e.push(f);    \t\t\t  };    \t\t\t  return t;    \t\t\t}(document, "script", "twitter-wjs"));<\/script></div>',properties:[{name:"Widget id",key:"widget-id",htmlAttr:"data-widget-id",child:" > a, > iframe",inputtype:n.TextInput}]}),i.extend("_base","widgets/paypal",{name:"Paypal",attributes:["data-component-paypal"],image:"icons/paypal.svg",html:'<form action="https://www.paypal.com/cgi-bin/webscr" method="post" data-component-paypal>        \t\t\t\t\x3c!-- Identify your business so that you can collect the payments. --\x3e    \t\t\t\t<input type="hidden" name="business"    \t\t\t\t\tvalue="givanz@yahoo.com">        \t\t\t\t\x3c!-- Specify a Donate button. --\x3e    \t\t\t\t<input type="hidden" name="cmd" value="_donations">        \t\t\t\t\x3c!-- Specify details about the contribution --\x3e    \t\t\t\t<input type="hidden" name="item_name" value="VvvebJs">    \t\t\t\t<input type="hidden" name="item_number" value="Support">    \t\t\t\t<input type="hidden" name="currency_code" value="USD">        \t\t\t\t\x3c!-- Display the payment button. --\x3e    \t\t\t\t<input type="image" name="submit"    \t\t\t\tsrc="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"    \t\t\t\talt="Donate">    \t\t\t\t<img alt="" width="1" height="1"    \t\t\t\tsrc="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" >        \t\t\t</form>',properties:[{name:"Email",key:"business",htmlAttr:"value",child:"input[name='business']",inputtype:n.TextInput},{name:"Item name",key:"item_name",htmlAttr:"value",child:"input[name='item_name']",inputtype:n.TextInput},{name:"Item number",key:"item_number",htmlAttr:"value",child:"input[name='item_number']",inputtype:n.TextInput},{name:"Currency code",key:"currency_code",htmlAttr:"value",child:"input[name='currency_code']",inputtype:n.TextInput}]}),i.extend("_base","widgets/facebookpage",{name:"Facebook Page Plugin",attributes:["data-component-facebookpage"],image:"icons/facebook.svg",dropHtml:'<img src="'+e.baseUrl+'icons/facebook.png">',html:'<div data-component-facebookpage><div class="fb-page" data-href="https://www.facebook.com/facebook" data-appId="100526183620976" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>    \t\t\t<div id="fb-root"></div>    \t\t\t<script>(function(d, s, id) {    \t\t\t  var appId = document.getElementsByClassName("fb-page")[0].dataset.appid;    \t\t\t  var js, fjs = d.getElementsByTagName(s)[0];    \t\t\t  js = d.createElement(s); js.id = id;    \t\t\t  js.src = \'https://connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v3.0&appId=" + appId + "&autoLogAppEvents=1\';    \t\t\t  fjs.parentNode.insertBefore(js, fjs);    \t\t\t}(document, \'script\', \'facebook-jssdk\'));<\/script></div>',properties:[{name:"Small header",key:"small-header",htmlAttr:"data-small-header",child:".fb-page",inputtype:n.TextInput},{name:"Adapt container width",key:"adapt-container-width",htmlAttr:"data-adapt-container-width",child:".fb-page",inputtype:n.TextInput},{name:"Hide cover",key:"hide-cover",htmlAttr:"data-hide-cover",child:".fb-page",inputtype:n.TextInput},{name:"Show facepile",key:"show-facepile",htmlAttr:"data-show-facepile",child:".fb-page",inputtype:n.TextInput},{name:"App Id",key:"appid",htmlAttr:"data-appId",child:".fb-page",inputtype:n.TextInput}],onChange:function(e,a,i,n){var o=t(this.html);return o.find(".fb-page").attr(a.htmlAttr,i),console.log(e.parent()),console.log(e.parent().html()),e.parent().html(o.html()),console.log(o),console.log(o.html()),o}}),i.extend("_base","widgets/chartjs",{name:"Chart.js",attributes:["data-component-chartjs"],image:"icons/chart.svg",dragHtml:'<img src="'+e.baseUrl+'icons/chart.svg">',html:'<div data-component-chartjs class="chartjs" data-chart=\'{    \t\t\t"type": "line",    \t\t\t"data": {    \t\t\t\t"labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],    \t\t\t\t"datasets": [{    \t\t\t\t\t"data": [12, 19, 3, 5, 2, 3],    \t\t\t\t\t"fill": false,    \t\t\t\t\t"borderColor":"rgba(255, 99, 132, 0.2)"    \t\t\t\t}, {    \t\t\t\t\t"fill": false,    \t\t\t\t\t"data": [3, 15, 7, 4, 19, 12],    \t\t\t\t\t"borderColor": "rgba(54, 162, 235, 0.2)"    \t\t\t\t}]    \t\t\t}}\' style="min-height:240px;min-width:240px;width:100%;height:100%;position:relative">    \t\t\t  <canvas></canvas>    \t\t\t</div>',chartjs:null,ctx:null,node:null,config:{},dragStart:function(a){return body=e.Builder.frameBody,0==t("#chartjs-script",body).length&&(t(body).append('<script id="chartjs-script" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"><\/script>'),t(body).append('<script>    \t\t\t\t$(document).ready(function() {    \t\t\t\t\t$(".chartjs").each(function () {    \t\t\t\t\t\tctx = $("canvas", this).get(0).getContext("2d");    \t\t\t\t\t\tconfig = JSON.parse(this.dataset.chart);    \t\t\t\t\t\tchartjs = new Chart(ctx, config);    \t\t\t\t\t});    \t\t\t\t});    \t\t\t  <\/script>')),a},drawChart:function(){null!=this.chartjs&&this.chartjs.destroy(),this.node.dataset.chart=JSON.stringify(this.config),config=Object.assign({},this.config),this.chartjs=new Chart(this.ctx,config)},init:function(e){return this.node=e,this.ctx=t("canvas",e).get(0).getContext("2d"),this.config=JSON.parse(e.dataset.chart),this.drawChart(),e},beforeInit:function(t){return t},properties:[{name:"Type",key:"type",inputtype:n.SelectInput,data:{options:[{text:"Line",value:"line"},{text:"Bar",value:"bar"},{text:"Pie",value:"pie"},{text:"Doughnut",value:"doughnut"},{text:"Polar Area",value:"polarArea"},{text:"Bubble",value:"bubble"},{text:"Scatter",value:"scatter"},{text:"Radar",value:"radar"}]},init:function(t){return JSON.parse(t.dataset.chart).type},onChange:function(t,e,a,i){return i.config.type=e,i.drawChart(),t}}]})});
//# sourceMappingURL=../sourcemaps/components/widgets.js.map
