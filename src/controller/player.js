app.controller("PlayerCtrl", function ($scope, $rootScope, Player) {    
    $scope.progress = 0;
    $scope.volume = 100;
    $scope.playerStarted = false;
    $scope.isPlaying = false;
    $scope.isPaused = false;
    $scope.showVolumeSlider = false;

    $scope.startPlaying = function () {
        Player.startPlaying();
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
});