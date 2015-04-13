app.factory('USER', function ($http, $rootScope) {
    return {
        login: function (user, callback) {
            //TODO: HTTPS
            $http.post("api/login", user)
            .success(function (response) {
                $rootScope.currentUser = response;
                callback(response);
            })
            .error(function (data, status) {
                callback(status);
            });
        },

        logout: function (callback) {
            $http.post("api/logout")
            .success(function () {
                $rootScope.currentUser = null;
                callback();
            });
        },

        loggedin: function (callback) {
            $http.get('api/loggedin').success(function (user) {
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
            $http.post("api/register", newUser)
            .success(function (response) {
                callback(response);                
            });
        },

        postComment: function (uid, id, content, callback) {
            var req = {
                uid: uid,
                id: id,
                content: content
            };
            $http.post("api/comment", req)
            .success(function (response) {
                callback(response);
            });
        }
    };
});