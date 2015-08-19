'use strict';

angular.module('proyecto2App')
    .factory('LoginResource', ['CONFIGURATIONS', '$resource',
        function(config, $resource) {
            return {
                create: function() {
                    return $resource(config.apiUrls.session, {}, {
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });
                }
            };
        }
    ]);