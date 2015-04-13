app.controller('ResultCtrl', function ($scope, API, $stateParams) {
    $scope.activeTag = 'song';
    var query = $stateParams.query;
    API.search(query, /* limit */ 20, function (res) {
        $scope.res = res;
    });
});