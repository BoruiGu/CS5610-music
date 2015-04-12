app.controller("SongCtrl", function ($scope, $stateParams, API) {
    var id = $stateParams.id;
    API.getTrack(id, function (res) {
        $scope.song = res;
    });
});