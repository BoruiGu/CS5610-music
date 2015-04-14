﻿app.controller("LoginCtrl", function ($scope, $http, $state, $rootScope, USER) {
    updateScopeLoggedin($scope, USER);

    $rootScope.$on('refreshLogin', function () {
        updateScopeLoggedin($scope, USER);
    });

    $scope.login = function (user) {
        USER.login(user, function (response) {
            if (typeof response === 'number') {
                /* Error in Log In */                
                alert("incorrect username or password. please try again");
                /* Clear password */
                user.password = null;
            } else {
                /* Logged In */
                console.log(response);
                $scope.loggedin = true;
                /* Refresh current view */
                $state.go($state.current, /* for $stateParams */ {}, { reload: true });
            }
        });
    };

    $scope.logout = function () {
        USER.logout(function () {
            $scope.loggedin = false;
            /* Refresh current view */
            $state.go($state.current, /* for $stateParams */ {}, { reload: true });
        });
    };
});

function updateScopeLoggedin($scope, USER) {
    USER.loggedin(function (user) {
        if (user !== '0') {
            $scope.loggedin = true;
        } else {
            $scope.loggedin = false;
        }
    });
}