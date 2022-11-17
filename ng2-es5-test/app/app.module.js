(function(app) {

app.AppModule = AppModule;
function AppModule() { }

AppModule.annotations = [
  new ng.core.NgModule({
    imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
    declarations: [
      app.AppComponent,
      app.ConfirmComponent, app.ConfirmDslComponent,
      app.HeroComponent, app.HeroDslComponent,
      app.HeroDIComponent, app.HeroDIDslComponent,
      app.HeroDIInjectComponent, app.HeroDIInjectDslComponent,
      app.HeroDIInjectAdditionalComponent, app.HeroDIInjectAdditionalDslComponent,
      app.HeroHostComponent, app.HeroHostDslComponent,
      app.HeroIOComponent, app.HeroIODslComponent,
      app.HeroLifecycleComponent, app.HeroLifecycleDslComponent,
      app.heroQueries.HeroQueriesComponent, app.heroQueries.ViewChildComponent, app.heroQueries.ContentChildComponent,
      app.HeroTitleComponent, app.HeroTitleDslComponent
    ],
    providers: [
      app.DataService,
      { provide: 'heroName', useValue: 'Windstorm' }
    ],
    bootstrap: [ app.AppComponent ],

    // schemas: [ ng.core.NO_ERRORS_SCHEMA ] // helpful for debugging!
  })
]

})(window.app = window.app || {});


///// For documentation only /////
(function () {
  var HeroComponent = app.HeroComponent;

  var platformBrowserDynamic = ng.platformBrowserDynamic.platformBrowserDynamic;
  var LocationStrategy = ng.common.LocationStrategy;
  var HashLocationStrategy = ng.common.HashLocationStrategy;
})


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
