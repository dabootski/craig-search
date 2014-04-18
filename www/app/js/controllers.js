'use strict';

/* Controllers */

angular.module('craigSearch.controllers', [])
  .controller('SearchesController', ['$scope', 'SearchService',
    function($scope, SearchService) {
      $scope.searches = SearchService.savedSearches();
    }
  ])
  .controller('SearchResultsController', ['$scope', '$routeParams', 'SearchService',
    function($scope, $routeParams, SearchService) {
      $scope.search = SearchService.find($routeParams.searchId);
    }
  ]);

