'use strict';

/* Directives */

var app = angular.module('craigSearch.directives', []);

app.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

