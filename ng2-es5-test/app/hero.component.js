(function(app) {

app.HeroComponent = HeroComponent; // "export"

HeroComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-view',
    template: '<h1>{{title}}: {{getName()}}</h1>'
  })
];

function HeroComponent() {
  this.title = "Hero Detail";
}

HeroComponent.prototype.getName = function() { return 'Windstorm'; };


})(window.app = window.app || {});

//////////// DSL version ///////////

(function(app) {

  var old = app.HeroComponent;

  app.HeroComponent = ng.core.Component({
    selector: 'hero-view-dsl',
    template: '<h1>{{title}}: {{getName()}}</h1>',
  })
  .Class({
    constructor: function HeroComponent() {
      this.title = "Hero Detail";
    },

    getName: function() { return 'Windstorm'; }
  });

  app.HeroDslComponent = app.HeroComponent;
  app.HeroComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/