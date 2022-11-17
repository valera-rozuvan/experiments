define(
  ['utils/createClass', 'utils/h', 'utils/render', 'components/app'],
  function (createClass, h, render, App) {
    const initApp = function () {
      const app = createClass(App())

      render(h(app), document.getElementById('app'))
    }

    return initApp
  }
)
