'use strict';

module.exports = /*@ngInject*/
  function SearchController(
    $scope, $modal, $state, $filter, $controller, $q, $translate, SearchResource,
    TeamsResource, ValidationService, StoringDataService, VendorsResource, SortingResource, ColumnsResource,
    LocalStorageService
  ) {
    var isFirstVisit;

    $controller('ErrorsBaseController', {$scope: $scope});
    $scope.rowsCounts = [10, 25, 50, 100];
    $scope.searchResults = StoringDataService.getDisplayedBookings();
    $scope.teamsList = TeamsResource.query();
    $scope.searchParams = StoringDataService.getSearchParams();
    $scope.errors = {};
    $scope.availableColumns = [];
    $scope.columns = ColumnsResource.query();
    $scope.sorting = $scope.searchParams.sorting || SortingResource.query();
    $scope.resultsCount = StoringDataService.getResultsLength();
    $scope.vendor = {};
    isFirstVisit = StoringDataService.getFirstVisit();
    $scope.resultsUnavailable = false;
    $scope.displayParams = StoringDataService.getDisplayParams();
    $scope.alertIsDisplayed = false;
    $scope.ordering = {};
    $scope.csvRestUrl = '';

    $scope.columns.$promise.then(function() {
      setAvailableColumns();
    });

    $scope.searchResultsDisplayed = function() {
      return !isFirstVisit && (!$scope.resultsUnavailable);
    };

    $scope.setRowsCount = function(num) {
      $scope.displayParams.rowsLimit = num;
    };

    $scope.setSortingOrder = function(fieldName) {
      if (fieldName === $scope.ordering.title) {
        $scope.ordering.direction = $scope.ordering.direction === 'ASC' ? 'DESC' : 'ASC';
      } else {
        $scope.ordering.direction = 'ASC';
        $scope.ordering.title = fieldName;
      }
      $scope.search();
    };

    $scope.hideAlert = function() {
      $scope.alertIsDisplayed = false;
    };

    $scope.search = function() {
      clearSearchParams();
      validation();
      if (!$scope.hasError()) {
        addToPreviouslySearched();
        initializeSearchResults();
        StoringDataService.setSearchParams($scope.searchParams);
      } else {
        $scope.displayErrors();
      }
    };

    $scope.$watch('displayParams', function(newVal, prevVal) {
      if (newVal !== prevVal) {
        $scope.search();
      }

    }, true);

    $scope.reset = function() {
      $scope.errors = {};
      $scope.vendor = {};
      $scope.searchResults = [];
      $scope.alertIsDisplayed = false;
      StoringDataService.reset();
      $scope.results = StoringDataService.getDisplayedBookings();
      $scope.searchParams = StoringDataService.getSearchParams();
      isFirstVisit = StoringDataService.getFirstVisit();
      $scope.resultsCount = StoringDataService.getResultsLength();
    };

    function clearSearchParams() {
      angular.forEach($scope.searchParams, function(value, key) {
        if (!value) {
          delete $scope.searchParams[key];
        }
      });
    }

    function validation() {
      $scope.errors = {};
      $scope.closeAllErrors();

      if (angular.equals({}, $scope.searchParams)) {
        $scope.errors.requiredParam = true;
        return;
      }

      $scope.errors.poNumber = ValidationService.isInvalidInteger($scope.searchParams.poNumber);
      $scope.errors.bookingId = ValidationService.isInvalidInteger($scope.searchParams.bookingId);
      $scope.errors.bookedDate = ValidationService.isInvalidDate($scope.searchParams.bookedDate);

      if ($scope.vendor.name || $scope.vendor.issId || $scope.vendor.sapId) {
        $scope.errors.vendorId = ValidationService.isEmpty($scope.searchParams.vendorId);
      }
    }

    function initializeSearchResults() {
      var requestParams = {};
      if ($scope.ordering.title && $scope.ordering.direction) {
        requestParams.sort = $scope.ordering.title + ',' + $scope.ordering.direction;
      }
      angular.extend(requestParams, $scope.searchParams, $scope.displayParams);

      if ($scope.searchParams.bookedDate) {
        requestParams.bookedDate = moment(
          $scope.searchParams.bookedDate, 'YYYY-MM-DD'
        ).format('YYYY-MM-DD');
      }

      SearchResource.get(requestParams).$promise.then(function(response) {
        $scope.alertIsDisplayed = true;
        updateFirstVisitStatus();
        StoringDataService.setResultsLength(response.count);
        $scope.resultsCount = response.count;
        StoringDataService.setDisplayParams($scope.displayParams);
        StoringDataService.storeDisplayedBookings(response.data);
        $scope.searchResults = response.data;
        setAvailableColumns();
      });
    }

    function updateFirstVisitStatus() {
      StoringDataService.setFirstVisit(false);
      isFirstVisit = false;
    }

    $scope.customizeSorting = function() {
      $modal.open({
        controller: 'CustomizeSortingModalController',
        templateUrl: 'booking/search/templates/customizeSearchTableModal.html',
        size: 'lg',
        resolve: {
          columns: function() {
            return $scope.columns;
          },
          sorting: function() {
            return $scope.sorting;
          }
        }
      })
      .result.then(function(modifiedSorting) {
        $scope.sorting = modifiedSorting;
        SortingResource.save(modifiedSorting).$promise.then($scope.search);
      });
    };

    $scope.customizeColumns = function() {
      $modal.open({
        controller: 'CustomizeColumnsModalController',
        templateUrl: 'booking/search/templates/customizeSearchTableModal.html',
        size: 'lg',
        resolve: {
          columns: function() {
            return $scope.columns;
          },
          sorting: function() {
            return $scope.sorting;
          },
          availableColumns: function() {
            return $scope.availableColumns;
          }
        }
      })
        .result.then(function(configuration) {
          $scope.columns = configuration.columns;
          $scope.availableColumns = configuration.availableColumns;
          $scope.sorting = configuration.sorting;
          StoringDataService.setColumnsData(configuration.columns);
          $q.all(
            SortingResource.save($scope.sorting),
            ColumnsResource.save($scope.columns)
          ).then($scope.search);
        });
    };

    /* Select Vendor */
    $scope.$watch('vendor.name', function(vendor) {
      selectVendor(vendor);
    });

    $scope.$watch('vendor.issId', function(vendor) {
      selectVendor(vendor);
    });

    $scope.$watch('vendor.sapId', function(vendor) {
      selectVendor(vendor);
    });

    function selectVendor(vendor) {
      if (angular.isObject(vendor)) {
        $scope.vendor = vendor;
        $scope.searchParams.vendorId = vendor.id;
      } else if (vendor === '') {
        $scope.vendor = {};
        delete $scope.searchParams.vendorId;
      }
    }

    $scope.getVendors = function(val, key) {
      var params;

      if (val.length >= 3) {
        params = {};
        params[key] = val;
        return VendorsResource.get(params).$promise;
      } else {
        return LocalStorageService.getVendorsTop();
      }
    };
    /* Select Vendor */

    /* Previously Searched */
    function addToPreviouslySearched() {
      if ($scope.searchParams.vendorId) {
        if (angular.isObject($scope.vendor)) {
          LocalStorageService.setVendorTop($scope.vendor);
        }
      }

      if ($scope.searchParams.poNumber) {
        LocalStorageService.setPoNumberTop($scope.searchParams.poNumber);
      }

      if ($scope.searchParams.bookingId) {
        LocalStorageService.setBookingIdTop($scope.searchParams.bookingId);
      }

      if ($scope.searchParams.containerNumber) {
        LocalStorageService.setContainerNumberTop(
          $scope.searchParams.containerNumber
        );
      }
    }

    function setAvailableColumns() {
      if ($scope.searchResults && $scope.searchResults.length && !$scope.availableColumns.length) {
        $scope.availableColumns = Object.keys($scope.searchResults[0]).map(function(item) {
          var visible = true;

          if ($scope.columns.length && $scope.columns.some(function(col) {return col.fieldName === item;})) {
            visible = false;
          }
          return {
            fieldName: item,
            visible: visible
          };
        }).filter(function(item) {
          return item.fieldName !== '$$hashKey' && item.visible;
        });
      }
      if (!$scope.columns.length) {
        $scope.columns = $scope.availableColumns;
        StoringDataService.setColumnsData($scope.columns);
        $scope.availableColumns = [];
      }
    }

    $scope.getPoNumbers = function(val) {
      if (val.length < 3) {
        return LocalStorageService.getPoNumbersTop();
      } else {
        return false;
      }
    };

    $scope.getBookingsId = function(val) {
      if (val.length < 3) {
        return LocalStorageService.getBookingsIdTop();
      } else {
        return false;
      }
    };

    $scope.getContainerNumbers = function(val) {
      if (val.length < 3) {
        return LocalStorageService.getContainerNumbersTop();
      } else {
        return false;
      }
    };
    /* Previously Searched */

    $scope.print = function() {
      global.print();
    };

    $scope.getCsvRestUrl = function() {
      var sParam = StoringDataService.getSearchParams(),
        _csvRestUrl = global.CONFIG.BOOKING_SCV + '?',
        key, val;

      if (angular.isObject(sParam)) {
        for (key in sParam) {
          _csvRestUrl += encodeURIComponent(key) + '=' +
            encodeURIComponent(sParam[key]) + '&';
        }
      }

      if (angular.isArray($scope.columns)) {
        $scope.columns.forEach(function(column) {
          key = column.fieldName;
          val = $translate.instant('i18n.search.' + key);

          _csvRestUrl += encodeURIComponent('col_' + key) + '=' +
            encodeURIComponent(val) + '&';
        });
      }

      $scope.csvRestUrl = _csvRestUrl.replace(/&$/, '');
    };
  };
