app.filter('cover', function () {
    return function (input) {
        if (input) return input;
        /* Cover URL does not exist, return a default avatar */
        return "http://lh4.googleusercontent.com/-MNyRU_eTqNg/UskAvLai-PI/AAAAAAAAAME/9hQu-Xh_JKs/s300/default-avatar.png";
    };
});