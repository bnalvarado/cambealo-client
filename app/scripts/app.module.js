'use strict';
/**
 * The app.module.js file will handle the setup of your app,
 * load in AngularJS dependencies and so on.
 */
angular.module('proyecto2App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .run(['$rootScope', function($rootScope) {
    }]);
