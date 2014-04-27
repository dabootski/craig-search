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
      find: function(query) {
        var found = null;
        angular.forEach(this._fetchSearches(), function(search) {
          if(search.query == query) {
            found = search;
          }
        });
        return found;
      },
      addSearch: function(query) {
        var search = {
          id: this._generateId(),
          query: this._cleanseQuery(query),
          location: "Minneapolis, MN",
          unreadCount: 0,
          results: []
        };
        this._createSearch(search);
        return search;
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

craigSearchServices.factory('SearchResultsService',
  ["$http", "$q", "SearchResult",
  function($http, $q, SearchResult) {
    var cachedResults = {};
    var storage = window.localStorage;
    // See: http://stackoverflow.com/questions/17756550/angularjs-cors-issues
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];

    return {
      //
      // Public methods
      //
      results: function(query) {
        var searchUrl = 'http://localhost:3000/searches/' + encodeURIComponent(query) + '/results.json?callback=JSON_CALLBACK';
        var deferred = $q.defer();

        if(cachedResults[query]) {
          deferred.resolve(cachedResults[query]);
        } else {
          $http.jsonp(searchUrl).then(function(result) {
            var resultObjs = [];
            angular.forEach(result.data, function(resultData){
              this.push(new SearchResult(resultData));
            }, resultObjs);

            console.log("RESULTS: ");
            console.log(resultObjs);

            cachedResults[query] = resultObjs;
            deferred.resolve(resultObjs);
          });
        }

        return deferred.promise;
      },
      find: function(query, resultId) {
        var found = null;
        var foundResults = null;
        var deferred = $q.defer();

        this.results(query).then(function(fetchedResults) {
          angular.forEach(fetchedResults, function(result) {
            if(result.id == resultId) { deferred.resolve(result) }
          });
        });

        return deferred.promise;
      },
    };
  }
]);
