var app = angular.module("MusicApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: 'partial/search/search.html',
            controller: 'SearchCtrl'
        })
        .state('myProfile', {
            url: '/profile',
            templateUrl: 'partial/profile/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('profile', {
            url: '/profile/{uid:[0-9]+}',
            templateUrl: 'partial/profile/profile.html',
            controller: 'ProfileCtrl'
        })        
		.state('result', {
		    url: '/search/:query',
		    views: {
                /* main template */
		        '': {
		            templateUrl: 'partial/result/result.html',
		            controller: 'ResultCtrl'
		        },
		        /* child view */
		        'search@result': {
		            templateUrl: 'partial/search/search.html',
		            controller: 'SearchCtrl'
		        }
            }
        })
		.state('song', {
		    url: '/song/:id',
		    views: {
		        '': {
		            templateUrl: 'partial/song/song.html',
		            controller: 'SongCtrl'
		        },
		        'comment@song': {
		            templateUrl: 'partial/comment/comment.html',
		            controller: 'CommentCtrl'
		        }
		    }            
        })
		.state('album', {
            url: '/album/:id',
            views: {
                '': {
                    templateUrl: 'partial/album/album.html',
                    controller: 'AlbumCtrl'
                },
                'comment@album': {
                    templateUrl: 'partial/comment/comment.html',
                    controller: 'CommentCtrl'
                }
            }
        })
		.state('artist', {
            url: '/artist/:id',
            views: {
                '': {
                    templateUrl: 'partial/artist/artist.html',
                    controller: 'ArtistCtrl'
                },
                'comment@artist': {
                    templateUrl: 'partial/comment/comment.html',
                    controller: 'CommentCtrl'
                }
            }
        })
		.state('register', {
            url: '/register/:ref',
            templateUrl: 'partial/register/register.html',
            controller: 'RegisterCtrl'
		})
        .state('registerNoRef', {
            url: '/register',
            templateUrl: 'partial/register/register.html',
            controller: 'RegisterCtrl'
        })
}]);

var checkLoggedin = function ($q, $timeout, $http, $state, $rootScope, USER) {
    var deferred = $q.defer();

    USER.loggedin(function (user) {
        if (user !== '0') {
            deferred.resolve();
        } else {
            deferred.reject();
            $state.go('search');
        }
    });

    return deferred.promise;
};