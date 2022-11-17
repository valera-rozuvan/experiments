'use strict';

module.exports =
  angular.module('smpl.search', [
    'ui.router',
    'pascalprecht.translate',
    'ngResource'
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
  .config(/*@ngInject*/ function($stateProvider, $translateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/search');

    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'booking/search/templates/search.html',
        controller: 'SearchController',
        parent: 'root'
      });

    $translateProvider.translations('en', require('./i18n/en'));
    $translateProvider.translations('fr', require('./i18n/fr'));
    $translateProvider.translations('de', require('./i18n/de'));
    $translateProvider.translations('it', require('./i18n/it'));
  })
  .controller('CustomizeColumnsModalController', require('./CustomizeColumnsModalController'))
  .controller('CustomizeSortingModalController', require('./CustomizeSortingModalController'))
  .controller('SearchController', require('./SearchController'))
  .factory('SortingResource', require('./resources/SortingResource'))
  .factory('ColumnsResource', require('./resources/ColumnsResource'))
  .factory('SearchResource', require('./resources/SearchResource'));
