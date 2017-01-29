/**
 * @ngdoc directive
 * @name deleteFromListSection
 * 
 * @description
 * This directive manipulates the delete item from list section
 *
 * @example
 *
 *	<div delete-from-list-section>
 *					
 *		<button class="btn-icon btn-icon--remove"><span class="glyphicon glyphicon-remove-sign"></span></button>
 *
 *		<div class="list-delete-container">
 *			
 *			<p>Are you sure you want to remove {{item.name}} from your favourites?</p>
 *
 *			<button class="btn-default btn-default--danger" ng-click="ctrl.removeItem(item.id)">Yes, remove</button>
 *
 *			<button class="btn-default btn-default--neutral" ng-click="">Cancel</button>
 *
 *		</div>
 *
 *	</div>
 *
 * 
 */
angular.module('starwarsApp').directive('deleteFromListSection',  
	function() {
	    return {
	        restrict: 'A',
	        link: function (scope, $elem, attrs) {
	        	var deleteButton = angular.element($elem[0].querySelector('.btn-icon--remove')),
	        		deleteActionsContainer = angular.element($elem[0].querySelector('.list-delete-container')),
	        		cancelDeleteButton = angular.element($elem[0].querySelector('.btn-default--neutral'));

	            deleteButton.on('click', function () {
	            	var parentElement = $elem.parent();
	                angular.element(parentElement[0].querySelector('.list-delete-container')).addClass('active');
	            });

	            cancelDeleteButton.on('click', function () {
	            	deleteActionsContainer.removeClass('active');
	            });
	        }
	    };
	}
);