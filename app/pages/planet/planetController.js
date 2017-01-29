/**
 * @ngdoc function
 * @name starwarsApp.controller:planetCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('planetCtrl', [
	'$scope', 
	'$routeParams', 
	'planetServices', 
	function($scope, $routeParams, planetServices) {
		'use strict';

		var self = this;
		var planetId = $routeParams.id;

		self.contentState = {
			ready: false
		};

		planetServices
		.getPlanet(planetId)
			.then(function(response) {
				if (response) {
					self.planet = response;
					self.contentState.ready = true;
				}
				
			}).catch(function(error) {

				self.throwError = true;

			});

	}
]);