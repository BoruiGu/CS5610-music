app.controller("ArtistCtrl", function ($scope, $stateParams, API, Player, Playlist, $rootScope) {
    $scope.activeTag = 'toptrack'
    var id = $stateParams.id;
    API.getArtist(id, function (res) {
        $scope.artist = res;
        $scope.commentName = res.name;
        $rootScope.title = res.name;
    });

    API.getArtistTopTracks(id, function (res) {
        $scope.tracklist = {
            items: res.tracks
        };
        console.log($scope.tracklist);
    });

    API.getArtistAlbums(id, function (res) {
        $scope.thumbnail = res;
        $scope.type = 'album';
    });

    $scope.PlayAll = function () {
        Playlist.clear();
        Playlist.set($scope.tracklist.items);
        var cur = Playlist.getCurrent();
        Player.startPlaying(cur.preview_url);
    };
});