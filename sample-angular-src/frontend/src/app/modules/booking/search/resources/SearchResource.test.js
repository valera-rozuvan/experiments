var app = require('../index.js');

describe('SearchResource', function() {
  var sut, mockResourceInstance, resource;

  beforeEach(function() {
    angular.mock.module('smpl.search');

    mockResourceInstance = {
      get: env.stub()
    };
    resource = env.stub().returns(mockResourceInstance);
    angular.mock.module(function($provide) {
      $provide.value('$resource', resource);
    });
  });

  beforeEach(inject(function(SearchResource) {
    sut = SearchResource;
  }));

  it('should get the unload area', function() {
    sut.get();
    mockResourceInstance.get.should.have.been.called;
  });

  it('should init resource with correct params', function() {
    resource.should.have.been.calledWith(global.CONFIG.BOOKING_SEARCH);
  });

});

