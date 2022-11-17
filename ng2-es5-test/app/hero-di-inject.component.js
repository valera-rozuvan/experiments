(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = HeroComponent;

  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-di-inject',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];

  HeroComponent.parameters = [ 'heroName' ];

  function HeroComponent(name) {
    this.name = name;
  }

  app.HeroDIInjectComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});

/////// DSL version ////////

(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = ng.core.Component({
    selector: 'hero-di-inject-dsl',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor: [
      new ng.core.Inject('heroName'),
      function HeroComponent(name) {
        this.name = name;
      }
    ]
  });

  app.HeroDIInjectDslComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/