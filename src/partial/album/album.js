app.controller("AlbumCtrl", function ($scope, $stateParams, API, Player, Playlist) {
    var id = $stateParams.id;
    API.getAlbum(id, function (res) {
        $scope.album = res;
        $scope.tracklist = res.tracks;
        $scope.commentName = res.name;
    });

    $scope.PlayAll = function () {
        Playlist.clear();
        Playlist.set($scope.tracklist.items);
        var cur = Playlist.getCurrent();
        Player.startPlaying(cur.preview_url);
    };
});