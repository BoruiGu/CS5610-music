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

            var queryUrl = baseURL + "search?q=" + query + "&type=album,artist,track&limit=20";
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
        },

        getAlbum: function (id, callback) {
            var queryUrl = baseURL + "albums/" + id;
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        },

        getArtist: function (id, callback) {
            var queryUrl = baseURL + "artists/" + id;
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        },

        getArtistAlbums: function (id, callback) {
            var queryUrl = baseURL + "artists/" + id + "/albums?album_type=single,album";
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        },
        
        getArtistTopTracks: function (id, callback) {
            var queryUrl = baseURL + "artists/" + id + "/top-tracks";
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        },

        getArtistRelated: function (id, callback) {
            var queryUrl = baseURL + "artists/" + id + "/related-artists";
            $http.get(queryUrl).success(function (res) {
                callback(res);
            });
        }
    };
});