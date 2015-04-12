app.controller("SearchCtrl", function ($scope, $http, API, $location, $timeout) {
    $scope.search = function (query) {
        $location.path("search/" + query);
    };

    var _timeout;
    /* AutoComplete if user has stopped typing for 400ms */
    $scope.autoComplete = function (query) {
        /* If we have a timeout in process, cancel it */
        if (_timeout) {
            $timeout.cancel(_timeout);
        }
        /* Delay before sending query */
        _timeout = $timeout(function(){
            $scope.ACRes = null;
            API.search(query, function (res) {
                $scope.ACRes = res;
            });
            _timeout = null;
        },400);        
    };    
});