'use strict';

module.exports = /*@ngInject*/
  function SearchResource($resource) {
    var res = $resource(global.CONFIG.BOOKING_SEARCH);
    return {
      get: function() {
        return res.get.apply(this, arguments);
      }
    };
  };
