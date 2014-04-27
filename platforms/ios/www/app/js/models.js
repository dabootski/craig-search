'use strict';

var models = angular.
  module('craigSearch.models', []).
  value('version', '0.1');

models.factory('SearchResult', [function() {
  function SearchResult(resultData) {
    if (resultData) {
      this.setData(resultData);
    }
  };

  SearchResult.prototype = {
    setData: function(resultData) {
      angular.extend(this, resultData);
    },
    postedAt: function() {
      return new Date(this.posted_at);
    }
  };

  return SearchResult;
}]);
