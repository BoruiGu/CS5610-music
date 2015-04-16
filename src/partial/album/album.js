app.controller("AlbumCtrl", function ($scope, $stateParams, API) {
    var id = $stateParams.id;
    API.getAlbum(id, function (res) {
        $scope.album = res;
        $scope.commentName = res.name;
    });
});