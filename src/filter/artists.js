app.filter('artists', function () {
    return function (input) {
        var result = "";
        for (var i = 0; i < input.length - 1; i++) {
            result += input[i].name + " & ";
        }
        result += input[input.length - 1].name;
        return result;
    };
});