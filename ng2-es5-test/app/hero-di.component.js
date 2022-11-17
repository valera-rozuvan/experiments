(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = HeroComponent;

  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-di',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];

  HeroComponent.parameters = [ app.DataService ];

  function HeroComponent(dataService) {
    this.name = dataService.getHeroName();
  }

  app.HeroDIComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});

////// DSL Version /////

(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = ng.core.Component({
    selector: 'hero-di-dsl',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor: [
      app.DataService,
      function HeroComponent(service) {
        this.name = service.getHeroName();
      }
    ]
  });

  app.HeroDIDslComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/