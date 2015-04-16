app.controller("SongCtrl", function ($scope, $stateParams, API, User, $rootScope, Player, Playlist, Mylist) {
    var id = $stateParams.id;
    API.getTrack(id, function (res) {
        $scope.song = res;
        $scope.commentName = res.name;
    });

    User.loggedin(function (currentUser) {
        if (currentUser !== '0') {
            $scope.loggedin = true;
        } else {
            $scope.loggedin = false;
        }
    });

    function createListItem() {
        var e = {
            id: id,
            name: $scope.song.name,
            preview_url: $scope.song.preview_url,
            artists: $scope.song.artists,
            album: {
                name: $scope.song.album.name
            }
        }
        return e;
    }

    function addToList () {        
        return Playlist.add(createListItem());
    }

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

    $scope.addToMyList = function () {
        var msg = Mylist.add($rootScope.currentUser.uid, createListItem());
        if (typeof msg == 'string') {
            alert(msg);
        }
    }
});