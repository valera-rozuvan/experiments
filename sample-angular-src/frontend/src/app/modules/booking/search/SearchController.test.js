var app = require('./index.js');

describe(app.name, function() {
  var scope, controller, mockState,
    mockDefer, mockSearchResource,
    mockTeamsResource, mockFilter, mockFilterInstance, mockValidationService,
    mockVendorsResource, mockDataStoringService, modal, mockSortingResource, mockColumnsResource,
    existingSorting;

  beforeEach(function() {
    angular.mock.module('smpl.search', 'smpl.main-common', 'smpl.booking.common');
    existingSorting = [{fieldName: 'POId'}];
    mockDefer = {
      resolve: env.stub()
    };

    modal = {
      open: env.stub()
    };

    mockSortingResource = {
      save: env.stub().returns({
        $promise: new MockPromise(true)
      }),
      query: env.stub().returns(existingSorting)
    };

    mockColumnsResource = {
      save: genResourceStub(),
      query: genResourceStub()
    };

    mockSearchResource = {
      get: genResourceStub()
    };

    mockVendorsResource = {
      get: genResourceStub()
    };

    mockTeamsResource = {
      query: env.stub()
    };

    mockValidationService = {
      isInvalidDate: env.stub(),
      isInvalidInteger: env.stub(),
      isEmpty: env.stub()
    };

    mockState = {
      go: env.stub()
    };

    mockDataStoringService = {
      setDisplayParams: env.stub(),
      getDisplayParams: env.stub().returns({}),
      setFirstVisit: env.stub(),
      getFirstVisit: env.stub(),
      getSearchParams: env.stub().returns({}),
      setSearchParams: env.stub(),
      setBooking: env.stub(),
      getColumnsData: env.stub().returns([]),
      setColumnsData: env.stub(),
      setSorting: env.stub(),
      getDisplayedBookings: env.stub(),
      getResultsLength: env.stub(),
      setResultsLength: env.stub(),
      storeDisplayedBookings: env.stub(),
      reset: env.stub()
    };

    mockFilterInstance = env.stub();
    mockFilter = env.stub().returns(mockFilterInstance);
  });

  describe('Controllers', function() {
    describe('SearchController', function() {
      beforeEach(inject(function($controller, $rootScope) {
        controller = $controller;
        scope = $rootScope.$new();
      }));

      function executeController() {
        controller('SearchController', {
          $scope: scope,
          $modal: modal,
          $state: mockState,
          $filter: mockFilter,
          $controller: controller,
          SearchResource: mockSearchResource,
          TeamsResource: mockTeamsResource,
          ValidationService: mockValidationService,
          StoringDataService: mockDataStoringService,
          VendorsResource: mockVendorsResource,
          SortingResource: mockSortingResource,
          ColumnsResource: mockColumnsResource
        });

        env.stub(scope, 'displayErrors');
        env.stub(scope, 'addSuccessMessage');
      }

      it('should load sorting configuration form server', function() {
        executeController();
        mockSortingResource.query.should.have.been.called;
      });

      it('should load column configuration form server', function() {
        executeController();
        mockColumnsResource.query.should.have.been.called;
      });

      it('should print search result', function() {
        executeController();
        global.print = env.stub();
        scope.print();
        global.print.should.have.been.called;
      });

      describe('table parameters', function() {
        var search;
        beforeEach(function() {
          executeController();
          search = env.spy(scope, 'search');
        });

        it('should set rows count', function() {
          scope.setRowsCount(123);
          scope.displayParams.rowsLimit.should.equal(123);
        });

        it('should set rows count', function() {
          scope.setRowsCount(123);
          scope.displayParams.rowsLimit.should.equal(123);
        });

        it('should perform a new search whenever displaying parameters are changed', function() {
          scope.$digest();
          scope.displayParams.rowsLimit = 12415;
          scope.$digest();
          search.should.have.been.called;
        });

        describe('sorting order', function() {
          var columnTitle = 'title';
          beforeEach(function() {
            scope.setSortingOrder(columnTitle);
          });

          it('should set sorting column title', function() {
            scope.ordering.title.should.equal(columnTitle);
          });

          it('should set sorting order', function() {
            scope.ordering.direction.should.equal('ASC');
          });

          it('should toggle sorting order', function() {
            scope.setSortingOrder(columnTitle);
            scope.ordering.title.should.equal(columnTitle);
            scope.ordering.direction.should.equal('DESC');
          });

          it('should make a search request after the sorting changes', function() {
            search.should.have.been.called;
          });
        });
      });

      describe('reset', function() {
        beforeEach(function() {
          executeController();
          scope.searchParams = {
            prop: 'value'
          };
          scope.isFirstVisit = false;
          scope.reset();
        });
        it('should reset search parameters', function() {
          scope.searchParams.should.deep.equal({});
        });

        it('should clear all the saved data', function() {
          mockDataStoringService.reset.should.have.been.called;
        });
      });

      describe('search request', function() {
        describe('empty data', function() {
          beforeEach(function() {
            var data = [],
              response = {
                count: data.length,
                data: data
              };

            mockSearchResource.get.resolve(response);
            executeController();
            scope.searchParams = {a:1};
            scope.search();
          });

          it('should hide an alert when click on close button', function() {
            scope.hideAlert();
            scope.alertIsDisplayed.should.be.false;
          });

        });

        it('should be able to perform a query on search', function() {
          mockDataStoringService.getFirstVisit.returns(true);
          executeController();
          scope.searchParams = {a:1};
          scope.search();
          mockSearchResource.get.should.have.been.called;
        });

        describe('error case', function() {

          it('should NOT be able to perform a query on search with empty data', function() {
            mockDataStoringService.getFirstVisit.returns(true);
            executeController();
            scope.searchParams = {};
            scope.search();
            mockSearchResource.get.should.not.have.been.called;
          });

          it('should NOT be able to perform a query on search with invalid data', function() {
            mockDataStoringService.getFirstVisit.returns(true);
            executeController();
            scope.searchParams = {a:1};
            mockValidationService.isInvalidDate.returns(true);
            scope.search();
            mockSearchResource.get.should.not.have.been.called;
          });

          it('should display validation errors', function() {
            executeController();
            scope.searchParams = {a:1};
            mockValidationService.isInvalidDate.returns(true);
            scope.search();
            scope.displayErrors.should.have.been.called;
          });

        });

        describe('search data', function() {
          var data, response;

          beforeEach(function() {
            data = [{
              a: 1,
              b: 2,
              c: 3
            }];
            response = {
              count: data.length,
              data: data
            };
            mockSearchResource.get.resolve(response);

            executeController();
            scope.searchParams = {a:1};
            scope.columns = [{fieldName: 'b'}];
            scope.availableColumns = [];
            scope.search();
          });

          it('should save search results', function() {
            mockDataStoringService.storeDisplayedBookings.should
              .have.been.calledWith(data);
          });

          it('should save total results quantity', function() {
            mockDataStoringService.setResultsLength.should
              .have.been.calledWith(data.length);
          });

          it('should save available columns and filter out selected columns', function() {
            scope.availableColumns.should.deep.equal([
              {fieldName: 'a', visible: true},
              {fieldName: 'c', visible: true}
            ]);
          });

          it('should update displayed results', function() {
            scope.searchResults.should.deep.equal(data);
          });
        });
      });

      describe('Modals', function() {
        var modalResult;
        var userColumns;
        beforeEach(function() {
          userColumns = [1, 2, 3];
          //mockColumnsResource.query = env.stub().returns(userColumns);

          mockDataStoringService.getDisplayParams.returns({});
          executeController();
        });

        describe('Customize Columns', function() {
          beforeEach(function() {
            modalResult = {
              columns: [1, 2, 3],
              sorting: [7, 8, 9],
              availableColumns: [4, 5, 6]
            };
            modal.open.returns({
              result: {
                then: env.stub().callsArgWith(0, modalResult)
              }
            });
          });

          it('should show modal window for customization of columns after click on button', function() {
            scope.customizeColumns();
            modal.open.should.have.been.calledWith({
              controller: 'CustomizeColumnsModalController',
              templateUrl: 'booking/search/templates/customizeSearchTableModal.html',
              size: 'lg',
              resolve: {
                columns: env.match.func,
                sorting: env.match.func,
                availableColumns: env.match.func
              }
            });
          });

          it('should provide columns for modal', function() {
            scope.customizeColumns();
            var resolvedColumns = modal.open.lastCall.args[0]
              .resolve.columns();

            resolvedColumns.should.deep.equal(userColumns);
          });

          it('should save new columns', function() {
            scope.customizeColumns();
            mockColumnsResource.save.should.have.been.calledWith(modalResult.columns);
            mockSortingResource.save.should.have.been.calledWith(modalResult.sorting);
          });

          it('should get modified columns from the modal', function() {
            scope.customizeColumns();
            scope.columns.should.equal(modalResult.columns);
            scope.availableColumns.should.equal(modalResult.availableColumns);
          });
        });

        describe('Customize Sorting', function() {
          modalResult = [{fieldName:'bookingId', direction:'ASC'}];
          beforeEach(function() {
            modal.open.returns({
              result: {
                then: env.stub().callsArgWith(0, modalResult)
              }
            });
            scope.searchParams = {a:1};
            scope.customizeSorting();
          });

          it('should show modal window for sorting customisation', function() {
            modal.open.should.have.been.calledWith({
              controller: 'CustomizeSortingModalController',
              templateUrl: 'booking/search/templates/customizeSearchTableModal.html',
              size: 'lg',
              resolve: {
                columns: env.match.func,
                sorting: env.match.func
              }
            });
          });

          it('should provide columns for modal', function() {
            var resolvedColumns = modal.open.lastCall.args[0]
              .resolve.columns();

            resolvedColumns.should.equal(scope.columns);
          });

          it('should provide existing sorting for modal', function() {
            var sorting;
            scope.customizeSorting();
            sorting = modal.open.lastCall.args[0].resolve.sorting();
            sorting.should.deep.equal(modalResult);
          });

          it('should save modified sorting paramters to scope', function() {
            scope.sorting.should.deep.equal(modalResult);
          });

          it('should save new sorting parameters', function() {
            mockSortingResource.save.should.have.been
              .calledWith(modalResult);
          });

          it('should query the search results again after save', function() {
            mockSearchResource.get.should.have.been.called;
          });

        });

      });

      it('should start search if validation success', function() {
        executeController();

        scope.searchParams.poNumber = '';
        scope.searchParams.bookingId = '123';
        scope.searchParams.bookedDate = '11-22-2013';
        scope.vendor.vendorName = 'qwe';
        scope.vendor.vendorIssId = '123';
        scope.vendor.vendorSapId = '123';
        scope.vendor.vendorId = '123';

        scope.search();
        mockSearchResource.get.should.have.been.called;
      });

      describe('Vendors', function() {
        it('should load vendors', function() {
          var search = 'qwe';

          executeController();

          scope.getVendors(search, 'name');
          mockVendorsResource.get.should.have.been.calledWith({
            name: search
          });
        });

        it('should watch vendors name field', function() {
          var val = {
            issId: 111,
            sapId: 222,
            name: 'name',
            id: 100
          };

          executeController();

          scope.vendor.name = val;
          scope.$apply();
          scope.vendor.should.equal(val);
        });

        it('should watch vendors IssId field', function() {
          var val = {
            issId: 111,
            sapId: 222,
            name: 'name',
            id: 100
          };

          executeController();

          scope.vendor.issId = val;
          scope.$apply();
          scope.vendor.should.equal(val);
        });

        it('should watch vendors SapId field', function() {
          var val = {
            issId: 111,
            sapId: 222,
            name: 'name',
            id: 100
          };

          executeController();

          scope.vendor.sapId = val;
          scope.$apply();
          scope.vendor.should.equal(val);
        });
      });

      describe('Vendor is an empty string', function() {
        it('vendorId should be reset', function() {
          var val = {
            issId: 111,
            sapId: 222,
            name: 'name',
            id: 100
          };

          executeController();

          scope.vendor.sapId = '';
          scope.$apply();
          scope.vendor.should.deep.equal({});
          expect(scope.searchParams).not.to.have.property('vendorId');
        });
      });

      describe('CSV file generation', function() {
        beforeEach(function() {
          executeController();
        });

        it('at first the CSV URL is an empty string', function() {
          scope.csvRestUrl.should.deep.equal('');
        });

        it('simple call of getCsvRestUrl function', function() {
          scope.columns = undefined;
          mockDataStoringService.getSearchParams.returns();

          scope.getCsvRestUrl();

          scope.csvRestUrl.should.deep.equal(
            '/booking/mock/booking/download/csv?'
          );
        });

        it('call of getCsvRestUrl function when params and columns are set', function() {
          scope.columns = [
            {fieldName: 'two'},
            {fieldName: 'four'}
          ];
          mockDataStoringService.getSearchParams.returns({
            param1: 'val1',
            param2: 'val2'
          });

          scope.getCsvRestUrl();

          scope.csvRestUrl.should.deep.equal(
            '/booking/mock/booking/download/csv?' +
            'param1=val1&param2=val2&col_two=i18n.search.two&col_four=i18n.search.four'
          );
        });

        it('call of getCsvRestUrl function when params are set', function() {
          scope.columns = undefined;
          mockDataStoringService.getSearchParams.returns({
            param1: 'val1',
            param2: 'val2'
          });

          scope.getCsvRestUrl();

          scope.csvRestUrl.should.deep.equal(
            '/booking/mock/booking/download/csv?param1=val1&param2=val2'
          );
        });

        it('call of getCsvRestUrl function when columns are set', function() {
          scope.columns = [
            {fieldName: 'one'},
            {fieldName: 'three'}
          ];
          mockDataStoringService.getSearchParams.returns();

          scope.getCsvRestUrl();

          scope.csvRestUrl.should.deep.equal(
            '/booking/mock/booking/download/csv?col_one=i18n.search.one&col_three=i18n.search.three'
          );
        });
      });

      describe('Previously Searched', function() {
        var value;

        it('should add to previously searched Vendor field', function() {
          value = {
            id: 222,
            name: 'Vendor 2',
            issId: '1231232',
            sapId: '222222222'
          };

          executeController();
          scope.vendor = value;
          scope.searchParams.vendorId = value.id;

          scope.search();
          scope.getVendors('w')[0].should.deep.equal(value);
        });

        it('should add to previously searched PoNumbers field', function() {
          value = 'QWE123';

          executeController();
          scope.searchParams.poNumber = value;

          scope.search();
          scope.getPoNumbers('w')[0].should.deep.equal(value);
        });

        it('should add to previously searched Bookings Id field', function() {
          value = 'QWE123';

          executeController();
          scope.searchParams.bookingId = value;

          scope.search();
          scope.getBookingsId('w')[0].should.deep.equal(value);
        });

        it('should add to previously searched Container Numbers field', function() {
          value = 'QWE123';

          executeController();
          scope.searchParams.containerNumber = value;

          scope.search();
          scope.getContainerNumbers('w')[0].should.deep.equal(value);
        });
      });
    });
  });
});
