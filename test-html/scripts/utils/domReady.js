define(function () {
  const domReady = function (callbackFunc) {
    if (document.readyState !== 'loading') {
      callbackFunc()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callbackFunc)
    }
  }

  return domReady
})
