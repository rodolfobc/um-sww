/**
 * @ngdoc function
 * @name starwarsApp.controller:mainCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('mainCtrl', [
	'$scope', 
	'$location', 
	'mainServices', 
	'helper',
	function($scope, $location, mainServices, helper) {
		'use strict';

		var self = this;

		self.contentState = {
			ready: false
		};

		/**
		 * @ngdoc function
		 * @name goToCharacter
		 * @kind function
		 *
		 * @description Redirects to the clicked character route
		 */
		self.goToCharacter = function(url) {
			var characterId = helper.extractUrlIdFromUrl(url);
			$location.path( '/character/' + characterId );
		};

		mainServices
		.getData()
			.then(function(response) {
				if (response.count) {
					self.charactersList = response.results;
					self.contentState.ready = true;
				}

			})
			.catch(function(error) {
				self.throwError = true;
			});

	}
]);