app.filter('datetime', function () {
    return function (input) {
        var t = new Date(input);        
        return t.toString();
    };
});