/**
 * @ngdoc directive
 * @name website.directives:backgrounds
 * @description
 * ...
 */
angular.module('website')
  .directive('backgrounds', ['$timeout', function ($timeout) {

    return {
      priority: 0,
      restrict: 'E',
      template: ''
        +'<img ng-repeat="bg in backgrounds" src="{{bg.url}}" class="intro" ng-class="{\'active\': bg.id===$parent.active}">'
      , link: function(scope, element, attr) {
        scope.backgrounds = [1,2,3,4,5,6,7,8,9].map(function (id) {
          return {url: '/build/website/images/'+id+'.jpg', id: id};
        });

        function newActive (time) {
          time = time || 0;
          $timeout(function () {
            scope.active = Math.floor((Math.random()*scope.backgrounds.length))+1
            scope.active = scope.active%scope.backgrounds.length;
            console.log("new image", scope.active);
          }, time);
        }

        newActive(1000);

        setInterval(function () {
          newActive();  
        },10000);
      }
    }
  }
]);