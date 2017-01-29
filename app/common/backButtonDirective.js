/**
 * @ngdoc directive
 * @name backButton
 * 
 * @description
 * This directive turns a link element into a back button.
 *
 * @example
 *
 * <a back-button>Back</a>
 * 
 */
angular.module('starwarsApp').directive('backButton', [
	'$window', 
	function($window) {
	    return {
	        restrict: 'A',
	        link: function ($scope, $elem, attrs) {
	            $elem.on('click', function () {
	                $window.history.back();
	            });
	        }
	    };
	}
]);