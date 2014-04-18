'use strict';

// Declare app level module which depends on filters, and services
angular.module('craigSearch', [
  'ngRoute',
  'ngTouch',
  'craigSearch.filters',
  'craigSearch.services',
  'craigSearch.directives',
  'craigSearch.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searches', {templateUrl: 'partials/searches.html', controller: 'SearchesController'});
  $routeProvider.when('/searches/:searchId/results', {templateUrl: 'partials/search-results.html', controller: 'SearchResultsController'});
  $routeProvider.when('/searches/:searchId/results/:resultId', {templateUrl: 'partials/search-result-detail.html', controller: 'SearchResultDetailController'});
  $routeProvider.otherwise({redirectTo: '/searches'});
}]);

