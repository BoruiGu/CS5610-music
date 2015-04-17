app.controller("ArtistCtrl", function ($scope, $stateParams, API) {
    $scope.activeTag = 'toptrack'
    var id = $stateParams.id;
    API.getArtist(id, function (res) {
        $scope.artist = res;
        $scope.commentName = res.name;
    });

    API.getArtistTopTracks(id, function (res) {
        $scope.tracklist = {
            items: res.tracks
        };
        console.log($scope.tracklist);
    });

    API.getArtistAlbums(id, function (res) {
        $scope.thumbnail = res;
        $scope.type = 'album';
    });
});