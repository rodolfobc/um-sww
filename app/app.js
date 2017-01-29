'use strict';

angular.module('starwarsApp', [
	'ngRoute'
]).
config([
	'$routeProvider', 
	'$httpProvider',
	'$locationProvider',
	function($routeProvider, $httpProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'pages/main/main.html',
			controller: 'mainCtrl as mainCtrl'
		})
		.when('/character/:id', {
			templateUrl: 'pages/character/character.html',
			controller: 'characterCtrl as characterCtrl'
		})
		.when('/planet/:id', {
			templateUrl: 'pages/planet/planet.html',
			controller: 'planetCtrl as planetCtrl'
		})
		.when('/starship/:id', {
			templateUrl: 'pages/starship/starship.html',
			controller: 'starshipCtrl as starshipCtrl'
		})
		.when('/favourites', {
			templateUrl: 'pages/favourites/favourites.html',
			controller: 'favouritesCtrl as favouritesCtrl'
		})
		.when('/search', {
			templateUrl: 'pages/search/search.html',
			controller: 'searchCtrl as searchCtrl'
		})
		.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode(true);
	}
])
.run([
	'$http',
	'$cacheFactory',
	function($http, $cacheFactory) {
		$http.defaults.cache = $cacheFactory('lruCache', {capacity: 20});
	}
]);