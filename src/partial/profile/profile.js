﻿app.controller("ProfileCtrl", function ($scope, $state, $stateParams, $rootScope, User, Mylist, $timeout) {
    $scope.tracklist = {
        items: null
    };
    $scope.activeTag = 'mylist';
    if ($state.current.name == 'profile') {
        console.log('state: profile');
        $scope.myProfile = false;
        var uid = $stateParams.uid;
        User.getUserInfo(uid, function (response) {
            if (response == 'not found') {
                alert('incorrect user id');
                $state.go('search');
            }
            $scope.user = response;
            $rootScope.$emit('profileReady');
        });
        User.loggedin(function (currentUser) {
            if (currentUser !== '0') {
                $scope.loggedin = true;
                $scope.following = false;
                /* Logged In, Check if Current User is following this user */
                if (currentUser.uid != $scope.user.uid) {
                    User.following(currentUser.uid, function (response) {
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].uid == $scope.user.uid) {
                                $scope.following = true;
                                break;
                            }
                        }
                    });
                }
            } else {
                $scope.loggedin = false;
            }
        });

        $scope.follow = function () {
            User.follow($rootScope.currentUser.uid, $scope.user.uid, function (response) {
                $scope.following = true;
            });
        };
        $scope.unfollow = function () {
            User.unfollow($rootScope.currentUser.uid, $scope.user.uid, function (response) {
                $scope.following = false;
            });
        };        
    }

    if ($state.current.name == 'myProfile') {
        console.log('state: myProfile');
        $scope.myProfile = true;
        $scope.user = $rootScope.currentUser;
        $timeout(function () {
            $rootScope.$emit('profileReady');
        });
    }

    $rootScope.$on('profileReady', function () {
        console.log('profileReady');
        Mylist.get($scope.user.uid, function (response) {
            //console.log(response);
            $scope.tracklist.items = response;
        });
        User.comments($scope.user.uid, function (response) {
            console.log('comments: ' + response);
            $scope.comments = response;
        });
    });
});