'use strict';
/**
 *  The app.route.js file will handle all the routes
 *  and the route configuration.
 */
angular.module('proyecto2App')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/components/principal/principal.html',
                controller: 'PrincipalCtrl',
                authReq: false
            })
            .when('/registrar', {
                templateUrl: 'views/components/userAdministration/formUser.html',
                controller: 'CrudUserCtrl',
                authReq: false
            })
            .when('/ingresar', {
                templateUrl: 'views/components/signIn/login.html',
                controller: 'LoginCtrl',
                //Add diferent class to home
                addHomeClass: false
            })
            .when('/principal/usuario', {
                templateUrl: 'views/components/perfil/perfil.html',
                controller: 'PerfilCtrl',
                authReq: true
            })
            .when('/principal/transaction/:id', {
                templateUrl: 'views/components/transactions/transaction.html',
                controller: 'TransactionCtrl',
                authReq: true
            })
            .when('/principal/usuario/editar/:id', {
                templateUrl: 'views/components/userAdministration/formUser.html',
                controller: 'CrudUserCtrl',
                authReq: true
            })
            .when('/principal/usuario/producto', {
                templateUrl: 'views/components/products/formProducts.html',
                controller: 'ProductsCtrl',
                authReq: true
            })
            .when('/principal/usuario/producto/editar/:id', {
                templateUrl: 'views/components/products/formProducts.html',
                controller: 'ProductsCtrl',
                authReq: true
            })
            .otherwise({
                redirectTo: '/'
            });
        // use the HTML5 History API
        // $locationProvider.html5Mode(true);
    }).run(['$rootScope', '$location', 'SessionService',
        function($rootScope, $location, SessionService) {
            $rootScope.$on('$routeChangeStart', function(event, next) {
                /*
                 * Always show header
                 */
                $rootScope.showHeader = true;

                /*
                 * If loggin screen is the next one
                 */  
                if ($location.$$path === "/ingresar") {
                    $rootScope.showHeader = false;
                }

                /*
                 * if next route needs auth and is not loggedIn redirecto to 
                 * loggin and hide header
                 */
                if (next.authReq && !SessionService.isLoggedIn()) {
                    $location.path('/');
                    return;
                }
            });
        }
    ]);