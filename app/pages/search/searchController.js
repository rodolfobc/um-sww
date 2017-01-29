/**
 * @ngdoc function
 * @name starwarsApp.controller:searchCtrl
 * @description
 * Controller of the starwarsApp
 */
angular.module('starwarsApp').controller('searchCtrl', [
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

		var self = this;

		self.searchString = '';
		self.contentState = {
			ready: true
		};
		self.noSearchError = false;
		self.resultsList = [];
		self.noResults = true;
		self.searchTypes = [{
				id: 'character',
				label: 'Characters'
			},
			{
				id: 'planet',
				label: 'Planets'
			},
			{
				id: 'starship',
				label: 'Starships'
			}
		];

		self.selectedSearchType = self.searchTypes[0];

	    /**
		 * @ngdoc function
		 * @name createSearchResults
		 * @kind function
		 *
		 * @description Takes the response from the search api and puts it into an object
		 */
	    function createSearchResults(results) {

	    	if (results.length === 0) {

	    		self.noResults = true;

	    	} else {

	    		results.forEach(function(result) {
	    			self.resultsList[self.resultsList.length] = {
	    				name: result.name,
	    				url: result.url
	    			}
	    		});

	    		self.noResults = false;

	    	}

	    	self.contentState.ready = true;
	        
		}

		/**
		 * @ngdoc function
		 * @name submitSearch
		 * @kind function
		 *
		 * @description Calls the correct api endpoint to search for results
		 * @returns {Object} returns an object
		 */
		self.submitSearch = function(searchString) {
			if (searchString === '') {

				self.noSearchError = true;

			} else {

				var currentsearchType = self.selectedSearchType.id;

				self.noSearchError = false;
				self.contentState.ready = false;
				self.resultsList = [];

				if (currentsearchType === 'character') {
					characterServices
					.searchPeople(searchString)
						.then(function(response) {						
							createSearchResults(response.results);
						})
						.catch(function(error) {
							self.throwError = true;
						});

				} else if (currentsearchType === 'planet') {
					planetServices
					.searchPlanets(searchString)
						.then(function(response) {			
							createSearchResults(response.results);
						})
						.catch(function(error) {
							self.throwError = true;
						});

				} else if (currentsearchType === 'starship') {
					starshipServices
					.searchStarships(searchString)
						.then(function(response) {					
							createSearchResults(response.results);
						})
						.catch(function(error) {
							self.throwError = true;
						});

				}

			}

	    };

	    self.goToResult = function(url) {
	    	var id = helper.extractUrlIdFromUrl(url);

	    	$location.path( '/' + self.selectedSearchType.id + '/' + id );

	    };
	}
]);