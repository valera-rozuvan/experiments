define(['utils/h'], function (h) {
  const Header = function () {
    return {
      render: function (props, state) {
        return h('header', null,
          h('h1', null, 'App'),
          props.message ? h('h2', null, props.message) : null
        )
      }
    }
  }

  return Header
})
