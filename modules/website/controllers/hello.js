/**
 * @name website.controllers:hello
 */
angular.module('website')
  .controller('Hello',['$scope', '$timeout'
  , function ($scope, $timeout) {
    $scope.showbox = false;
    $timeout(function () {
      $scope.showbox = true;
    },1000);
  }]);
