define(
  ['utils/createClass', 'utils/h', 'utils/stopLoader', 'components/header', 'components/main'],
  function (createClass, h, stopLoader, Header, Main) {
    const App = function () {
      var header = createClass(Header())
      var main = createClass(Main())

      return {
        componentDidMount: function () {
          this.setState({ message: 'Hello!' })

          stopLoader()
        },
        render: function (props, state) {
          return (
            h('div', { id: 'app' },
              h(header, { message: state.message }),
              h(main)
            )
          )
        }
      }
    }

    return App
  }
)
