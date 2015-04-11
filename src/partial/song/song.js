app.controller("SongCtrl", function ($scope, $routeParams, API) {
    var id = $routeParams.id;
    API.getTrack(id, function (res) {
        $scope.song = res;
    });
});