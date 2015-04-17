app.controller("PlayerCtrl", function ($scope, $rootScope, Player, Playlist, $timeout) {    
    $scope.progress = 0;
    $scope.volume = 100;
    $scope.playerStarted = false;
    $scope.isPlaying = false;
    $scope.isPaused = false;
    $scope.showVolumeSlider = false;
    $scope.showPlaylistAddedMsg = false;    

    function refreshPlaylist() {
        $rootScope.playlist = Playlist.getList();
        $rootScope.position = Playlist.getPos();
    }

    function playChange(rel, stopAtEnd, absIdx){
        if (rel == 1){
            Playlist.next();
        }
        if (rel == -1) {
            Playlist.prev();
        }
        if (typeof absIdx !== 'undefined') {
            Playlist.seek(absIdx);
        }
        if (($rootScope.position == 0) && (stopAtEnd) && (rel == 1)) {
            /* Reached end of playlist, stop */
            console.log('end of playlist');
            $scope.progress = 0;
            //Player.startPlaying(null);
        } else {
            var cur = Playlist.getCurrent();
            if (cur) {
                Player.startPlaying(cur.preview_url)
            }
        }
    }

    refreshPlaylist();

    $scope.startPlaying = function () {
        var cur = Playlist.getCurrent();
        if (cur){
            Player.startPlaying(cur.preview_url);
        }
    }

    $scope.prev = function () {
        playChange(/*rel*/ -1, /*stopAtEnd*/ false);
    };

    $scope.next = function () {
        playChange(/*rel*/ 1, /*stopAtEnd*/ false);
    };

    $scope.pause = function () {
        Player.pause();
    };

    $scope.resume = function () {
        Player.resume();        
    }

    $scope.changeProgress = function () {
        Player.changeProgress($scope.progress);
    };

    $scope.changeVolume = function () {
        Player.changeVolume($scope.volume);
    };

    $scope.playlistRemove = function (index) {
        Playlist.remove(index);        
    };

    $scope.playlistClicked = function (index) {
        playChange(0, false, index);
    };

    $rootScope.$on('playerProgress', function () {
        $scope.progress = Player.getProgress();
        $scope.duration = Player.getDuration();
    });

    $rootScope.$on('playerStatusUpdate', function () {
        $scope.playerStarted = Player.playerStarted();
        $scope.isPlaying = Player.isPlaying();
        $scope.isPaused = Player.isPaused();
    });
    
    $rootScope.$on('playlistUpdated', function () {
        refreshPlaylist();
    });

    $rootScope.$on('playlistProgress', function () {
        $rootScope.position = Playlist.getPos();
    });

    $rootScope.$on('playerEnded', function () {
        playChange(/*rel*/ 1, /*stopAtEnd*/ true);
    });

    $rootScope.$on('itemAddedToPlaylist', function () {
        $scope.showPlaylistAddedMsg = true;
        $timeout(function () {
            $scope.showPlaylistAddedMsg = false;
        }, 1200);
    });
});