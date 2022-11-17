module.exports = /*@ngInject*/
  function CustomizeColumnsModalController($scope, $modalInstance, availableColumns, columns, sorting) {

    $scope.page = 'customize';

    $scope.usedFields = columns.slice(0);
    $scope.unusedFields = availableColumns.slice(0);
    sortUnusedFields();

    $scope.ok = function() {
      $scope.sorting = sorting.filter(function(sortField) {
        return $scope.usedFields.some(function(usedField) { return sortField.fieldName === usedField.fieldName; });
      });

      $modalInstance.close({
        columns: $scope.usedFields.map(function(item, idx) { item.value = idx; return item;}),
        sorting: $scope.sorting,
        availableColumns: $scope.unusedFields
      });
    };
    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    $scope.removeFromUsed = function(index) {
      $scope.unusedFields = $scope.unusedFields.concat($scope.usedFields.splice(index, 1)); //push does not update value in scope
      sortUnusedFields();
    };

    $scope.addToUsed = function(index) {
      $scope.usedFields = $scope.usedFields.concat($scope.unusedFields.splice(index, 1)); //push does not update value in scope
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

    function sortUnusedFields() {
      $scope.unusedFields.sort(function(item1, item2) {
        if (item1.fieldName === item2.fieldName) {
          return 0;
        }

        return (item1.fieldName > item2.fieldName) ? 1 : -1;
      });
    }

  };
