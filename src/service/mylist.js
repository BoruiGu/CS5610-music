app.factory('Mylist', function ($http, $rootScope) {
    return {
        add: function (uid, e) {
            var index = -1;
            $rootScope.mylist.some(function (ele, i) {
                if (ele.id == e.id) {
                    index = i;
                    return true;
                }
                return false;
            });
            if (index != -1) {
                /* e in list, stop */
                return "Song already exist in Mylist";
            } else {
                /* e not in list, push it */
                $rootScope.mylist.push(e);
                var list = JSON.stringify($rootScope.mylist);
                /* Save mylist to database */
                $http.post('api/mylist/' + uid, list)
                .success(function () {
                    
                });
            }
        },

        remove: function (index) {
            //$rootScope.mylist
        },

        get: function (uid, callback) {
            $http.get('api/mylist/' + uid).success(function (response) {
                callback(JSON.parse(response[0].list));
            });
        }
    };
});