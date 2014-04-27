'use strict';

/* Controllers */

angular.module('craigSearch.controllers', [])

  //
  // SearchesController
  //
  .controller('SearchesController', ['$scope', '$location', 'SearchService',
    function($scope, $location, SearchService) {
      $scope.searches = SearchService.savedSearches();
      $scope.showResults = function(query) {
        $location.path("/searches/" + query + "/results");
      }
      $scope.showNewSearch = function() {
        $scope.addModeActivated = true;
        document.getElementById("new-search").click();
      }
      $scope.cancelNewSearch = function() {
        $scope.addModeActivated = false;
      }
      $scope.addNewSearch = function() {
        if(SearchService.isValidQuery($scope.newSearchQuery)) {
          $scope.addModeActivated = false;
          var search = SearchService.addSearch($scope.newSearchQuery);
          $scope.newSearchQuery = "";
          // Force keyboard to hide by blurring input
          document.getElementById("new-search").blur();
          $location.path("/searches/" + search.id + "/results");
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
  .controller('SearchResultsController', ['$scope', '$location', '$routeParams', '$anchorScroll', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, $anchorScroll, SearchService, SearchResultsService) {
      // Force page to scroll to top
      $location.hash('main');
      $anchorScroll();

      $scope.search = SearchService.find($routeParams.query);
      SearchResultsService.
        results($routeParams.query)
        .then(function(results) {
          $scope.results = results;
        });
      $scope.showResult = function(query, resultId) {
        $location.path("/searches/" + query + "/results/" + resultId);
      }
      $scope.navigateBack = function() {
        $location.path("/searches");
      }
    }
  ])

  //
  // SearchResultDetailController
  //
  .controller('SearchResultDetailController',
    ['$scope', '$location', '$routeParams', 'SearchService', 'SearchResultsService',
    function($scope, $location, $routeParams, SearchService, SearchResultsService) {
      console.log($routeParams.query);

      SearchResultsService.
        find($routeParams.query, $routeParams.resultId).
        then(function(result) {
          console.log("GOT RESULT:");
          console.log(result);
          $scope.result = result;
        });

      $scope.navigateBack = function() {
        $location.path("/searches/" + $routeParams.query + "/results");
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

