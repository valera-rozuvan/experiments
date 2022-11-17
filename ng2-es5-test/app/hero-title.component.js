(function(app) {

  app.HeroTitleComponent = HeroTitleComponent;

  HeroTitleComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-title',
      templateUrl: 'app/hero-title.component.html'
    })
  ];

  function HeroTitleComponent(titlePrefix, title) {
      this.titlePrefix = titlePrefix;
      this.title  = title;
      this.msg = '';
  }

  HeroTitleComponent.prototype.ok = function() {
    this.msg = 'OK!';
  }

  HeroTitleComponent.parameters = [
    [new ng.core.Optional(), new ng.core.Inject('titlePrefix')],
    [new ng.core.Attribute('title')]
  ];

})(window.app = window.app || {});

////////// DSL version ////////////

(function(app) {

  var old = app.HeroTitleComponent;

  app.HeroTitleComponent = ng.core.Component({
    selector: 'hero-title-dsl',
    templateUrl: 'app/hero-title.component.html'
  })
  .Class({
    constructor: [
      [ new ng.core.Optional(), new ng.core.Inject('titlePrefix') ],
      new ng.core.Attribute('title'),
      function HeroTitleComponent(titlePrefix, title) {
        this.titlePrefix = titlePrefix;
        this.title  = title;
        this.msg = '';
      }
    ],

    ok: function() {
      this.msg = 'OK!';
    }
  });

  app.HeroTitleDslComponent = app.HeroTitleComponent;
  app.HeroTitleComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/