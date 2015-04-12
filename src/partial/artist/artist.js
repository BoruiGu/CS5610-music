app.controller("ArtistCtrl", function ($scope, $routeParams, API) {
    var id = $routeParams.id;
    API.getArtist(id, function (res) {
        $scope.artist = res;
    });
});