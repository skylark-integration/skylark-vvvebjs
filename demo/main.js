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
         {
           name : "skylark-langx-arrays",
           location : "../node_modules/skylark-langx-arrays/dist/uncompressed/skylark-langx-arrays",
            main: 'main'
         },
         {
           name : "skylark-langx-aspect",
           location : "../node_modules/skylark-langx-aspect/dist/uncompressed/skylark-langx-aspect",
            main: 'main'
         },
         {
           name : "skylark-langx-async",
           location : "../node_modules/skylark-langx-async/dist/uncompressed/skylark-langx-async",
            main: 'main'
         },
         {
           name : "skylark-langx-datetimes",
           location : "../node_modules/skylark-langx-datetimes/dist/uncompressed/skylark-langx-datetimes",
            main: 'main'
         },
         {
           name : "skylark-langx-emitter",
           location : "../node_modules/skylark-langx-emitter/dist/uncompressed/skylark-langx-emitter",
            main: 'main'
         },
         {
           name : "skylark-langx-funcs",
           location : "../node_modules/skylark-langx-funcs/dist/uncompressed/skylark-langx-funcs",
            main: 'main'
         },
         {
           name : "skylark-langx-hoster",
           location : "../node_modules/skylark-langx-hoster/dist/uncompressed/skylark-langx-hoster",
            main: 'main'
         },
         {
           name : "skylark-langx-klass",
           location : "../node_modules/skylark-langx-klass/dist/uncompressed/skylark-langx-klass",
            main: 'main'
         },
         {
           name : "skylark-langx-ns",
           location : "../node_modules/skylark-langx-ns/dist/uncompressed/skylark-langx-ns",
            main: 'main'
         },
         {
           name : "skylark-langx-numbers",
           location : "../node_modules/skylark-langx-numbers/dist/uncompressed/skylark-langx-numbers",
            main: 'main'
         },
         {
           name : "skylark-langx-objects",
           location : "../node_modules/skylark-langx-objects/dist/uncompressed/skylark-langx-objects",
            main: 'main'
         },
         {
           name : "skylark-langx-strings",
           location : "../node_modules/skylark-langx-strings/dist/uncompressed/skylark-langx-strings",
            main: 'main'
         },
         {
           name : "skylark-langx-topic",
           location : "../node_modules/skylark-langx-topic/dist/uncompressed/skylark-langx-topic",
            main: 'main'
         },
         {
           name : "skylark-langx-types",
           location : "../node_modules/skylark-langx-types/dist/uncompressed/skylark-langx-types",
            main: 'main'
         },
         {
           name : "skylark-langx-xhr",
           location : "../node_modules/skylark-langx-xhr/dist/uncompressed/skylark-langx-xhr",
            main: 'main'
         },
         {
           name : "skylark-langx",
           location : "../node_modules/skylark-langx/dist/uncompressed/skylark-langx",
            main: 'main'
         },


         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-css",
           location : "../node_modules/skylark-domx-css/dist/uncompressed/skylark-domx-css",
            main: 'main'
         },
         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-data",
           location : "../node_modules/skylark-domx-data/dist/uncompressed/skylark-domx-data",
            main: 'main'
         },
         {
           name : "skylark-domx-eventer",
           location : "../node_modules/skylark-domx-eventer/dist/uncompressed/skylark-domx-eventer",
            main: 'main'
         },
         {
           name : "skylark-domx-files",
           location : "../node_modules/skylark-domx-files/dist/uncompressed/skylark-domx-files",
            main: 'main'
         },
         {
           name : "skylark-domx-finder",
           location : "../node_modules/skylark-domx-finder/dist/uncompressed/skylark-domx-finder",
            main: 'main'
         },
         {
           name : "skylark-domx-fx",
           location : "../node_modules/skylark-domx-fx/dist/uncompressed/skylark-domx-fx",
            main: 'main'
         },
         {
           name : "skylark-domx-geom",
           location : "../node_modules/skylark-domx-geom/dist/uncompressed/skylark-domx-geom",
            main: 'main'
         },
         {
           name : "skylark-domx-images",
           location : "../node_modules/skylark-domx-images/dist/uncompressed/skylark-domx-images",
            main: 'main'
         },
         {
           name : "skylark-domx-noder",
           location : "../node_modules/skylark-domx-noder/dist/uncompressed/skylark-domx-noder",
            main: 'main'
         },
         {
           name : "skylark-domx-plugins",
           location : "../node_modules/skylark-domx-plugins/dist/uncompressed/skylark-domx-plugins",
            main: 'main'
         },
         {
           name : "skylark-domx-query",
           location : "../node_modules/skylark-domx-query/dist/uncompressed/skylark-domx-query",
            main: 'main'
         },

         {
           name : "skylark-domx-scripter",
           location : "../node_modules/skylark-domx-scripter/dist/uncompressed/skylark-domx-scripter",
            main: 'main'
         },
         {
           name : "skylark-domx-styler",
           location : "../node_modules/skylark-domx-styler/dist/uncompressed/skylark-domx-styler",
            main: 'main'
         },
         {
           name : "skylark-domx-tables",
           location : "../node_modules/skylark-domx-tables/dist/uncompressed/skylark-domx-tables",
            main: 'main'
         },
         {
           name : "skylark-domx-transforms",
           location : "../node_modules/skylark-domx-transforms/dist/uncompressed/skylark-domx-transforms",
            main: 'main'
         },
         {
           name : "skylark-domx-velm",
           location : "../node_modules/skylark-domx-velm/dist/uncompressed/skylark-domx-velm",
            main: 'main'
         },
         {
           name : "skylark-domx-forms",
           location : "../node_modules/skylark-domx-forms/dist/uncompressed/skylark-domx-forms",
            main: 'main'
         },                  
         {
           name : "skylark-net-http",
           location : "../node_modules/skylark-net-http/dist/uncompressed/skylark-net-http",
            main: 'main'
         },     
         {
           name : "skylark-data-collection" ,
           location : "../node_modules/skylark-data-collection/dist/uncompressed/skylark-data-collection",
            main: 'main'
         },
         {
           name : "skylark-storages-diskfs" ,
           location : "../node_modules/skylark-storages-diskfs/dist/uncompressed/skylark-storages-diskfs",
            main: 'main'
         },

     { name: "skylark-jquery", location: "../node_modules/skylark-jquery/dist/uncompressed/skylark-jquery"},
     { name: "skylark-bootstrap3", location: "../node_modules/skylark-bootstrap3/dist/uncompressed/skylark-bootstrap3"},
     { name: "skylark-codemirror", location: "../node_modules/skylark-codemirror/dist/uncompressed/skylark-codemirror"},
     { name: "skylark-vvveb", location: "../src" }
  ],
});
 

require([
  "skylark-jquery",
  "skylark-vvveb",
  "skylark-bootstrap3/loadedInit"
], function ($,Vvveb,b3init) {
  b3init();
  $(function()   {

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
      {name:"ecommerce", title:"eCommerce homepage",  url: "demo/essence/index.html",  config: "demo/essence/vvvebjs.json"},
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


