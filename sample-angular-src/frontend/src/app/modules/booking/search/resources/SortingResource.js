'use strict';

module.exports = /*@ngInject*/
  function SortingResource($resource) {

    var res = $resource(global.CONFIG.BOOKING_SORTING, {}, {
      save: {
        method: 'POST',
        isArray: true
      }
    });

    return {
      save: function(data) {
        return res.save(data);
      },
      query: function() {
        return res.query();
      }
    };
  };
