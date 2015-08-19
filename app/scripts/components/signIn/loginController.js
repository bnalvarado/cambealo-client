'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')
	.controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'SessionService',
		function($scope, $location, $rootScope, session) {
			/*
			 * If user is logged and try to access to login view, will redirect
			 * to the menu
			 */
			if (session.isLoggedIn()) {
				$location.path('/ingresar');
			}
			/*
			 * Declare scopes
			 */
			$scope.email = '';
			$scope.password = '';
			$scope.errorMessage = '';

			/**
			 * Function to validate the authentication user in API
			 * @type{Void}
			 */
			$scope.logIn = function() {
				/*
				 * Make request to the api to verificate if user exists and is authenticated
				 */
				session.logIn($scope.email, $scope.password, $scope,
					function(user) {
						if (user !== null) {
							$rootScope.loggedIn = true;
							$rootScope.$broadcast('changeUser', user);
							$location.path('/principal/usuario');
						}
					}, function(err) {
						console.log(err);
					});
				/*
				 * Function to remove authentication errors when user delete
				 * input(login or password) contents
				 */
				hideErrors();
			}

			/*
			 * Function to clean the authentication erros messages and clean
			 * from view
			 */
			function hideErrors() {
				/*
				 * Declare the inputs and the content
				 */
				var inputUser = $('#username');
				var inputPass = $('#password');
				var inputContent;

				/*
				 * If username input is clear
				 */
				inputUser.on('input', function(event) {
					inputContent = event.currentTarget.value;
					if (inputContent.length > 0) {
						return;
					}
					$scope.errorMessage = '';
				});
			}
		}
	]);