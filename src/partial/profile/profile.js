app.controller("ProfileCtrl", function ($scope, $routeParams) {
    var uid = $routeParams.uid;
    $scope.uid = uid;
});