'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('proyecto2App')
	.controller('TransactionCtrl', ['$scope', '$location', '$routeParams', 'SessionService', 'TransactionResource', 'ProductsResource',
		function($scope, $location, $routeParams, session, transactionResource, productsResource) {
			/*
			 * If user is logged and try to access to login view, will redirect
			 * to the menu
			 */
			if (!session.isLoggedIn()) {
				$location.path('/ingresar');
			}

			var reqProduct = $routeParams.id;
			getProducts();

			$scope.createTransaction = function(id) {
				var ids = {
					product_offered_id: id,
					product_req_id: reqProduct,
					date: todayDate(),
					state: 'pendiente'
				}
				var resource = transactionResource.create();
				resource.post(ids,
					function(data) {
						if (data === null) {
							return;
						}
						if (data.created) {
							alert('Transacción creada');
						}
					},
					function(err) {
						alert('Fallo');
					});
			}

			function getProducts() {
				var resource = productsResource.index();
				resource.get({
						user_id: session.getCurrentUser().id
					},
					function(data) {
						if (data === null) {
							return;
						}
						$scope.products = data.products;
					},
					function(err) {
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
		}
	]);