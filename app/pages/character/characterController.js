/**
 * @ngdoc function
 * @name starwarsApp.controller:characterCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('characterCtrl', [
	'$scope',
	'$routeParams',
	'$location',
	'characterServices',
	'planetServices',
	'starshipServices',
	'favouritesServices',
	'helper',
	function($scope, $routeParams, $location, characterServices, planetServices, starshipServices, favouritesServices, helper) {
		'use strict';

		var self = this,
		characterId = $routeParams.id;

		/**
		 * @ngdoc function
		 * @name fillCharaterInfo
		 * @kind function
		 *
		 * @description Sets the character data to the scope character object
		 * @returns {Object} returns an object
		 */
		function fillCharaterInfo (characterInfo) {
	        if (characterInfo) {
	            self.character = characterInfo;
	        }

	        return characterInfo;
	    }

	    /**
		 * @ngdoc function
		 * @name fillCharacterPlanetInfo
		 * @kind function
		 *
		 * @description Sets the character's planet data to the scope planet object
		 * @returns {Object} returns an object
		 */
	    function fillCharacterPlanetInfo(character) {
			var homeworldId = helper.extractUrlIdFromUrl(character.homeworld);

			self.planetId.value = homeworldId;

			return planetServices
			.getPlanet(homeworldId)
				.then(function(response) {
				   if (response) {
				       self.planetInfo = response;
				   }

				   return character;
				});
		}

	    /**
		 * @ngdoc function
		 * @name fillStarShipsInfo
		 * @kind function
		 *
		 * @description Sets the character's starships data to the scope starships object
		 * @returns {Object} returns an object
		 */
		function fillStarShipsInfo (data) {
		    var starshipsList = data.starships,
		    numberItems = 0,
		    listLength = starshipsList.length;

		    if (listLength > 0) {
		        starshipsList.forEach(function(starship) {
		            var starshipData = starship,
		            starshipId = helper.extractUrlIdFromUrl(starshipData);

		            starshipServices
		            .getStarship(starshipId)
			            .then(function(response) {
			                if (response) {
			                    self.starshipsInfo[self.starshipsInfo.length] = response;
			                    numberItems++;
			                    if (numberItems === listLength) {
			                        self.contentState.ready = true;
			                    }

			                }
			            })
			            .catch(function(error) {
							self.throwError = true;
						});
		        });
		    } else {
		    	self.starshipsListState.empty = true;
		        self.contentState.ready = true;
		    }
		}

		self.contentState = {
			ready: false
		};
		
		self.character = {};
		self.planetId = {};
		self.planetInfo = {};
		self.starshipsInfo = [];
		self.isFavourite = false;
		self.favouritesList = {};
		self.starshipsListState = {
			empty: false
		};

		/**
		 * @ngdoc function
		 * @name goToPlanet
		 * @kind function
		 *
		 * @description Redirects to the clicked planet route
		 */
		self.goToPlanet = function(id) {
			$location.path( '/planet/' + id );
		};

		/**
		 * @ngdoc function
		 * @name goToStarship
		 * @kind function
		 *
		 * @description Redirects to the clicked starship route
		 */
		self.goToStarship = function(url) {
			var characterId = helper.extractUrlIdFromUrl(url);

			$location.path( '/starship/' + characterId );
		};

		/**
		 * @ngdoc function
		 * @name saveFavourite
		 * @kind function
		 *
		 * @description Saves the character as a favourite
		 */
		self.saveFavourite = function(data) {
			var character = data,
			favouriteData = {},
			characterId = helper.extractUrlIdFromUrl(character.url);

			favouriteData.id = characterId;
			favouriteData.name = character.name;
			favouriteData.url = character.url;

			favouritesServices
			.saveFavourite(favouriteData)
				.then(function(response) {
					if (response.success && response.success === true) {
						self.isFavourite = true;
					}

				})
				.catch(function(error) {
					self.throwError = true;
				});
		};

		/**
		 * @ngdoc function
		 * @name removeFavourite
		 * @kind function
		 *
		 * @description Removes character from the favourites list
		 */
		self.removeFavourite = function(data) {
			var character = data,
			characterId = helper.extractUrlIdFromUrl(character.url);

			favouritesServices
			.removeFavourite(characterId)
				.then(function(response) {
					if (response.success === true) {
						self.isFavourite = false;
					}

				}).catch(function(error) {
					self.throwError = true;
				});
		};

		characterServices
		.getCharacter(characterId)
			.then(fillCharaterInfo)
			.then(fillCharacterPlanetInfo)
			.then(fillStarShipsInfo)
			.catch(function(error) {
				self.throwError = true;
			});

		favouritesServices
		.getFavourites()
			.then(function(response) {
				self.favouritesList = response;
				if (self.favouritesList[characterId]) {
					self.isFavourite = true;
				}

			})
			.catch(function(error) {
				self.throwError = true;
			});

	}
]);