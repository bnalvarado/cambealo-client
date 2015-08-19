'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')
	.controller('PerfilCtrl', ['$scope', '$location', '$rootScope', 'SessionService', 'ProductsResource',
		function($scope, $location, $rootScope, session, productsResource) {
			/*
			 * If user is logged and try to access to login view, will redirect
			 * to the menu
			 */
			if (!session.isLoggedIn()) {
				$location.path('#/ingresar');
			}

			$scope.userId = session.getCurrentUser().id;

			$scope.products = {};

			getProducts();

			$scope.deleteProduct = function(productId) {
				var ids = {
					user_id: $scope.userId,
					id: productId
				}
				var resource = productsResource.delete();
				resource.delete(ids, function(data) {
					if (data === null) {
						return;
					}
					if (data.deleted) {
						removeProduct(productId);
						alert('Eliminado con éxito');
					}
				}, function(err) {
					alert('Fallo');
				});
			}

			function removeProduct(id) {
				var products = $scope.products;
				$scope.products = [];
				products.map(function(product) {
					if (product.id === id) {
						return;
					}
					$scope.products.push(product);
				});
			}

			function getProducts() {
				var resource = productsResource.index();
				resource.get({
					user_id: $scope.userId
				}, function(data) {
					if (data === null) {
						return;
					}
					$scope.products = data.products;
				}, function(err) {
					alert('Fallo');
				});
			}
		}
	]);