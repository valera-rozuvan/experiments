define(['vendor/preact'], function (preact) {
  // To use Classful Components in ES3/5, use your favorite inheritance technique.
  // If you don't intend to use the Component class, you can skip this.
  // Here's an example:
  const createClass = function (obj) {
    // sub-class Component:
    function F() { preact.Component.call(this) }
    var p = F.prototype = new preact.Component
    // copy our skeleton into the prototype:
    for (var i in obj) {
      if (i === 'getDefaultProps' && typeof obj.getDefaultProps === 'function') {
        F.defaultProps = obj.getDefaultProps() || {}
      } else {
        p[i] = obj[i]
      }
    }
    // restore constructor:
    return p.constructor = F
  }

  return createClass
})
