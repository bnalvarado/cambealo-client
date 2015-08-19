'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')
	.controller('CrudUserCtrl', ['$scope', '$location', '$routeParams', 'SessionService', 'UserAdminResource',
		function($scope, $location, $routeParams, session, userAdminResource) {
			/*
			 * if user is not logged redirect to the login
			 */
			if (!session.isLoggedIn() && $location.$$path !== '/registrar') {
				$location.path('/');
			}

			$scope.user = {
				first_name: '',
				last_name: '',
				password: '',
				confirmPassword: '',
				email: '',
				phone: null,
				age: null
			}

			$scope.showCreate = true;
			$scope.showUpdate = false;
			$scope.showPasswords = true;

			if ($routeParams.id) {
				$scope.showCreate = false;
				$scope.showPasswords = false;
				$scope.showUpdate = true;
				$scope.id = $routeParams.id;
				getUserData();
			}

			$scope.saveUser = function() {
				var data = {
					first_name: $scope.user.first_name,
					last_name: $scope.user.last_name,
					password: $scope.user.password,
					email: $scope.user.email,
					phone: $scope.user.phone,
					age: $scope.user.age
				}
				var resource = userAdminResource.create();
				resource.post(data, function(data) {
					debugger;
					if (data === null) {
						return;
					}
					if (data.created) {
						alert('Creado con exito');
						$location.path('/ingresar');
					}
				}, function(err) {
					alert('Fallo');
				});
			}

			$scope.updateUser = function() {
				var data = {
					id: $scope.id,
					first_name: $scope.user.first_name,
					last_name: $scope.user.last_name,
					email: $scope.user.email,
					phone: $scope.user.phone,
					age: $scope.user.age
				}
				var resource = userAdminResource.update();
				resource.put(data, function(data) {
					if (data === null) {
						return;
					}
					if (data.updated) {
						session.setCurrentUser(data.user);
						alert('Editado con exito');
						$location.path('#/principal/usuario');
					}
				}, function(err) {
					logger.logError(err.data.message);
				});
			}

			function getUserData() {
				var resource = userAdminResource.show();
				resource.get({
					id: $scope.id
				}, function(data) {
					if (data === null) {
						return;
					}
					if (data.user) {
						$scope.user = {
							first_name: data.user.first_name,
							last_name: data.user.last_name,
							password: '',
							confirmPassword: '',
							email: data.user.email,
							phone: data.user.phone,
							age: data.user.age
						}
					}
				}, function(err) {
					alert('Fallo obtención de data');
				});
			}
		}
	]);