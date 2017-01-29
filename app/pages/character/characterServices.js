/**
 * @ngdoc service
 * @name starwarsApp.service:characterServices
 * @description
 * Service for the starwarsApp
 */
angular.module('starwarsApp').service('characterServices', [
	'$http', 
	'$q',
	function ($http, $q) {
		'use strict';

		/**
		 * @ngdoc function
		 * @name getCharacter
		 * @kind function
		 *
		 * @description Calls swapi API people endpoint to get the data of a specific character
		 * @returns {Promise} returns a promise
		 */
		this.getCharacter = function(id) {
			var deferred = $q.defer(),
			characterId = id;

			try {
				$http.get('http://swapi.co/api/people/' + characterId + '/')
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
		 * @name searchPeople
		 * @kind function
		 *
		 * @description Calls swapi API people endpoint to search
		 * @returns {Promise} returns a promise
		 */
		this.searchPeople = function(searchString) {
			var deferred = $q.defer();

			try {
				$http.get('http://swapi.co/api/people/?search=' + searchString)
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
