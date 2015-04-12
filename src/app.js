var app = angular.module("MusicApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'partial/search/search.html'
        }).
        when('/profile/:uid', {
            templateUrl: 'partial/profile/profile.html',
            controller: 'ProfileCtrl'
        }).
        when('/search/:query', {
            templateUrl: 'partial/result/result.html',
            controller: 'ResultCtrl'
        }).
        when('/song/:id', {
            templateUrl: 'partial/song/song.html',
            controller: 'SongCtrl'
        }).
        when('/album/:id', {
            templateUrl: 'partial/album/album.html',
            controller: 'AlbumCtrl'
        }).
        when('/artist/:id', {
            templateUrl: 'partial/artist/artist.html',
            controller: 'ArtistCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);