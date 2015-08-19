'use strict';

angular.module('proyecto2App')
    .factory('ProductsResource', ['CONFIGURATIONS', '$resource',
        function(config, $resource) {
            return {
                index: function() {
                    return $resource(config.apiUrls.product, {}, {
                        'get': {
                            method: 'GET',
                            isArray: false
                        }
                    });
                },
                create: function() {
                    return $resource(config.apiUrls.product, {}, {
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });
                },
                update: function() {
                    return $resource(config.apiUrls.productId, {
                        id: '@id'
                    }, {
                        'put': {
                            method: 'PUT',
                            isArray: false
                        }
                    });
                },
                show: function() {
                    return $resource(config.apiUrls.productId, {
                        id: '@id'
                    }, {
                        'get': {
                            method: 'GET',
                            isArray: false
                        }
                    });
                },
                delete: function() {
                    return $resource(config.apiUrls.productId, {
                        id: '@id'
                    }, {
                        'delete': {
                            method: 'DELETE',
                            isArray: false
                        }
                    });
                },
                search: function(){
                  return $resource(config.apiUrls.productName, {
                        name: '@name'
                    }, {
                        'get': {
                            method: 'GET',
                            isArray: false
                        }
                    });  
                }
            };
        }
    ]);