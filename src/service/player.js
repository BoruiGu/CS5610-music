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
    function setTick() {
        stopTick();
        timer = $interval(tick, 100);
    }
    function stopTick() {
        $interval.cancel(timer);
    }
  
    return {
        startPlaying: function (url) {
            player.src = '';
            player.play();
            player.pause();
            /* Simply set src property of player will act as if there
               are "multiple" instances of Audio, and multiple
               'loadedmetadata' | 'ended' events will fire at the same
               time. Each time src is set, number of "instances"++ 
               (Chrome 42.0.2311.90 m)
               For a workaround, pause and create a fresh new Audio(),
               presumably GC will do the clean up
               (No reference to the object) */
            player.pause();
            player = new Audio();
            _progress = 0;
            player.src = url;
            player.volume = _volume / 100.0;

            player.addEventListener('loadedmetadata', function () {
                console.log('player loadedmetadata');
                _duration = player.duration * 1000.0;
                player.play();
                /* Cross-tab Comm */
                localStorage.setItem("playAppId", $rootScope.appId);
                setTick();
                _playerStarted = true;
                _isPlaying = true;
                _isPaused = false;                
                $rootScope.$emit('playerStatusUpdate');
                $rootScope.$emit('playerProgress');
            }, false);

            player.addEventListener('ended', function () {
                console.log('track ended');                                
                stopTick();
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
            stopTick();
            _isPlaying = false;
            _isPaused = true;
            $rootScope.$emit('playerStatusUpdate');
        },

        resume: function () {
            player.play();
            /* Cross-tab Comm */
            localStorage.setItem("playAppId", $rootScope.appId);
            setTick();
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