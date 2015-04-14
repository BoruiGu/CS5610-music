app.factory('User', function ($http, $rootScope) {
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
            console.log(new Date());
            var req = {
                uid: uid,
                id: id,
                content: content
            };
            $http.post("api/comment", req)
            .success(function (response) {
                callback(response);
            });
        },
        /* Retrieve comments for a certain song/artist/album identified by id */
        getComment: function (id, callback) {
            $http.get('api/comment/' + id).success(function (response) {
                callback(response);
            });
        },
        /* Retrieve basic user info by uid */
        getUserInfo: function (uid, callback) {
            $http.get('api/userinfo/' + uid).success(function (response) {
                if (response.length == 0) {
                    callback('not found');
                } else {
                    callback(response[0]);
                }                
            });
        },

        following: function (uid, callback) {
            $http.get('api/following/' + uid).success(function (response) {
                callback(response);
            });
        },

        followed: function (uid, callback) {
            $http.get('api/followed/' + uid).success(function (response) {
                callback(response);
            });
        },

        follow: function (uid1, uid2, callback) {
            var data = {
                uid1: uid1,
                uid2: uid2
            };
            $http.post('api/follow/', data).success(function (response) {
                callback(response);
            });
        },

        unfollow: function (uid1, uid2, callback) {
            console.log("unfollow: " + uid1 + ' ' + uid2);
            var data = {
                uid1: uid1,
                uid2: uid2
            };
            $http.post('api/unfollow/', data).success(function (response) {
                callback(response);
            });
        }
    };
});