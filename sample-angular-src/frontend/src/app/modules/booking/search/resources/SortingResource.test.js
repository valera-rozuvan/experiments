var app = require('../index');

describe('SortingResource', function() {
  var sut, mockResourceInstance, resource;

  beforeEach(function() {
    angular.mock.module('smpl.search');

    mockResourceInstance = {
      query: env.stub(),
      save: env.stub()
    };
    resource = env.stub().returns(mockResourceInstance);
    angular.mock.module(function($provide) {
      $provide.value('$resource', resource);
    });
  });

  beforeEach(inject(function(SortingResource) {
    sut = SortingResource;
  }));

  it('should save sorting', function() {
    var data = [1, 2, 3];
    sut.save(data);
    mockResourceInstance.save.should.have.been.calledWith(data);
  });

  it('should query sorting', function() {
    sut.query();
    mockResourceInstance.query.should.have.been.called;
  });

});

