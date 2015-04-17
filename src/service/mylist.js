app.factory('Mylist', function ($http, $rootScope) {
    function getMylist(uid, callback) {
        $http.get('api/mylist/' + uid).success(function (response) {
            callback(JSON.parse(response[0].list));
        });
    }

    return {
        add: function (uid, e) {
            getMylist(uid, function (mylist) {
                var index = -1;
                if (mylist && (typeof mylist.some === "function")) {
                    mylist.some(function (ele, i) {
                        if (ele.id == e.id) {
                            index = i;
                            return true;
                        }
                        return false;
                    });
                } else {
                    mylist = [];
                }

                if (index != -1) {
                    /* e in list, stop */
                    return;
                } else {
                    /* e not in list, push it */
                    mylist.push(e);
                    var list = JSON.stringify(mylist);
                    /* Save mylist to database */
                    $http.post('api/mylist/' + uid, list)
                    .success(function () {

                    });
                }
            });
        },

        remove: function (index) {
            //$rootScope.mylist
        },

        get: function (uid, callback) {
            getMylist(uid, callback);
        }
    };
});