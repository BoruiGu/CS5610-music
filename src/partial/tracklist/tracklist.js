app.controller('TracklistCtrl', function ($state, $scope, Mylist) {
    $scope.showRemoveMylistBtn = false;
    $scope.mouseHover = [];
    if ($state.current.name == 'myProfile') {
        /* In mylist of current user */
        $scope.showRemoveMylistBtn = true;
    }

    $scope.hover = function (event) {
        var idx = event.currentTarget.tabIndex;
        if ((event.type == "mouseenter") || (event.type == "mouseover")) {
            $scope.mouseHover[idx] = true;
        } else {
            $scope.mouseHover[idx] = false;
        }
    };

    $scope.mylistRemove = function (id) {
        var uid = $scope.user.uid;
        Mylist.remove(uid, id);
    };
});