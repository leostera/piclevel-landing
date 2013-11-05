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
        +'<img ng-repeat="bg in backgrounds" src="{{bg.url}}" ng-if="bg.id===$parent.active">'
      , link: function(scope, element, attr) {
        scope.backgrounds = [1,2,3,4,5,6,7,8,9].map(function (id) {
          return {url: '/build/website/images/'+id+'.jpg', id: id};
        });

        function newActive (time) {
          $timeout(function () {
            time = time || 500;
            last = scope.active;
            console.log("Fading...", scope.active);
            scope.active = -1;
            $timeout(function () {
              do {
                scope.active = Math.floor((Math.random()*scope.backgrounds.length))+1
                scope.active = scope.active%scope.backgrounds.length+1;
              } while (last === scope.active);
              console.log("Showing...", scope.active);
            }, time);
          });
        }

        newActive();

        setInterval(newActive, 5000);

      }
    }
  }
]);