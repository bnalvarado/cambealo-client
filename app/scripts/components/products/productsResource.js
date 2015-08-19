'use strict';

angular.module('proyecto2App')
    .factory('ProductsResource', ['CONFIGURATIONS', '$resource',
        function(config, $resource) {
            return {
                index: function() {
                    return $resource(config.apiUrls.userProducts, {
                        user_id: '@user_id'
                    }, {
                        'get': {
                            method: 'GET',
                            isArray: false
                        }
                    });
                },
                create: function() {
                    return $resource(config.apiUrls.userProducts, {
                        user_id: '@user_id'
                    }, {
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });
                },
                update: function() {
                    return $resource(config.apiUrls.userProductId, {
                        user_id: '@user_id',
                        id: '@id'
                    }, {
                        'put': {
                            method: 'PUT',
                            isArray: false
                        }
                    });
                },
                show: function() {
                    return $resource(config.apiUrls.userProductId, {
                        user_id: '@user_id',
                        id: '@id'
                    }, {
                        'get': {
                            method: 'GET',
                            isArray: false
                        }
                    });
                },
                delete: function() {
                    return $resource(config.apiUrls.userProductId, {
                        user_id: '@user_id',
                        id: '@id'
                    }, {
                        'delete': {
                            method: 'DELETE',
                            isArray: false
                        }
                    });
                }
            };
        }
    ]);