app.controller("AlbumCtrl", function ($scope, $routeParams, API) {
    var id = $routeParams.id;
    API.getAlbum(id, function (res) {
        $scope.album = res;
    });
});