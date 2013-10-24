/**
 * @name website.controllers:hello
 */
angular.module('website')
  .controller('Hello',['$scope', '$routeParams'
  , function ($scope, $routeParams) {
    $scope.name = $routeParams.name || undefined;
  }]);
