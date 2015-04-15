app.controller("PlayerCtrl", function ($scope, $rootScope, Player, Playlist) {    
    $scope.progress = 0;
    $scope.volume = 100;
    $scope.playerStarted = false;
    $scope.isPlaying = false;
    $scope.isPaused = false;
    $scope.showVolumeSlider = false;    

    function refreshPlaylist() {
        $rootScope.playlist = Playlist.getList();
        $rootScope.position = Playlist.getPos();
    }

    refreshPlaylist();

    $scope.startPlaying = function () {
        var cur = Playlist.getCurrent();
        if (cur){
            Player.startPlaying(cur.preview_url);
        }
    }

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
        Playlist.next();
        if ($rootScope.position == 0) {
            /* Reached end of playlist */
            console.log('end of playlist');
            return;
        }
        var cur = Playlist.getCurrent();
        if (cur) {
            Player.startPlaying(cur.preview_url);
        }
    });
});