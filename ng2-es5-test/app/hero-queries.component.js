(function(app) {

  app.heroQueries = app.heroQueries || {};

  app.heroQueries.ContentChildComponent = ng.core.Component({
    selector: 'content-child',
    template:
      '<span class="content-child" *ngIf="active">' +
        'Active' +
      '</span>'
  }).Class({
    constructor: function ContentChildComponent() {
      this.active = false;
    },

    activate: function() {
      this.active = !this.active;
    }
  });

  ////////////////////

  app.heroQueries.ViewChildComponent = ng.core.Component({
    selector: 'view-child',
    template:
      '<h2 [class.active]=active>' +
        '{{hero.name}} ' +
        '<ng-content></ng-content>' +
      '</h2>',
    styles: ['.active {font-weight: bold; background-color: skyblue;}'],
    inputs: ['hero'],
    queries: {
      content: new ng.core.ContentChild(app.heroQueries.ContentChildComponent)
    }
  })
  .Class({
    constructor: function HeroQueriesHeroComponent() {
      this.active = false;
    },

    activate: function() {
      this.active = !this.active;
      this.content.activate();
    }
  });

  ////////////////////

  app.heroQueries.HeroQueriesComponent = ng.core.Component({
    selector: 'hero-queries',
    template:
      '<view-child *ngFor="let hero of heroData" [hero]="hero">' +
        '<content-child></content-child>' +
      '</view-child>' +
      '<button (click)="activate()">{{buttonLabel}} All</button>',
    queries: {
      views: new ng.core.ViewChildren(app.heroQueries.ViewChildComponent)
    }
  })
  .Class({
    constructor: function HeroQueriesComponent() {
      this.active = false;
      this.heroData = [
        {id: 1, name: 'Windstorm'},
        {id: 2, name: 'LaughingGas'}
      ];
    },

    activate: function() {
      this.active = !this.active;
      this.views.forEach(function(view) {
        view.activate();
      });
    },
  });

  // add prototype property w/ getter outside the DSL
  var proto = app.heroQueries.HeroQueriesComponent.prototype;
  Object.defineProperty(proto, "buttonLabel", {
      get: function () {
          return this.active ? 'Deactivate' : 'Activate';
      },
      enumerable: true
  });

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/