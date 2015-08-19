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
<<<<<<< HEAD
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
        $scope.products = {};

        getProducts();

        function getProducts() {
            var resource = productsResource.index();
            resource.get(function(data) {
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
=======
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
		getProducts();

		function getProducts() {
			var resource = productsResource.index();
			resource.get(function(data) {
				if (data === null) {
					return;
				}
				$scope.products = data.products;
			}, function(err) {
				alert('Fallo');
			});
		}

		$scope.searchProduct = function(){
			var resource = productsResource.search();
			resource.get({name:$scope.productSearch},function(data){
				if (data === null) {
					return;
				}
				$scope.products = data.product;
			}, function(err) {
				alert('Fallo');
			});
		};
	}
]);
>>>>>>> 276c1564897a3a9752c277b81ee7a842f873cc45
