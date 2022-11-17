(function(app) {

  app.ConfirmComponent = ConfirmComponent;

  ConfirmComponent.annotations = [
    new ng.core.Component({
      selector: 'app-confirm',
      templateUrl: 'app/confirm.component.html',
      inputs: [
        'okMsg',
        'notOkMsg: cancelMsg'
      ],
      outputs: [
        'ok',
        'notOk: cancel'
      ]
    })
  ];

  function ConfirmComponent() {
    this.ok    = new ng.core.EventEmitter();
    this.notOk = new ng.core.EventEmitter();
  }

  ConfirmComponent.prototype.onOkClick = function() {
    this.ok.emit(true);
  }

  ConfirmComponent.prototype.onNotOkClick = function() {
    this.notOk.emit(true);
  }

})(window.app = window.app || {});

/////// DSL version ////////

(function(app) {

  var old = app.ConfirmComponent;

  app.ConfirmComponent = ng.core.Component({
    selector: 'app-confirm-dsl',
    templateUrl: 'app/confirm.component.html',
    inputs: [
      'okMsg',
      'notOkMsg: cancelMsg'
    ],
    outputs: [
      'ok',
      'notOk: cancel'
    ]
  })
  .Class({
    constructor: function ConfirmComponent() {
      this.ok    = new ng.core.EventEmitter();
      this.notOk = new ng.core.EventEmitter();
    },

    onOkClick: function() {
      this.ok.emit(true);
    },

    onNotOkClick: function() {
      this.notOk.emit(true);
    }
  });

  app.ConfirmDslComponent = app.ConfirmComponent;
  app.ConfirmComponent = old;

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/