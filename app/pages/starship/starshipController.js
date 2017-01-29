/**
 * @ngdoc function
 * @name starwarsApp.controller:starshipCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('starshipCtrl', [
	'$scope', 
	'$routeParams', 
	'starshipServices', 
	function($scope, $routeParams, starshipServices) {
		'use strict';

		var self = this,
		starshipId = $routeParams.id;

		self.contentState = {
			ready: false
		};
		
		self.starship = {};

		starshipServices
		.getStarship(starshipId)
			.then(function(response) {
				if (response) {
					self.starship = response;
					self.contentState.ready = true;
				}

			});
	}
]);