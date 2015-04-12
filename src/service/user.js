app.factory('USER', function ($http, $rootScope) {
    return {
        login: function (user, callback) {
            //TODO: HTTPS
            $http.post("/login", user)
            .success(function (response) {
                $rootScope.currentUser = response;
                callback(response);
            })
            .error(function (data, status) {
                callback(status);
            });
        },

        logout: function (callback) {
            $http.post("/logout")
            .success(function () {
                $rootScope.currentUser = null;
                callback();
            });
        },

        loggedin: function (callback) {
            $http.get('/loggedin').success(function (user) {
                //$rootScope.errorMessage = null;
                /* User is Authenticated */
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    callback(user);
                }
                /* User is Not Authenticated */
                else {
                    // $rootScope.errorMessage = 'You need to log in.';
                    $rootScope.currentUser = null;
                    callback(user);
                }
            });
        },

        register: function (newUser, callback) {
            $http.post("/register", newUser)
            .success(function (response) {
                callback(response);                
            });
        }
    };
});