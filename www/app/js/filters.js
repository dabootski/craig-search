'use strict';

/* Filters */

angular.module('craigSearch.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('queriesDisplay', [function() {
    return function(queries) {
      return queries.join(", ");
    };
  }]).
  filter('unsafe', ['$sce', function($sce) {
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]);

