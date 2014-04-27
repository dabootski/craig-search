'use strict';

// Declare app level module which depends on filters, and services
angular.module('craigSearch', [
  'ngRoute',
  'ngTouch',
  'craigSearch.filters',
  'craigSearch.services',
  'craigSearch.directives',
  'craigSearch.controllers',
  'craigSearch.models'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searches', {templateUrl: 'partials/searches.html', controller: 'SearchesController'});
  $routeProvider.when('/searches/new', {templateUrl: 'partials/new-search.html', controller: 'NewSearchController'});
  $routeProvider.when('/searches/:query/results', {templateUrl: 'partials/search-results.html', controller: 'SearchResultsController'});
  $routeProvider.when('/searches/:query/results/:resultId', {templateUrl: 'partials/search-result-detail.html', controller: 'SearchResultDetailController'});
  $routeProvider.otherwise({redirectTo: '/searches'});
}]);

