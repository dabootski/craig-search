'use strict';

/* Controllers */

angular.module('craigSearch.controllers', [])

  //
  // SearchesController
  //
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
        if(SearchService.isValidQuery($scope.newSearchQuery)) {
          $scope.addModeActivated = false;
          SearchService.addSearch($scope.newSearchQuery);
          $scope.newSearchQuery = "";
          // Force keyboard to hide by blurring input
          document.getElementById("new-search").blur();
        }
      }
      $scope.addModeActivated = false;
      $scope.newSearchQuery = "";
      $scope.newSearchStatus = function() {
        if(SearchService.isValidQuery($scope.newSearchQuery)) {
          return "valid";
        } else {
          return "invalid";
        }
      }
    }
  ])

  //
  // SearchResultsController
  //
  .controller('SearchResultsController', ['$scope', '$location', '$routeParams', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, SearchService, SearchResultsService) {
      $scope.search = SearchService.find($routeParams.searchId);
      $scope.results = SearchResultsService.results($routeParams.searchId);;
      $scope.showResult = function(searchId, resultId) {
        $location.path("/searches/" + searchId + "/results/" + resultId);
      }
      $scope.navigateBack = function() {
        $location.path("/searches");
      }
    }
  ])

  //
  // SearchResultDetailController
  //
  .controller('SearchResultDetailController', ['$scope', '$location', '$routeParams', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, SearchService, SearchResultsService) {
      $scope.result = SearchResultsService.find($routeParams.resultId);
      $scope.back = function() {
        $location.path("/searches/" + $routeParams.searchId + "/results");
      }
    }
  ])

  //
  // NewSearchController
  //
  .controller('NewSearchController', ['$scope', '$location', 'SearchService',
    function($scope, $location, SearchService) {
      //$scope.result = SearchResultsService.find($routeParams.resultId);
      $scope.back = function() {
        $location.path("/searches");
      }
    }
  ]);

