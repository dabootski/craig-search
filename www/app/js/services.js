'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var craigSearchServices = angular.
  module('craigSearch.services', []).
  value('version', '0.1');

craigSearchServices.factory('SearchService', [
  function() {
    var serializedSearch = '[' +
      '{ "id": 1, "query": "M3", "location": "Minneapolis, MN", "unreadCount": 10},' +
      '{ "id": 2, "query": "M3", "location": "Eau Claire, WI", "unreadCount": 2},' +
      '{ "id": 3, "query": "Ferrari", "location": "Minneapolis, MN", "unreadCount": 5},' +
      '{ "id": 4, "query": "Lamborghini", "location": "Minneapolis, MN", "unreadCount": 8}' +
    ']';
    var storage = window.localStorage;
    if(!storage.getItem("SearchService-data")) {
      console.log("INITIALIZING SearchService DATA!!!");
      storage.setItem("SearchService-data", serializedSearch);
    }

    console.log(storage.getItem("SearchService-data"));
    //var searches = [];
    var searches = JSON.parse(storage.getItem("SearchService-data"));

    return {
      //
      // Public Methods
      //
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
      },
      nextId: 5,
      addSearch: function(query) {
        console.log("ADDING NEW SEARCH: " + query);
        searches.push({
          id: this.nextId,
          query: query,
          location: "Minneapolis, MN",
          unreadCount: 0,
          results: []
        });
        this._syncSearches();
        this.nextId += 1;
      },
      //
      // Private Methods
      //
      _syncSearches: function() {
        console.log("SYNCHING SEARCHES");
        storage.setItem("SearchService-data", JSON.stringify(searches));
      }
    };
  }
]);

craigSearchServices.factory('SearchResultsService', [
  function() {
    var results = [
      { id: 1, searchId: 1, title: "BMW Steering Wheel Multifunction Complete W/ Air Bag 528i 540i 740i X5", description: "Located in Minneapolis, MN", date: "04/18", price: "$4000"},
      { id: 2, searchId: 1, title: "2003 BMW m3 convertible 6sp", description: "Located in Eau Claire, WI", date: "04/17", price: "$1000"},
      { id: 3, searchId: 2, title: "Bmw 325i M3 chassis", description: "Located in Minneapolis, MN", date: "04/13", price: "$40000"},
      { id: 4, searchId: 2, title: "BMW E90 3 Series 325i 325xi Rear Bumper/Impact Bar - BLACK", description: "Located in Minneapolis, MN", date: "04/08", price: "$24000"},
      { id: 5, searchId: 3, title: "Ferrari 458 Italia", description: "Located in Minneapolis, MN", date: "04/18", price: "$4000"},
      { id: 6, searchId: 3, title: "Ferrari 430 Spider", description: "Located in Eau Claire, WI", date: "04/17", price: "$1000"},
      { id: 7, searchId: 4, title: "Lamorghini Diablo", description: "Located in Minneapolis, MN", date: "04/13", price: "$40000"},
      { id: 8, searchId: 4, title: "Lamorghini Aventador", description: "Located in Minneapolis, MN", date: "04/08", price: "$24000"},
    ];

    return {
      results: function(searchId) {
        var res = [];
        angular.forEach(results, function(result) {
          if(result.searchId == searchId) {
            res.push(result);
          }
        });
        return res;
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
