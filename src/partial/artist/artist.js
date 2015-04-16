app.controller("ArtistCtrl", function ($scope, $stateParams, API) {
    var id = $stateParams.id;
    API.getArtist(id, function (res) {
        $scope.artist = res;
        $scope.commentName = res.name;
    });
});