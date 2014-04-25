'use strict';

/* Controllers */

angular.module('craigSearch.controllers', [])
  .controller('SearchesController', ['$scope', '$location', 'SearchService',
    function($scope, $location, SearchService) {
      $scope.searches = SearchService.savedSearches();
      $scope.showResults = function(searchId) {
        $location.path("/searches/" + searchId + "/results");
      }
      $scope.showNewSearch = function() {
        $scope.addModeActivated = true;
      }
      $scope.cancelNewSearch = function() {
        $scope.addModeActivated = false;
      }
      $scope.addNewSearch = function() {
        $scope.addModeActivated = false;
        SearchService.addSearch($scope.newSearchQuery);
        // Force keyboard to hide by blurring input
        document.getElementById("new-search").blur();
      }
      $scope.addModeActivated = false;
      $scope.newSearchQuery = "";
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
      $scope.back = function() {
        $location.path("/searches/" + $routeParams.searchId + "/results");
      }
    }
  ])
  .controller('NewSearchController', ['$scope', '$location', 'SearchService',
    function($scope, $location, SearchService) {
      //$scope.result = SearchResultsService.find($routeParams.resultId);
      $scope.back = function() {
        $location.path("/searches");
      }
    }
  ]);

