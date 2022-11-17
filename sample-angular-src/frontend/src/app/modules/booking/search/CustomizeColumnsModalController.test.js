var app = require('./index.js');

describe(app.name, function() {
  var scope, controller, columns, sorting, availableColumns, modalInstance;

  beforeEach(function() {
    modalInstance = {
      close: env.stub(),
      dismiss: env.stub()
    };
    angular.mock.module('smpl.search');
  });

  describe('Controllers', function() {

    describe('CustomizeColumnsModalController', function() {

      beforeEach(inject(function($controller, $rootScope) {
        availableColumns = [
          {
            fieldName: 'qwe',
            visible: false
          }
        ];
        sorting = [
          {
            fieldName: 'asd'
          },
          {
            fieldName: 'should be filtered'
          }
        ];
        columns = [
          {
            fieldName: 'asd',
            visible: true
          },
          {
            fieldName: 'zxc',
            visible: true
          }
        ];
        controller = $controller;
        scope = $rootScope.$new();
        $controller('CustomizeColumnsModalController', {
          $scope: scope,
          $modalInstance: modalInstance,
          availableColumns: availableColumns,
          columns: columns,
          sorting: sorting
        });
      }));

      it('should have information about visible columns', function() {
        scope.usedFields.should.deep.equal(columns);
      });

      it('should have information about invisible columns', function() {
        scope.unusedFields.should.deep.equal(availableColumns);
      });

      it('should return columns, sorting and availableColumns', function() {
        scope.ok();
        var filteredSorting = [{
          fieldName: 'asd'
        }];

        modalInstance.close.should.have.been.calledWith({
          columns: scope.usedFields,
          sorting: filteredSorting,
          availableColumns: scope.unusedFields
        });
      });

      it('should exit for without saving', function() {
        scope.cancel();
        modalInstance.dismiss.should.have.been.called;
      });

      it('should make visible columns invisible', function() {
        var invisibleLength = scope.unusedFields.length,
         visibleLength = scope.usedFields.length;
        scope.removeFromUsed(0);
        scope.unusedFields.length.should.equal(invisibleLength + 1);
        scope.usedFields.length.should.equal(visibleLength - 1);
      });

      it('should make invisible columns visible', function() {
        var invisibleLength = scope.unusedFields.length,
         visibleLength = scope.usedFields.length;
        scope.addToUsed(0);
        scope.unusedFields.length.should.equal(invisibleLength - 1);
        scope.usedFields.length.should.equal(visibleLength + 1);
      });

      it('should move a visible column up in a list', function() {
        var previousIndex = 1,
         item = scope.usedFields[previousIndex];
        scope.moveUp(previousIndex);
        scope.usedFields[previousIndex - 1].should.deep.equal(item);
      });

      it('should move a visible column down in a list', function() {
        var previousIndex = 0,
         item = scope.usedFields[previousIndex];
        scope.moveDown(previousIndex);
        scope.usedFields[previousIndex + 1].should.deep.equal(item);
      });
    });
  });
});
