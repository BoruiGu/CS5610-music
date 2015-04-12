app.controller("ProfileCtrl", function ($scope, $stateParams) {
    var uid = $stateParams.uid;
    $scope.uid = uid;
});