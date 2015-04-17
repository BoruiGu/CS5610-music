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

        remove: function (uid, id) {
            getMylist(uid, function (mylist) {
                var index = -1;
                mylist.some(function (element, idx) {
                    if (element.id == id) {
                        index = idx;
                        return true;
                    }
                    return false;
                });
                if (index == -1) {
                    /* Cant find item in mylist */
                    return;
                }
                mylist.splice(index, 1);
                var list = JSON.stringify(mylist);
                $http.post('api/mylist/' + uid, list)
                .success(function () {
                    $rootScope.$emit('mylistUpdated');
                });
            });
        },

        get: function (uid, callback) {
            getMylist(uid, callback);
        }
    };
});