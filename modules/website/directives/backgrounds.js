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
        +'<div ng-repeat="bg in backgrounds"'
        +' class="background"'
        +' style="background: white url({{bg.url}}) no-repeat fixed center"'
        +' ng-if="bg.id===$parent.active"></div>'
      , link: function(scope, element, attr) {
        scope.backgrounds = [1,2,3,4,5,6,7,8,9].map(function (id) {
          return {url: '/build/website/images/'+id+'.jpg', id: id};
        });

        function newActive (time) {
          $timeout(function () {
            time = time || 500;
            last = scope.active || 0;
            console.log("Hiding",last, scope.active);
            scope.active = false;
            $timeout(function () {
              scope.active = (last+1)%scope.backgrounds.length+1;
              console.log("Showing",scope.active);
            }, time);
          });
        }

        newActive();

        setInterval(newActive, 5000);

      }
    }
  }
]);