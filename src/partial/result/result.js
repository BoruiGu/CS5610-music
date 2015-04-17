app.controller('ResultCtrl', function ($scope, API, $stateParams) {
    $scope.activeTag = 'song';
    var query = $stateParams.query;
    API.search(query, /* limit */ 20, function (res) {
        $scope.res = res;
        $scope.tracklist = res.tracks;        
    });

    $scope.$watch('activeTag', function (newVal) {
        if (newVal == 'album') {
            $scope.thumbnail = $scope.res.albums;
        }

        if (newVal == 'artist') {
            $scope.thumbnail = $scope.res.artists;
        }

        $scope.type = newVal;
    });
});