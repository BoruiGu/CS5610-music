app.controller("SearchCtrl", function ($scope, $http, API) {
    $scope.search = function (query) {

    };

    $scope.autoComplete = function (query) {
        $scope.ACRes = null;
        API.search(query, function (res) {
            $scope.ACRes = res;
        });
    };    
});