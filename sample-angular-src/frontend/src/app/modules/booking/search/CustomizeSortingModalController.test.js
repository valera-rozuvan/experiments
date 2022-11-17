var app = require('./index.js');

describe(app.name, function() {
  var scope, controller, columns, modalInstance, sorting;

  beforeEach(function() {
    modalInstance = {
      close: env.stub(),
      dismiss: env.stub()
    };
    angular.mock.module('smpl.search');
  });

  describe('Controllers', function() {

    describe('CustomizeSortingModalController', function() {
      describe('without previous sorting', function() {
        beforeEach(inject(function($controller, $rootScope) {
          columns = [
            {fieldName: 'asd'},
            {fieldName: 'qwe'},
            {fieldName: 'zxc'}
          ];

          controller = $controller;
          scope = $rootScope.$new();
        }));

        it('should work even there is no previous sorting set', function() {
          function controllerExecution() {
            controller('CustomizeSortingModalController', {
              $scope: scope,
              columns: columns,
              $modalInstance: modalInstance,
              sorting: false
            });
          }
          controllerExecution();
          expect(controllerExecution).not.to.throw;

        });

      });

      describe('with previous sorting', function() {

        beforeEach(inject(function($controller, $rootScope) {
          columns = [
            {fieldName: 'asd', visible: true},
            {fieldName: 'qwe', visible: true},
            {fieldName: 'zxc', visible: true}
          ];
          sorting = [
            {
              fieldName: 'asd',
              direction: 'ASC'
            }
          ];
          controller = $controller;
          scope = $rootScope.$new();
          $controller('CustomizeSortingModalController', {
            $scope: scope,
            columns: columns,
            $modalInstance: modalInstance,
            sorting: sorting
          });
        }));

        it('should have information about columns, which are used for sorting', function() {
          scope.usedFields.should.deep.equal(sorting);
        });

        it('should have information about columns, which are not used for sorting', function() {
          scope.unusedFields.length.should.equal(2);
        });

        it('should return columns', function() {
          scope.ok();
          modalInstance.close.should.have.been.calledWith(scope.usedFields);
        });

        it('should exit for without saving', function() {
          scope.cancel();
          modalInstance.dismiss.should.have.been.called;
        });

        it('should make columns sortable', function() {
          var sortedLength = scope.usedFields.length,
           unsortedLength = scope.unusedFields.length;
          scope.addToUsed(0);
          scope.usedFields.length.should.equal(sortedLength + 1);
          scope.unusedFields.length.should.equal(unsortedLength - 1);
        });

        it('should make columns unsortable', function() {
          var sortedLength = scope.usedFields.length,
           unsortedLength = scope.unusedFields.length;
          scope.removeFromUsed(0);
          scope.usedFields.length.should.equal(sortedLength - 1);
          scope.unusedFields.length.should.equal(unsortedLength + 1);
        });

        it('should move a sortable column up in a list', function() {
          var previousIndex = 0,
           item = scope.usedFields[previousIndex];
          scope.moveUp(previousIndex);
          scope.usedFields[previousIndex - 1].should.deep.equal(item);
        });

        it('should move a sortable column down in a list', function() {
          var previousIndex = 0,
           item = scope.usedFields[previousIndex];
          scope.moveDown(previousIndex);
          scope.usedFields[previousIndex + 1].should.deep.equal(item);
        });

        it('should change sorting for a column', function() {
          scope.toggleSorting(0);
          scope.usedFields[0].direction.should.equal('DESC');
          scope.toggleSorting(0);
          scope.usedFields[0].direction.should.equal('ASC');
        });

      });

    });
  });
});
