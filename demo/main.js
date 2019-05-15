require.config({
  baseUrl: "./"
  ,map: {
    '*': {
      'jquery': 'skylark-jquery/core'
  	}
  }
  , shim: {
  }
  ,packages : [
     { name: "skylark-langx", location: "../node_modules/skylark-langx/dist/uncompressed/skylark-langx" },
     { name: "skylark-utils-dom", location: "../node_modules/skylark-utils-dom/dist/uncompressed/skylark-utils-dom"},
     { name: "skylark-bootstrap3", location: "../node_modules/skylark-bootstrap3/dist/uncompressed/skylark-bootstrap3"},
     { name: "skylark-codemirror", location: "../node_modules/skylark-codemirror/dist/uncompressed/skylark-codemirror"},
     { name: "skylark-vvveb", location: "../src" }
  ],
});
 

require([
  "skylark-utils-dom/query",
  "skylark-vvveb"], function ($,Vvveb) {

  $(function() 
  {
    //if url has #no-right-panel set one panel demo
    if (window.location.hash.indexOf("no-right-panel") != -1)
    {
      $("#vvveb-builder").addClass("no-right-panel");
      $(".component-properties-tab").show();
      Vvveb.Components.componentPropertiesElement = "#left-panel .component-properties";
    } else
    {
      $(".component-properties-tab").hide();
    }

    Vvveb.Builder.init('demo/narrow-jumbotron/index.html', function() {
      //run code after page/iframe is loaded
    });

    Vvveb.Gui.init();
    Vvveb.FileManager.init();
    Vvveb.FileManager.addPages(
    [
      {name:"narrow-jumbotron", title:"Jumbotron",  url: "demo/narrow-jumbotron/index.html", assets: ['demo/narrow-jumbotron/narrow-jumbotron.css']},
      {name:"landing-page", title:"Landing page",  url: "demo/startbootstrap-landing-page/index.html", assets: ['demo/startbootstrap-landing-page/css/landing-page.min.css']},
      {name:"album", title:"Album",  url: "demo/album/index.html", assets: ['demo/album/album.css']},
      {name:"blog", title:"Blog",  url: "demo/blog/index.html", assets: ['demo/blog/blog.css']},
      {name:"carousel", title:"Carousel",  url: "demo/carousel/index.html", assets: ['demo/carousel/carousel.css']},
      {name:"offcanvas", title:"Offcanvas",  url: "demo/offcanvas/index.html", assets: ['demo/offcanvas/offcanvas.css','demo/offcanvas/offcanvas.js']},
      {name:"pricing", title:"Pricing",  url: "demo/pricing/index.html", assets: ['demo/pricing/pricing.css']},
      {name:"product", title:"Product",  url: "demo/product/index.html", assets: ['demo/product/product.css']},
      {name:"ecommerce", title:"eCommerce homepage",  url: "ecommerce_demo/index.html"},
      //uncomment php code below and rename file to .php extension to load saved html files in the editor
      /*
      <?php 
         $htmlFiles = glob("*.html");
         foreach ($htmlFiles as $file) { 
           if (in_array($file, array('new-page-blank-template.html', 'editor.html'))) continue;//skip template files
           $pathInfo = pathinfo($file);
      ?>
      {name:"<?php echo ucfirst($pathInfo['filename']);?>", title:"<?php echo ucfirst($pathInfo['filename']);?>",  url: "<?php echo $pathInfo['basename'];?>"},
      <?php } ?>
      */
      {name:"test", title:"test",  url: "http://vvveb_install.givan.ro/"},
    ]);
    
    Vvveb.FileManager.loadPage("narrow-jumbotron");
  });


});


