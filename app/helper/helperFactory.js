/**
 * @ngdoc factory
 * @name starwarsApp.factory:helper
 * @description
 * Helper functions for starwarsApp
 */
angular.module('starwarsApp').factory('helper', 
    function helper() {
        'use strict';

        var factory = {};

        /**
         * @ngdoc function
         * @name extractUrlIdFromUrl
         * @kind function
         *
         * @description Given an url, it extracts the id of the item from it
         * @returns {Object} returns an object
         */
        factory.extractUrlIdFromUrl = function(url) {
            var currentUrl = url,
                tempUrl = '',
                response = {
                    id: 0
                };

            tempUrl = currentUrl.slice(0, -1);

            return response.id = tempUrl.substr(tempUrl.lastIndexOf('/') + 1)
        };

        return factory;
    }
);