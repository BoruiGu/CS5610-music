app.controller("HomeCtrl", function ($scope, $rootScope, $timeout) {
    $rootScope.$on('itemAddedToMylist', function () {
        $scope.showMylistAddedMsg = true;
        $timeout(function () {
            $scope.showMylistAddedMsg = false;
        }, 1200);
    });
});