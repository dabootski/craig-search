'use strict';


// Declare app level module which depends on filters, and services
angular.module('craigSearch', [
  'ngRoute',
  'craigSearch.filters',
  'craigSearch.services',
  'craigSearch.directives',
  'craigSearch.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/searches', {templateUrl: 'partials/searches.html', controller: 'SearchesController'});
  $routeProvider.when('/searches/:searchId', {templateUrl: 'partials/search-results.html', controller: 'SearchResultsController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

