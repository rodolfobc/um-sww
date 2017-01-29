/**
 * @ngdoc service
 * @name starwarsApp.service:favouritesServices
 * @description
 * Service for the starwarsApp
 */
angular.module('starwarsApp').service('favouritesServices', [
	'$http', 
	'$q',
	function($http, $q) {
		'use strict';

		/**
		 * @ngdoc function
		 * @name saveFavourite
		 * @kind function
		 *
		 * @description Saves character as favourite in localstorage
		 * @returns {Promise} returns a promise
		 */
		this.saveFavourite = function(data) {
			var deferred = $q.defer(),
			characterData = data,
			favourite = {
				name: characterData.name,
				url: characterData.url,
				id: characterData.id
			},
			favouriteList = JSON.parse(localStorage.getItem('favouriteList'));

			if (favouriteList === null) {
				favouriteList = {};
			}

			favouriteList[favourite.id] = favourite;

			localStorage.setItem('favouriteList', JSON.stringify(favouriteList));

			var response = {
				success: true
			};

			deferred.resolve(response);

			return deferred.promise;

		};

		/**
		 * @ngdoc function
		 * @name removeFavourite
		 * @kind function
		 *
		 * @description Removes character as favourite from localstorage
		 * @returns {Promise} returns a promise
		 */
		this.removeFavourite = function(id) {
			var deferred = $q.defer(),
			characterId = id,
			favouriteList = JSON.parse(localStorage.getItem('favouriteList'));

			delete favouriteList[id];

			localStorage.setItem('favouriteList', JSON.stringify(favouriteList));

			var response = {
				success: true,
				data: favouriteList
			};

			deferred.resolve(response);

			return deferred.promise;

		};

		/**
		 * @ngdoc function
		 * @name getFavourites
		 * @kind function
		 *
		 * @description Get favourites list from localstorage
		 * @returns {Promise} returns a promise
		 */
		this.getFavourites = function() {
			var deferred = $q.defer(),
			favouriteList = {};

			favouriteList = JSON.parse(localStorage.getItem('favouriteList'));

			if (favouriteList === null) {
				favouriteList = {};
			}

			deferred.resolve(favouriteList);

			return deferred.promise;
		};
	}
]);
