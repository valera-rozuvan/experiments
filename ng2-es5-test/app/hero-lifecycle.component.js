(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = HeroComponent;

  HeroComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-lifecycle',
      template: '<h1>Hero: {{name}}</h1>'
    })
  ];

  function HeroComponent() { }

  HeroComponent.prototype.ngOnInit = function() {
    // todo: fetch from server async
    setTimeout(() => this.name = 'Windstorm', 0);
  };

  app.HeroLifecycleComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});

/////// DSL version ////

(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = ng.core.Component({
    selector: 'hero-lifecycle-dsl',
    template: '<h1>Hero: {{name}}</h1>'
  })
  .Class({
    constructor: function HeroComponent() { },
    ngOnInit: function() {
      // todo: fetch from server async
      setTimeout(() => this.name = 'Windstorm', 0);
    }
  });

  app.HeroLifecycleDslComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/