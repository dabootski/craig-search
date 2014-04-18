'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var craigSearchServices = angular.
  module('craigSearch.services', []).
  value('version', '0.1');

craigSearchServices.factory('SearchService', [
  function() {
    var searches = [
      { id: 1, query: "M3", location: "Minneapolis, MN", count: 10},
      { id: 2, query: "M3", location: "Eau Claire, WI", count: 2},
      { id: 3, query: "Ferrari", location: "Minneapolis, MN", count: 5},
      { id: 4, query: "Lamborghini", location: "Minneapolis, MN", count: 8},
    ];

    return {
      savedSearches: function() {
        return searches;
      },
      find: function(searchId) {
        var found = null;

        angular.forEach(searches, function(search) {
          if(search.id == searchId) {
            found = search;
          }
        });

        return found;
      }
    };
  }
]);

craigSearchServices.factory('SearchResultsService', [
  function() {
    var results = [
      { id: 1, searchId: 1, title: "BMW Steering Wheel Multifunction Complete W/ Air Bag 528i 540i 740i X5", description: "Located in Minneapolis, MN", date: "04/18", price: "$4000"},
      { id: 2, searchId: 2, title: "2003 BMW m3 convertible 6sp", description: "Located in Eau Claire, WI", date: "04/17", price: "$1000"},
      { id: 3, searchId: 3, title: "Bmw 325i M3 chassis", description: "Located in Minneapolis, MN", date: "04/13", price: "$40000"},
      { id: 4, searchId: 4, title: "BMW E90 3 Series 325i 325xi Rear Bumper/Impact Bar - BLACK", description: "Located in Minneapolis, MN", date: "04/08", price: "$24000"},
    ];

    return {
      results: function(searchId) {
        return results;
      },
      find: function(resultId) {
        var found = null;

        angular.forEach(results, function(result) {
          if(result.id == resultId) {
            found = result;
          }
        });

        return found;
      }
    };
  }
]);
