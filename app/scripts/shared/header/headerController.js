'use strict';

angular.module('proyecto2App')

.controller('HeaderController', ['$scope', '$rootScope', 'SessionService',
	function($scope, $rootScope, SessionService) {
		/*
		 * Get the user from localstorage and set the loggedIn to false
		 */
		$scope.user = SessionService.getCurrentUser();
		$rootScope.loggedIn = false;

		/*
		 * If user is logged in, scope loggedIn change to true and
		 */
		if (SessionService.isLoggedIn()) {
			$rootScope.loggedIn = true;
		}

		/*
		 * signOut function to clear de localstorage and change the root scope
		 * loggedIn to false
		 */
		$scope.signOut = function() {
			$rootScope.loggedIn = false;
			SessionService.logOut();
		};

		$scope.$on('changeUser', function  (listener, data) {    
			$scope.user = SessionService.getCurrentUser();
		});
	}
]);