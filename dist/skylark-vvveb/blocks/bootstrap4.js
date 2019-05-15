/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["../Vvveb","../BlocksGroup","../Blocks"],function(a,s,n){s["Bootstrap 4 Snippets"]=["bootstrap4/signin-split","bootstrap4/slider-header","bootstrap4/image-gallery","bootstrap4/video-header","bootstrap4/about-team","bootstrap4/portfolio-one-column","bootstrap4/portfolio-two-column","bootstrap4/portfolio-three-column","bootstrap4/portfolio-four-column"],n.add("bootstrap4/signin-split",{name:"Modern Sign In Page with Split Screen Format",dragHtml:'<img src="'+a.baseUrl+'icons/product.png">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/sign-in-split.jpg",html:'\n  <div class="container-fluid">\n    <div class="row no-gutter">\n      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>\n      <div class="col-md-8 col-lg-6">\n        <div class="login d-flex align-items-center py-5">\n          <div class="container">\n            <div class="row">\n              <div class="col-md-9 col-lg-8 mx-auto">\n                <h3 class="login-heading mb-4">Welcome back!</h3>\n                <form>\n                  <div class="form-label-group">\n                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>\n                    <label for="inputEmail">Email address</label>\n                  </div>\n\n                  <div class="form-label-group">\n                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>\n                    <label for="inputPassword">Password</label>\n                  </div>\n\n                  <div class="custom-control custom-checkbox mb-3">\n                    <input type="checkbox" class="custom-control-input" id="customCheck1">\n                    <label class="custom-control-label" for="customCheck1">Remember password</label>\n                  </div>\n                  <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>\n                  <div class="text-center">\n                    <a class="small" href="#">Forgot password?</a></div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  <style>\n  .login,\n  .image {\n    min-height: 100vh;\n  }\n\n  .bg-image {\n    background-image: url(\'https://source.unsplash.com/WEQbe2jBg40/600x1200\');\n    background-size: cover;\n    background-position: center;\n  }\n\n  .login-heading {\n    font-weight: 300;\n  }\n\n  .btn-login {\n    font-size: 0.9rem;\n    letter-spacing: 0.05rem;\n    padding: 0.75rem 1rem;\n    border-radius: 2rem;\n  }\n\n  .form-label-group {\n    position: relative;\n    margin-bottom: 1rem;\n  }\n\n  .form-label-group>input,\n  .form-label-group>label {\n    padding: var(--input-padding-y) var(--input-padding-x);\n    height: auto;\n    border-radius: 2rem;\n  }\n\n  .form-label-group>label {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    margin-bottom: 0;\n    line-height: 1.5;\n    color: #495057;\n    cursor: text;\n    /* Match the input under the label */\n    border: 1px solid transparent;\n    border-radius: .25rem;\n    transition: all .1s ease-in-out;\n  }\n\n  .form-label-group input::-webkit-input-placeholder {\n    color: transparent;\n  }\n\n  .form-label-group input:-ms-input-placeholder {\n    color: transparent;\n  }\n\n  .form-label-group input::-ms-input-placeholder {\n    color: transparent;\n  }\n\n  .form-label-group input::-moz-placeholder {\n    color: transparent;\n  }\n\n  .form-label-group input::placeholder {\n    color: transparent;\n  }\n\n  .form-label-group input:not(:placeholder-shown) {\n    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));\n    padding-bottom: calc(var(--input-padding-y) / 3);\n  }\n\n  .form-label-group input:not(:placeholder-shown)~label {\n    padding-top: calc(var(--input-padding-y) / 3);\n    padding-bottom: calc(var(--input-padding-y) / 3);\n    font-size: 12px;\n    color: #777;\n  }\n  </style>  \n  </div>\n  '}),n.add("bootstrap4/image-gallery",{name:"Image gallery",image:"https://startbootstrap.com/assets/img/screenshots/snippets/thumbnail-gallery.jpg",dragHtml:'<img src="'+a.baseUrl+'icons/product.png">',html:'\n  <div class="container">\n\n    <h1 class="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>\n\n    <hr class="mt-2 mb-5">\n\n    <div class="row text-center text-lg-left">\n\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aob0ukAYfuI/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EUfxH-pze7s/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/M185_qYH8vg/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/sesveuG_rNo/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/AvhMzHwiE_0/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/2gYsZUmockw/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EMSDtjVHdQ8/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/8mUEy0ABdNE/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/G9Rfc1qccH4/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aJeH0KcFkuc/400x300" alt="">\n            </a>\n      </div>\n      <div class="col-lg-3 col-md-4 col-6">\n        <a href="#" class="d-block mb-4 h-100">\n              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300" alt="">\n            </a>\n      </div>\n    </div>\n\n  </div>\n  '}),n.add("bootstrap4/slider-header",{name:"Image Slider Header",dragHtml:'<img src="'+a.baseUrl+'icons/product.png">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/full-slider.jpg",html:'\n  <header class="slider">\n    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">\n      <ol class="carousel-indicators">\n        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>\n        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>\n        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>\n      </ol>\n      <div class="carousel-inner" role="listbox">\n        \x3c!-- Slide One - Set the background image for this slide in the line below --\x3e\n        <div class="carousel-item active" style="background-image: url(\'https://source.unsplash.com/LAaSoL0LrYs/1920x1080\')">\n          <div class="carousel-caption d-none d-md-block">\n            <h2 class="display-4">First Slide</h2>\n            <p class="lead">This is a description for the first slide.</p>\n          </div>\n        </div>\n        \x3c!-- Slide Two - Set the background image for this slide in the line below --\x3e\n        <div class="carousel-item" style="background-image: url(\'https://source.unsplash.com/bF2vsubyHcQ/1920x1080\')">\n          <div class="carousel-caption d-none d-md-block">\n            <h2 class="display-4">Second Slide</h2>\n            <p class="lead">This is a description for the second slide.</p>\n          </div>\n        </div>\n        \x3c!-- Slide Three - Set the background image for this slide in the line below --\x3e\n        <div class="carousel-item" style="background-image: url(\'https://source.unsplash.com/szFUQoyvrxM/1920x1080\')">\n          <div class="carousel-caption d-none d-md-block">\n            <h2 class="display-4">Third Slide</h2>\n            <p class="lead">This is a description for the third slide.</p>\n          </div>\n        </div>\n      </div>\n      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">\n            <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n            <span class="sr-only">Previous</span>\n          </a>\n      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">\n            <span class="carousel-control-next-icon" aria-hidden="true"></span>\n            <span class="sr-only">Next</span>\n          </a>\n    </div>\n      \n  <style>\n  .carousel-item {\n    height: 100vh;\n    min-height: 350px;\n    background: no-repeat center center scroll;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n  }\n  </style>  \n  </header>\n  '}),n.add("bootstrap4/video-header",{name:"Video Header",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/video-header.jpg",html:'\n  <header class="video">\n    <div class="overlay"></div>\n    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">\n      <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4">\n    </video>\n    <div class="container h-100">\n      <div class="d-flex h-100 text-center align-items-center">\n        <div class="w-100 text-white">\n          <h1 class="display-3">Video Header</h1>\n          <p class="lead mb-0">With HTML5 Video and Bootstrap 4</p>\n        </div>\n      </div>\n    </div>\n  </header>\n\n  <section class="my-5">\n    <div class="container">\n      <div class="row">\n        <div class="col-md-8 mx-auto">\n          <p>The HTML5 video element uses an mp4 video as a source. Change the source video to add in your own background! The header text is vertically centered using flex utilities that are build into Bootstrap 4.</p>\n        </div>\n      </div>\n    </div>\n  </section>\n  <style>\n  header.video {\n    position: relative;\n    background-color: black;\n    height: 75vh;\n    min-height: 25rem;\n    width: 100%;\n    overflow: hidden;\n  }\n\n  header.video video {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    min-width: 100%;\n    min-height: 100%;\n    width: auto;\n    height: auto;\n    z-index: 0;\n    -ms-transform: translateX(-50%) translateY(-50%);\n    -moz-transform: translateX(-50%) translateY(-50%);\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n  }\n\n  header.video .container {\n    position: relative;\n    z-index: 2;\n  }\n\n  header.video .overlay {\n    /*position: absolute;*/\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background-color: black;\n    opacity: 0.5;\n    z-index: 1;\n  }\n\n  @media (pointer: coarse) and (hover: none) {\n    header {\n      background: url(\'https://source.unsplash.com/XT5OInaElMw/1600x900\') black no-repeat center center scroll;\n    }\n    header video {\n      display: none;\n    }\n  }\n  </style>\n  '}),n.add("bootstrap4/about-team",{name:"About and Team Section",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/about-team.jpg",html:'\n  <header class="bg-primary text-center py-5 mb-4">\n    <div class="container">\n      <h1 class="font-weight-light text-white">Meet the Team</h1>\n    </div>\n  </header>\n\n  <div class="container">\n    <div class="row">\n      \x3c!-- Team Member 1 --\x3e\n      <div class="col-xl-3 col-md-6 mb-4">\n        <div class="card border-0 shadow">\n          <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="...">\n          <div class="card-body text-center">\n            <h5 class="card-title mb-0">Team Member</h5>\n            <div class="card-text text-black-50">Web Developer</div>\n          </div>\n        </div>\n      </div>\n      \x3c!-- Team Member 2 --\x3e\n      <div class="col-xl-3 col-md-6 mb-4">\n        <div class="card border-0 shadow">\n          <img src="https://source.unsplash.com/9UVmlIb0wJU/500x350" class="card-img-top" alt="...">\n          <div class="card-body text-center">\n            <h5 class="card-title mb-0">Team Member</h5>\n            <div class="card-text text-black-50">Web Developer</div>\n          </div>\n        </div>\n      </div>\n      \x3c!-- Team Member 3 --\x3e\n      <div class="col-xl-3 col-md-6 mb-4">\n        <div class="card border-0 shadow">\n          <img src="https://source.unsplash.com/sNut2MqSmds/500x350" class="card-img-top" alt="...">\n          <div class="card-body text-center">\n            <h5 class="card-title mb-0">Team Member</h5>\n            <div class="card-text text-black-50">Web Developer</div>\n          </div>\n        </div>\n      </div>\n      \x3c!-- Team Member 4 --\x3e\n      <div class="col-xl-3 col-md-6 mb-4">\n        <div class="card border-0 shadow">\n          <img src="https://source.unsplash.com/ZI6p3i9SbVU/500x350" class="card-img-top" alt="...">\n          <div class="card-body text-center">\n            <h5 class="card-title mb-0">Team Member</h5>\n            <div class="card-text text-black-50">Web Developer</div>\n          </div>\n        </div>\n      </div>\n    </div>\n    \x3c!-- /.row --\x3e\n\n  </div>\n  '}),n.add("bootstrap4/portfolio-one-column",{name:"One Column Portfolio Layout",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-one-column.jpg",html:'\n      <div class="container">\n\n        \x3c!-- Page Heading --\x3e\n        <h1 class="my-4">Page Heading\n          <small>Secondary Text</small>\n        </h1>\n\n        \x3c!-- Project One --\x3e\n        <div class="row">\n          <div class="col-md-7">\n            <a href="#">\n              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">\n            </a>\n          </div>\n          <div class="col-md-5">\n            <h3>Project One</h3>\n            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>\n            <a class="btn btn-primary" href="#">View Project</a>\n          </div>\n        </div>\n        \x3c!-- /.row --\x3e\n\n        <hr>\n\n        \x3c!-- Project Two --\x3e\n        <div class="row">\n          <div class="col-md-7">\n            <a href="#">\n              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">\n            </a>\n          </div>\n          <div class="col-md-5">\n            <h3>Project Two</h3>\n            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.</p>\n            <a class="btn btn-primary" href="#">View Project</a>\n          </div>\n        </div>\n        \x3c!-- /.row --\x3e\n\n        <hr>\n\n        \x3c!-- Project Three --\x3e\n        <div class="row">\n          <div class="col-md-7">\n            <a href="#">\n              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">\n            </a>\n          </div>\n          <div class="col-md-5">\n            <h3>Project Three</h3>\n            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, temporibus, dolores, at, praesentium ut unde repudiandae voluptatum sit ab debitis suscipit fugiat natus velit excepturi amet commodi deleniti alias possimus!</p>\n            <a class="btn btn-primary" href="#">View Project</a>\n          </div>\n        </div>\n        \x3c!-- /.row --\x3e\n\n        <hr>\n\n        \x3c!-- Project Four --\x3e\n        <div class="row">\n\n          <div class="col-md-7">\n            <a href="#">\n              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">\n            </a>\n          </div>\n          <div class="col-md-5">\n            <h3>Project Four</h3>\n            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?</p>\n            <a class="btn btn-primary" href="#">View Project</a>\n          </div>\n        </div>\n        \x3c!-- /.row --\x3e\n\n        <hr>\n\n        \x3c!-- Pagination --\x3e\n        <ul class="pagination justify-content-center">\n          <li class="page-item">\n            <a class="page-link" href="#" aria-label="Previous">\n              <span aria-hidden="true">&laquo;</span>\n              <span class="sr-only">Previous</span>\n            </a>\n          </li>\n          <li class="page-item">\n            <a class="page-link" href="#">1</a>\n          </li>\n          <li class="page-item">\n            <a class="page-link" href="#">2</a>\n          </li>\n          <li class="page-item">\n            <a class="page-link" href="#">3</a>\n          </li>\n          <li class="page-item">\n            <a class="page-link" href="#" aria-label="Next">\n              <span aria-hidden="true">&raquo;</span>\n              <span class="sr-only">Next</span>\n            </a>\n          </li>\n        </ul>\n\n      </div>\n  '}),n.add("bootstrap4/portfolio-two-column",{name:"Two Column Portfolio Layout",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-one-column.jpg",html:'\n  <div class="container">\n\n    \x3c!-- Page Heading --\x3e\n    <h1 class="my-4">Page Heading\n      <small>Secondary Text</small>\n    </h1>\n\n    <div class="row">\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project One</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Two</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Three</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Four</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Five</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Six</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    \x3c!-- /.row --\x3e\n\n    \x3c!-- Pagination --\x3e\n    <ul class="pagination justify-content-center">\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Previous">\n              <span aria-hidden="true">&laquo;</span>\n              <span class="sr-only">Previous</span>\n            </a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">1</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">2</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">3</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Next">\n              <span aria-hidden="true">&raquo;</span>\n              <span class="sr-only">Next</span>\n            </a>\n      </li>\n    </ul>\n\n  </div>\n  '}),n.add("bootstrap4/portfolio-three-column",{name:"Three Column Portfolio Layout",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-three-column.jpg",html:'\n  <div class="container">\n\n    \x3c!-- Page Heading --\x3e\n    <h1 class="my-4">Page Heading\n      <small>Secondary Text</small>\n    </h1>\n\n    <div class="row">\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project One</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Two</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Three</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Four</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Five</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Six</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    \x3c!-- /.row --\x3e\n\n    \x3c!-- Pagination --\x3e\n    <ul class="pagination justify-content-center">\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Previous">\n              <span aria-hidden="true">&laquo;</span>\n              <span class="sr-only">Previous</span>\n            </a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">1</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">2</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">3</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Next">\n              <span aria-hidden="true">&raquo;</span>\n              <span class="sr-only">Next</span>\n            </a>\n      </li>\n    </ul>\n\n  </div>\n  '}),n.add("bootstrap4/portfolio-four-column",{name:"Four Column Portfolio Layout",dragHtml:'<img src="'+a.baseUrl+'icons/image.svg">',image:"https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-four-column.jpg",html:'\n  <div class="container">\n\n    \x3c!-- Page Heading --\x3e\n    <h1 class="my-4">Page Heading\n      <small>Secondary Text</small>\n    </h1>\n\n    <div class="row">\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project One</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Two</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Three</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Four</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Five</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Six</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Seven</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>\n          </div>\n        </div>\n      </div>\n      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">\n        <div class="card h-100">\n          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n          <div class="card-body">\n            <h4 class="card-title">\n              <a href="#">Project Eight</a>\n            </h4>\n            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius adipisci dicta dignissimos neque animi ea, veritatis, provident hic consequatur ut esse! Commodi ea consequatur accusantium, beatae qui deserunt tenetur ipsa.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    \x3c!-- /.row --\x3e\n\n    \x3c!-- Pagination --\x3e\n    <ul class="pagination justify-content-center">\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Previous">\n              <span aria-hidden="true">&laquo;</span>\n              <span class="sr-only">Previous</span>\n            </a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">1</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">2</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#">3</a>\n      </li>\n      <li class="page-item">\n        <a class="page-link" href="#" aria-label="Next">\n              <span aria-hidden="true">&raquo;</span>\n              <span class="sr-only">Next</span>\n            </a>\n      </li>\n    </ul>\n\n  </div>\n  '})});
//# sourceMappingURL=../sourcemaps/blocks/bootstrap4.js.map
