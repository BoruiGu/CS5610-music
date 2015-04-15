app.factory('Player', function ($rootScope, $interval) {
    var player = new Audio();
    var _progress = 0;
    var _duration = 0;
    var _volume = 100;
    var _playerStarted = false;
    var _isPlaying = false;
    var _isPaused = false;

    var timer = 0;
    function tick() {
        _progress = Math.floor(player.currentTime * 1000.0);
        $rootScope.$emit('playerProgress');
    }
    function setTimer() {
        stopTimer();
        timer = $interval(tick, 100);
    }
    function stopTimer() {
        $interval.cancel(timer);
    }

    return {
        startPlaying: function (url) {
            _progress = 0;
            player.src = url;
            player.volume = _volume / 100.0;
            player.addEventListener('loadedmetadata', function () {
                console.log('player loadedmetadata');
                _duration = player.duration * 1000.0;
                player.play();
                setTimer();
                _playerStarted = true;
                _isPlaying = true;
                _isPaused = false;
                $rootScope.$emit('playerStatusUpdate');
                $rootScope.$emit('playerProgress');
            }, false);

            player.addEventListener('ended', function () {
                console.log('track ended');
                /* Stop the player */
                player.src = null;
                stopTimer();
                _playerStarted = false;
                _isPaused = false;
                _isPlaying = false;
                $rootScope.$emit('playerStatusUpdate');
                $rootScope.$emit('playerProgress');
                $rootScope.$emit('playerEnded');
            }, false);
        },

        pause: function () {
            player.pause();
            stopTimer();
            _isPlaying = false;
            _isPaused = true;
            $rootScope.$emit('playerStatusUpdate');
        },

        resume: function () {
            player.play();
            setTimer();
            _isPlaying = true;
            _isPaused = false;
            $rootScope.$emit('playerStatusUpdate');
        },

        changeProgress: function (progress) {
            _progress = progress;
            player.currentTime = progress / 1000.0;;
        },

        changeVolume: function (volume) {
            _volume = volume;
            player.volume = volume / 100.0;
        },

        getProgress: function () {
            return _progress;
        },

        getDuration: function () {
            return _duration;
        },

        playerStarted: function () {
            return _playerStarted;
        },

        isPlaying: function () {
            return _isPlaying;
        },

        isPaused: function () {
            return _isPaused;
        }
    };
});