'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var craigSearchServices = angular.
  module('craigSearch.services', []).
  value('version', '0.1');

craigSearchServices.factory('SearchService', [
  function() {
    var storage = window.localStorage;
    var searches = null;

    return {
      //
      // Public Methods
      //
      savedSearches: function() {
        if(!searches) {
          searches = this._fetchSearches();
        }

        return searches;
      },
      find: function(searchId) {
        var found = null;
        angular.forEach(this._fetchSearches(), function(search) {
          if(search.id == searchId) {
            found = search;
          }
        });
        return found;
      },
      addSearch: function(query) {
        this._createSearch({
          id: this._generateId(),
          query: this._cleanseQuery(query),
          location: "Minneapolis, MN",
          unreadCount: 0,
          results: []
        });
      },
      isValidQuery: function(query) {
        if(!query || query.trim() === "") { return false; }

        var cleansedQuery = this._cleanseQuery(query);
        var duplicateQuery = false;
        angular.forEach(searches, function(search) {
          if(search.query === cleansedQuery) {
            duplicateQuery = true;
          }
        });

        return !duplicateQuery;
      },
      //
      // Private Methods
      //
      _createSearch: function(search) {
        searches.push(search);
        storage.setItem("SearchService-data", JSON.stringify(searches));
      },
      _fetchSearches: function() {
        if(!storage.getItem("SearchService-data")) {
          this._loadDefaultSearches();
        }
        return JSON.parse(storage.getItem("SearchService-data"));
      },
      _generateId: function() {
        // Yanked from http://jsfiddle.net/briguy37/2MVFd/
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
      },
      _loadDefaultSearches: function() {
        var serializedSearch = '[' +
          '{ "id": "' + this._generateId() + '", "query": "m3", "location": "Minneapolis, MN", "unreadCount": 10},' +
          '{ "id": "' + this._generateId() + '", "query": "ferrari", "location": "Minneapolis, MN", "unreadCount": 5},' +
          '{ "id": "' + this._generateId() + '", "query": "lamborghini", "location": "Minneapolis, MN", "unreadCount": 8}' +
        ']';
        storage.setItem("SearchService-data", serializedSearch);
      },
      _cleanseQuery: function(query) {
        return query.replace(/ +(?= )/g,'').toLowerCase();
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
