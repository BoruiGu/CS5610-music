app.controller('ResultCtrl', function ($scope, API, $stateParams) {
    $scope.activeTag = 'song';
    var query = $stateParams.query;
    API.search(query, function (res) {
        $scope.res = res;
    });
});