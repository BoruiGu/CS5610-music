app.controller("LoginCtrl", function ($scope, $http, $state, $rootScope, User, $timeout, Mylist) {
    $scope.showMylistAddedMsg = false;
    updateScopeLoggedin($scope, User);

    $rootScope.$on('refreshLogin', function () {
        updateScopeLoggedin($scope, User);
    });

    $scope.login = function (user) {
        /* Since mobile automatically capital first letter
           For better UX, username is case-insensitive */
        user.username = user.username.toLowerCase();
        User.login(user, function (response) {
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
        User.logout(function () {
            $scope.loggedin = false;
            /* Refresh current view */
            $state.go($state.current, /* for $stateParams */ {}, { reload: true });
        });
    };

    $rootScope.$on('setLoginFocus', function () {
        $scope.focusLogin = true;
        /* Add class shake to start animation */
        $scope.loginClass = "shake";
    });

    $scope.blur = function () {
        $scope.focusLogin = false;
        $scope.loginClass = null;
    }

    $(function () {
        /* hide nav bar collapse after click on link */
        $("#my-navbar-collapse li a").click(function (event) {
            $(".navbar-collapse").collapse('hide');
        });        
    });
});

function updateScopeLoggedin($scope, User) {
    User.loggedin(function (user) {
        if (user !== '0') {
            $scope.loggedin = true;
        } else {
            $scope.loggedin = false;
        }
    });    
}