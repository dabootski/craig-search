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

