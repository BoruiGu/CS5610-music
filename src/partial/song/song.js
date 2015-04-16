app.controller("SongCtrl", function ($scope, $stateParams, API, User, $rootScope, Player, Playlist) {
    var id = $stateParams.id;
    API.getTrack(id, function (res) {
        $scope.song = res;
    });

    function addToList () {
        var e = {
            id: id,
            name: $scope.song.name,
            preview_url: $scope.song.preview_url,
            artists: $scope.song.artists,
            album: {
                name: $scope.song.album.name
            }
        }
        return Playlist.add(e);
    };

    $scope.play = function () {
        var index = addToList();
        Playlist.seek(index);
        var cur = Playlist.getCurrent();
        if (cur) {
            Player.startPlaying(cur.preview_url);
        }
    };

    $scope.addToList = function () {
        addToList();
    };
});