app.controller("SongCtrl", function ($scope, $stateParams, API, USER, $rootScope) {
    var id = $stateParams.id;
    API.getTrack(id, function (res) {
        $scope.song = res;
    });

    $scope.postComment = function (content) {
        if (!content) {
            alert("cannot submit empty comment");
            return;
        }
        USER.postComment($rootScope.currentUser.uid, id, content, function (res) {
            //TODO don't work
            $scope.content = null;
        });
    };
});