app.controller('ResultCtrl', function ($scope, API, $routeParams) {
    $scope.activeTag = 'song';
    var query = $routeParams.query;
    API.search(query, function (res) {
        $scope.res = res;
    });
});