app.controller("RegisterCtrl", function ($scope, $stateParams, User, $state, $rootScope) {
    var refURL = $stateParams.ref;
    
    $scope.register = function (user) {
        if (user.password != user.password2 || !user.password || !user.password2) {
            alert("Your passwords don't match");
            return;
        }

        if (!isValidUsername(user.username)) {
            alert("Invalid Username");
            return;
        }
        user.username = user.username.toLowerCase();
        User.register(user, function (response) {
            console.log(response);
            if (response.username) {
                $rootScope.currentUser = response;
                $rootScope.$emit('refreshLogin');
                //TODO redirect to ref
                $state.go('search');
            } else {
                /* Error */
                if (response.code == "ER_DUP_ENTRY") {
                    alert('username has been used');
                }
            }
        });

    };
});

function isValidUsername(username) {
    return (/^[0-9a-zA-Z_.-]+$/.test(username)) && (username.length <= 15);
}