/**
 * @ngdoc service
 * @name starwarsApp.service:planetServices
 * @description
 * Service for the starwarsApp
 */
angular.module('starwarsApp').service('planetServices', [
	'$http', 
	'$q',
	function($http, $q) {
		'use strict';

		/**
		 * @ngdoc function
		 * @name getPlanet
		 * @kind function
		 *
		 * @description Calls swapi API planets endpoint to get the data of a specific planet
		 * @returns {Promise} returns a promise
		 */
		this.getPlanet = function(id) {
			var deferred = $q.defer(),
			planetId = id;

			try {
				$http.get('http://swapi.co/api/planets/' + planetId + '/')
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
		 * @name searchPlanets
		 * @kind function
		 *
		 * @description Calls swapi API planets endpoint to search
		 * @returns {Promise} returns a promise
		 */
		this.searchPlanets = function(searchString) {
			var deferred = $q.defer();

			try {
				$http.get('http://swapi.co/api/planets/?search=' + searchString)
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
