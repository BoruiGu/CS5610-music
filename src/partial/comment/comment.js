app.controller("CommentCtrl", function ($scope, $stateParams, User, $rootScope, $state) {
    var id = $stateParams.id;
    getComment(id, $scope, User);

    $scope.postComment = function (content) {
        if (!content) {
            alert("cannot submit empty comment");
            return;
        }
        User.postComment($rootScope.currentUser.uid, id, content,
                         $state.current.name, $scope.commentName,
            function (res) {
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

    $(function () {
        /* Click sign in @ comment on mobile, show nav bar collapse */
        $("#commentSignInNote").click(function (event) {
            $(".navbar-collapse").collapse('show');
        });
    });
});

function getComment(id, $scope, User) {
    User.getComment(id, function (response) {
        $scope.comments = response;
    });
}