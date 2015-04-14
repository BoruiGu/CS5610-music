app.controller("CommentCtrl", function ($scope, $stateParams, User, $rootScope) {
    var id = $stateParams.id;
    getComment(id, $scope, User);

    $scope.postComment = function (content) {
        if (!content) {
            alert("cannot submit empty comment");
            return;
        }
        User.postComment($rootScope.currentUser.uid, id, content, function (res) {            
            $scope.content = null;
            $rootScope.$emit('refreshComment')
        });
    };

    $rootScope.$on('refreshComment', function () {
        getComment(id, $scope, User);
    });

    $scope.setLoginFocus = function () {
        $rootScope.$emit('setLoginFocus');        
    };
});

function getComment(id, $scope, User) {
    User.getComment(id, function (response) {
        $scope.comments = response;
    });
}