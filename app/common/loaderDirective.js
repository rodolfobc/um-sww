/**
 * @ngdoc directive
 * @name loader
 * 
 * @description
 * This directive replaces the content of an element with a loader, while its content is not ready yet
 *
 * @example
 *
 * <section loader="ctrl.content.ready">
 *
 *  <p>{{ctrl.item.name}}</p>
 * 
 * </section>
 * 
 */

angular.module('starwarsApp').directive('loader',
    function() {
        'use strict';

        var loadingStyle = 'loader--loading';

        return {
            replace: true,
            link: function ($scope, $elem, attrs) {
                var loaderElement = angular.element('<div class="loader"><img src="assets/img/spinner.gif"></div>');

                $elem.prepend(loaderElement);

                $scope.$watch(attrs.loader, function (isReady) {
                    $elem[isReady ? 'removeClass' : 'addClass'](loadingStyle);
                });
            }
        };
    }
);