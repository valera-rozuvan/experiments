module.exports = /*@ngInject*/
  function CustomizeSortingModalController($scope, $modalInstance, columns, sorting) {

    $scope.page = 'sorting';

    $scope.usedFields = sorting || [];

    $scope.unusedFields = columns
      .filter(function(column) {
        var fieldName = column.fieldName,
          columnNotPresentInSorting = $scope.usedFields.every(function(column) {
            return column.fieldName !== fieldName;
          });
        return columnNotPresentInSorting;
      });

    sortUnusedFields();

    $scope.ok = function() {
      $modalInstance.close($scope.usedFields);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    $scope.addToUsed = function(index) {
      var item = $scope.unusedFields.splice(index, 1)[0];
      item.direction = 'ASC';
      $scope.usedFields = $scope.usedFields.concat(item); //push does not update value in scope
      sortUnusedFields();
    };

    $scope.removeFromUsed = function(index) {
      var item = $scope.usedFields.splice(index, 1)[0];
      item.direction = null;
      $scope.unusedFields = $scope.unusedFields.concat(item); //push does not update value in scope
      sortUnusedFields();
    };

    $scope.moveUp = function(index) {
      var temp = $scope.usedFields[index];
      $scope.usedFields[index] = $scope.usedFields[index - 1];
      $scope.usedFields[index - 1] = temp;
    };

    $scope.moveDown = function(index) {
      var temp = $scope.usedFields[index];
      $scope.usedFields[index] = $scope.usedFields[index + 1];
      $scope.usedFields[index + 1] = temp;
    };

    $scope.toggleSorting = function(index) {
      var direction = $scope.usedFields[index].direction,
        newDirection = direction === 'ASC' ?
          'DESC' : 'ASC';
      $scope.usedFields[index].direction = newDirection;
    };

    function sortUnusedFields() {
      $scope.unusedFields.sort(function(item1, item2) {
        if (item1.fieldName === item2.fieldName) {
          return 0;
        }

        return (item1.fieldName > item2.fieldName) ? 1 : -1;
      });
    }
  };
