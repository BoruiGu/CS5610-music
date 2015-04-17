app.controller("HomeCtrl", function ($scope, $rootScope, $timeout, Player) {
    /* Cross-tab Comm */
    $rootScope.appId = String(Math.random());
    console.log('appId: ' + $rootScope.appId);

    $rootScope.$on('itemAddedToMylist', function () {
        $scope.showMylistAddedMsg = true;
        $timeout(function () {
            $scope.showMylistAddedMsg = false;
        }, 1200);
    });
    
    window.addEventListener('storage', function (e) {
        console.log("cross-tab comm");
        console.log(e);
        // In IE, chances are we will get oldValue from getItem. 
        // So we get newValue from event object instead.
        // There's also a bug in IE that the event fires in the
        // same tab that updated localStorage. We're forced to
        // use some method to check if this is the tab that
        // caused the event.
        //var playAppId = localStorage.getItem("playAppId");
        if (e.key == "playAppId") {
            var playAppId = e.newValue;
            console.log(playAppId, ' ', $rootScope.appId);
            /* Another instance starts playing */
            if (playAppId != $rootScope.appId) {
                Player.pause();
            }
        }
    }, false);
});