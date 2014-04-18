'use strict';

/* Controllers */

angular.module('craigSearch.controllers', [])
  .controller('SearchesController', ['$scope', '$location', 'SearchService',
    function($scope, $location, SearchService) {
      $scope.searches = SearchService.savedSearches();
      $scope.showResults = function(searchId) {
        $location.path("/searches/" + searchId + "/results");
      }
    }
  ])
  .controller('SearchResultsController', ['$scope', '$location', '$routeParams', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, SearchService, SearchResultsService) {
      $scope.search = SearchService.find($routeParams.searchId);
      $scope.results = SearchResultsService.results($routeParams.searchId);;
      $scope.showResult = function(searchId, resultId) {
        $location.path("/searches/" + searchId + "/results/" + resultId);
      }
      $scope.back = function() {
        $location.path("/searches");
      }
    }
  ])
  .controller('SearchResultDetailController', ['$scope', '$location', '$routeParams', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, SearchService, SearchResultsService) {
      $scope.result = SearchResultsService.find($routeParams.resultId);
      //$scope.results = SearchResultsService.results($routeParams.searchId);;
      //$scope.showResult = function(searchId, resultId) {
        //$location.path("/searches/" + searchId + "/results/" + resultId);
      //}
      $scope.back = function() {
        $location.path("/searches/" + $routeParams.searchId + "/results");
      }
    }
  ]);

