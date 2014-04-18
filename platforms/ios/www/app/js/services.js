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
      { id: 1, name: "M3", queries: ["m3"] },
      { id: 2, name: "Ferrari", queries: ["ferrari", "ferari"]  }
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

