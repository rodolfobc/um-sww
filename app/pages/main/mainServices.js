/**
 * @ngdoc service
 * @name starwarsApp.service:mainServices
 * @description
 * Service for the starwarsApp
 */
angular.module('starwarsApp').service('mainServices', [
	'$http', 
	'$q',
	function($http, $q) {
		'use strict';

		/**
		 * @ngdoc function
		 * @name getData
		 * @kind function
		 *
		 * @description Calls swapi API people endpoint to get a list of characters
		 * @returns {Promise} returns a promise
		 */
		this.getData = function() {
			var deferred = $q.defer();

			try {
				$http.get('http://swapi.co/api/people/')
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
