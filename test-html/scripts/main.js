requirejs.config({
  baseUrl: 'scripts/',
  paths: {}
})

requirejs(['utils/domReady', 'initApp'], function (domReady, initApp) {
  domReady(function () {
    initApp()
  })
})
