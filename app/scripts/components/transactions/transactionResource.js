'use strict';

angular.module('proyecto2App')
    .factory('TransactionResource', ['CONFIGURATIONS', '$resource',
        function(config, $resource) {
            return {
                create: function() {
                    return $resource(config.apiUrls.transactions, {
                    }, {
                        'post': {
                            method: 'POST',
                            isArray: false
                        }
                    });
                },
            };
        }
    ]);