'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')
	.controller('ProductsCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'SessionService', 'ProductsResource',
		function($scope, $location, $rootScope, $routeParams, session, productsResource) {
			/*
			 * If user is logged and try to access to login view, will redirect
			 * to the menu
			 */
			if (!session.isLoggedIn()) {
				$location.path('#/ingresar');
			}

			$scope.showCreate = true;
			$scope.showUpdate = false;

			var userId = session.getCurrentUser().id;
			var productId = '';

			$scope.product = {
				name: '',
				description: '',
				picture: '',
				status: 'activo'
			}

			if ($routeParams.id) {
				$scope.showCreate = false;
				$scope.showUpdate = true;
				productId = $routeParams.id;
				getData();
			}

			$scope.createProduct = function() {
				var product = {
					user_id: userId,
					product_name: $scope.product.name,
					description: $scope.product.description,
					picture: $scope.product.picture,
					status: $scope.product.status,
					register_date: todayDate()
				}
				var resource = productsResource.create();
				resource.post(product, function(data) {
					if (data === null) {
						return;
					}
					if (data.created) {
						alert('Creado con exito');
						$location.path('#/principal/usuario');
						return;
					}
				}, function(err) {
					alert('Fallo');
				});
			}

			$scope.updateProduct = function() {
				var product = {
					user_id: userId,
					id: productId,
					product_name: $scope.product.name,
					description: $scope.product.description,
					picture: $scope.product.picture,
					status: $scope.product.status
				}
				var resource = productsResource.update();
				resource.put(product, function(data) {
					if (data === null) {
						return;
					}
					if (data.updated) {
						alert('Editado con exito');
						$location.path('#/principal/usuario');
						return;
					}
				}, function(err) {
					alert('Fallo');
				});
			}

			function getData() {
				var ids = {
					user_id: userId,
					id: productId
				}
				var resource = productsResource.show();
				resource.get(ids, function(data) {
					if (data === null) {
						return;
					}
					if (data.product) {
						$scope.product.name = data.product.product_name;
						$scope.product.description = data.product.description;
						$scope.product.picture = data.product.picture;
						$scope.product.status = data.product.status;
						$('#imgProduct').attr("src", $scope.product.picture);
					}
				}, function(err) {
					alert('Fallo');
				});
			}

			function todayDate() {
				var date = new Date();
				var currentMonth = (date.getMonth() + 1).toString();
				var currentDay = date.getDate().toString();
				var today = date.getFullYear().toString() + "-";
				if (currentMonth < 10) {
					currentMonth = '0' + currentMonth + "-";
				}
				if (currentDay < 10) {
					currentDay = '0' + currentDay;
				}
				today += currentMonth + currentDay;
				return today;
			}

			function readImage(input) {
				if (input.files && input.files[0]) {
					var FR = new FileReader();
					FR.onload = function(e) {
						$('#imgProduct').attr("src", e.target.result);
						$scope.product.picture = e.target.result;
					};
					FR.readAsDataURL(input.files[0]);
				}
			}

			$("#picture").change(function() {
				readImage(this);
			});
		}
	]);