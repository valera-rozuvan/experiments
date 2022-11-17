(function(app) {

var platformBrowserDynamic = ng.platformBrowserDynamic.platformBrowserDynamic;

document.addEventListener('DOMContentLoaded', function() {
  platformBrowserDynamic().bootstrapModule(app.AppModule);
});

})(window.app = window.app || {});


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/