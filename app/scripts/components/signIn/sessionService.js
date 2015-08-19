'use strict';

angular.module('proyecto2App')
    .service('SessionService', ['$location', '$rootScope', 'LoginResource',
        function($location, $rootScope, loginResource) {

            this.isLoggedIn = function() {
                /*
                 *  Get Current User saved localstore
                 */
                if (!store.get('cu')) {
                    return false;
                }
                return true;
            };

            this.getCurrentUser = function() {
                if (!this.isLoggedIn) {
                    return null;
                }
                return store.get('cu');
            };

            this.setCurrentUser = function(user) {
                store.set('cu', user);
                $rootScope.$broadcast('changeUser', user);
            };

            /*this.isCurrentUser = function(username) {
                if (!this.isLoggedIn()) {
                    return false;
                }
                return this.getCurrentUser().username === username ? true : false;;
            };*/

            this.hasRole = function(role) {
                var user = this.getCurrentUser();
                var hasRole = false;
                user.roles.map(function(user) {
                    if (user.role === role) {
                        return hasRole = true;
                    }
                });
                return hasRole;
            }

            this.changePoState = function(state){
                var user = this.getCurrentUser();
                user.poProgress = state;
                this.setCurrentUser(user);
            }

            this.hasPO = function(){
                return this.getCurrentUser().poProgress === username ? true : false;
            }

            this.logOut = function() {
                $rootScope.loggedIn = false;
                /*
                 *  Remove Current User
                 */
                if (!this.isLoggedIn) {
                    $location.path('/');
                    window.location.reload();
                }
                store.remove('cu');
                $location.path('/');
            }

            this.logIn = function(email, password, scope, callback, error) {
                if (!this.isLoguedIn) {
                    var resource = loginResource.create(),
                        self = this;
                    resource.post({
                        email: email,
                        password: password
                    }, function(data) {
                        if (data === null || data.status === 404) {
                            return;
                        }
                        /*
                         * if error message show the error
                         */
                        if (data.error_message) {
                            console.log(JSON.stringify(data.error_message));
                            scope.errorMessage = data.error_message;
                            return;
                        }
                        /*
                         * Store Current User
                         */
                        var user;
                        user = {
                            id: data.user.id,
                            first_name: data.user.first_name,
                            last_name: data.user.last_name,
                            email: data.user.email,
                            phone: data.user.phone,
                            age: data.user.age,
                            token: data.user.token
                        }
                        $rootScope.currentUser = user;
                        self.setCurrentUser(user);
                        callback(user);
                    }, function(err) {
                        error(err);
                    });
                }
            }
        }
    ]);