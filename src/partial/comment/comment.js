app.controller("CommentCtrl", function ($scope, $stateParams, USER, $rootScope) {
    var id = $stateParams.id;
    getComment(id, $scope, USER);

    $scope.postComment = function (content) {
        if (!content) {
            alert("cannot submit empty comment");
            return;
        }
        USER.postComment($rootScope.currentUser.uid, id, content, function (res) {
            //TODO don't work
            $scope.content = null;
            $rootScope.$emit('refreshComment')
        });
    };

    $rootScope.$on('refreshComment', function () {
        getComment(id, $scope, USER);
    });
});

function getComment(id, $scope, USER) {
    USER.getComment(id, function (response) {
        $scope.comments = response;
    });
}