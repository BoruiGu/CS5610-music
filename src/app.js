var app = angular.module("MusicApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: 'partial/search/search.html',
            controller: 'SearchCtrl'
        })
        .state('profile', {
            url: '/profile/:uid',
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
            templateUrl: 'partial/song/song.html',
            controller: 'SongCtrl'
        })
		.state('album', {
            url: '/album/:id',
            templateUrl: 'partial/album/album.html',
            controller: 'AlbumCtrl'
        })
		.state('artist', {
            url: '/artist/:id',
            templateUrl: 'partial/artist/artist.html',
            controller: 'ArtistCtrl'
        })
		.state('register', {
            url: '/register/:ref',
            templateUrl: 'partial/register/register.html',
            controller: 'RegisterCtrl'
        })
}]);