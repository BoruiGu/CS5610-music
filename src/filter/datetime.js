app.filter('datetime', function () {
    return function (input) {
        /* Covert to user's local time */
        var t = new Date(input);        
        return t.toString();
    };
});