'use strict';

angular.module('proyecto2App')
    .factory('UserAdminResource', ['CONFIGURATIONS', '$resource',
        function(config, $resource) {
            return {
                create: function() {
                    return $resource(config.apiUrls.user, {}, {
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });
                },
                update: function() {
                    return $resource(config.apiUrls.userId, {
                        id: '@id'
                    }, {
                        'put': {
                            method: 'PUT',
                            isArray: false
                        }
                    });
                },
                show: function() {
                    return $resource(config.apiUrls.userId, {
                        id: '@id'
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