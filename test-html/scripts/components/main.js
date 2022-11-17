define(['utils/h'], function (h) {
  const Main = function () {
    return {
      render: function () {
        var items = [1, 2, 3, 4, 5].map(function (item) {
          return h('li', { id: item }, 'Item ' + item)
        })
        return (
          h('main', null,
            h('ul', null, items)
          )
        )
      }
    }
  }

  return Main
})
