app.factory('API', function ($http) {
    var baseURL = "https://api.spotify.com/v1/";

    return {
        search: function (query, callback) {
            if (typeof query == 'undefined') {
                // query is undefined, don't send a search query
                console.log("invalid query");
                return;
            }
            if (!query) {
                // query might be: null, undefined, NaN, "", 0, false
                // don't send a search query
                console.log("invalid query");
                return;
            }

            var queryUrl = baseURL + "search?q=" + query + "&type=album,artist,track&limit=5";
            $http.get(queryUrl).success(function (res) {
                console.log(res);
                callback(res);
            });
        },

        getTrack: function (id, callback) {
            var queryUrl = baseURL + "tracks/" + id;
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        }
    };
});