/**
 * @ngdoc function
 * @name starwarsApp.controller:favouritesCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('favouritesCtrl', [
	'$scope', 
	'$routeParams', 
	'$location', 
	'favouritesServices', 
	function($scope, $routeParams, $location, favouritesServices) {
		'use strict';

		var self = this;

		self.contentState = {
			ready: false
		};

		self.favouritesListState = {
			empty: false
		};

		favouritesServices
		.getFavourites()
			.then(function(response) {
				self.favourites = response;

				if (angular.equals({}, self.favourites)) {
					self.favouritesListState.empty = true;
				}

				self.contentState.ready = true;
			}).catch(function(error) {
				self.throwError = true;
			});

		/**
		 * @ngdoc function
		 * @name removeFavourite
		 * @kind function
		 *
		 * @description Removes character from the favourites list
		 */
		self.removeFavourite = function(id) {
			favouritesServices
			.removeFavourite(id)
				.then(function(response) {
					if (response.success === true) {
						self.favourites = response.data;
					}

					if (angular.equals({}, self.favourites)) {
						self.favouritesListState.empty = true;
					}

				}).catch(function(error) {
					self.throwError = true;
				});
		};

		/**
		 * @ngdoc function
		 * @name goToCharacter
		 * @kind function
		 *
		 * @description Redirects to the clicked character route
		 */
		self.goToCharacter = function(id) {
			$location.path( '/character/' + id );
		};

	}
]);