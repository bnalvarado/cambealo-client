'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')

.controller('PrincipalCtrl', ['$scope', '$location', '$rootScope', 'SessionService', 'ProductsResource',
	function($scope, $location, $rootScope, session, productsResource) {
		/*
		 * if user is not logged redirect to the login
		 */
		if (!session.isLoggedIn()) {
			$location.path('/');
		}
		/*
		 * Get user
		 */
		var user = session.getCurrentUser();
		$scope.productSearch = '';
		$scope.products = [];
		getProducts();

		function getProducts() {
			var resource = productsResource.allProducts();
			resource.get(function(data) {
				if (data === null) {
					return;
				}
				showProducts(data.products);
			}, function(err) {
				alert('Fallo');
			});
		}

		$scope.searchProduct = function() {
			var resource = productsResource.search();
			resource.get({
				name: $scope.productSearch
			}, function(data) {
				if (data === null) {
					return;
				}
				showProducts(data.product);
			}, function(err) {
				alert('Fallo');
			});
		};

		function showProducts(data) {
			data.map(function(value) {
				if (session.isLoggedIn()) {
					if (value.user_id === session.getCurrentUser().id) {
						return;
					}
				}
				$scope.products.push(value);
			});
		}
	}
]);