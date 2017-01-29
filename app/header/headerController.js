/**
 * @ngdoc function
 * @name starwarsApp.controller:headerCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('headerCtrl', [
	'$scope', 
	function($scope) {
		'use strict';

		var self = this;

		/**
		 * @ngdoc function
		 * @name toggleMenu
		 * @kind function
		 *
		 * @description Open and close mobile menu
		 */
		self.toggleMenu = function() {
			self.isMainNavActive = !self.isMainNavActive;
		}
	}
]);