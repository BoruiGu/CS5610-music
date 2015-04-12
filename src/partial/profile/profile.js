app.controller("ProfileCtrl", function ($scope, $stateParams, $rootScope) {
    var uid = $stateParams.uid;
    console.log("param uid: ", uid);
    if (!uid) {
        uid = $rootScope.currentUser.uid;
    }
    $scope.uid = uid;
    console.log("current user: ", $rootScope.currentUser);
});