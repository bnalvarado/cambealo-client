'use strict';
/*
 *Environment Configurations
 */
(function() {

    var environment = 'defaultConfig',
        api, config, host;

    config = {
        defaultConfig: {
            api: 'http://localhost:3000/api/v1/',
            host: 'http://localhost:3000'
        }
    };

    api = config[environment].api || config.defaultConfig.api;
    host = config[environment].host || config.defaultConfig.host;
    /*
     *Routes Configurations
     */
    angular.module('proyecto2App')
        .constant('HOST', host)
        .constant('API_URL', api)
        .constant('CONFIGURATIONS', {
            apiUrls: {
                session: api + 'sessions',
                user: api + 'users',
                userId: api + 'users/:id',
                products: api + 'products',
                userProducts: api + 'users/:user_id/products',
                userProductId: api + 'users/:user_id/products/:id',
                productName: api + 'products/search/:name',
                transactions: api + 'transactions'
            },
            defaultRange: 5
        });
})();



/*
 * Token Interceptor, Adding on header for future requests
 */
angular.module('proyecto2App').
factory('httpRequestInterceptor', [
    function() {
        return {
            request: function(config) {
                var user = store.get('cu') || null;
                if (user && user.token) {
                    config.headers['X-AUTH-TOKEN'] = user.token;
                }
                return config;
            }
        };
    }
]);
angular.module('proyecto2App')
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('httpRequestInterceptor');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        }
    ]);
