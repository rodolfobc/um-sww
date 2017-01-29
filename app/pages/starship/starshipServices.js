/**
 * @ngdoc service
 * @name starwarsApp.service:starshipServices
 * @description
 * Service for the starwarsApp
 */
angular.module('starwarsApp').service('starshipServices', [
	'$http', 
	'$q',
	function($http, $q) {
		'use strict';

		/**
		 * @ngdoc function
		 * @name getStarship
		 * @kind function
		 *
		 * @description Calls swapi API starship endpoint to get the data of a specific starship
		 * @returns {Promise} returns a promise
		 */
		this.getStarship = function(id) {
			var deferred = $q.defer(),
			starshipId = id;

			try {
				$http.get('http://swapi.co/api/starships/' + starshipId + '/')
					.then(function (response) {
						deferred.resolve(response.data);
				    });				
			}
			catch(error) {
				deferred.reject(error);
			}

			return deferred.promise;
		};

		/**
		 * @ngdoc function
		 * @name searchStarships
		 * @kind function
		 *
		 * @description Calls swapi API planets endpoint to search
		 * @returns {Promise} returns a promise
		 */
		this.searchStarships = function(searchString) {
			var deferred = $q.defer();

			try {
				$http.get('http://swapi.co/api/starships/?search=' + searchString)
					.then(function (response) {
						deferred.resolve(response.data);
				    });				
			}
			catch(error) {
				deferred.reject(error);
			}

			return deferred.promise;
		};
	}
]);
