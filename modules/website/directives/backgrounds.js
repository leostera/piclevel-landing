/**
 * @ngdoc directive
 * @name website.directives:backgrounds
 * @description
 * ...
 */
angular.module('website')
  .directive('backgrounds',['$scope', function ($scope) {

    var backgrounds = [1,2,3,4,5,6,7,8,9];

    return {
      priority: 0,
      restrict: 'E',
      link: function(scope, element, attr) {

    };
  }
]);