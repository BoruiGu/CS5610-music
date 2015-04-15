app.factory('Playlist', function ($rootScope) {
    /* List of {id, name, preview_url, artists[], album.name} */
    var itemStr = 'playlist';
    /* Load playlist from localStorage */
    var list = JSON.parse(localStorage.getItem(itemStr));
    /* list is null */
    if (!list) {
        list = [];
    }
    var pos = 0;
    console.log('playlist loaded from storage');
    console.log(list);    

    return {
        getCurrent: function () {
            if (list.length > 0){
                return list[pos];
            }
            return null;
        },

        next: function () {
            pos++;
            if (pos >= list.length) {
                pos = 0;
            };
            $rootScope.$emit('playlistProgress');
        },

        prev: function () {
            pos--;
            if (pos < 0) {
                pos = list.length - 1;
            }
            $rootScope.$emit('playlistProgress');
        },

        seek: function (/**/) {

        },

        add: function (e) {
            list.push(e);
            /* Save playlist to localStorage */
            localStorage.setItem(itemStr, JSON.stringify(list));
            $rootScope.$emit('playlistUpdated');
        },

        remove: function (/**/) {

        },

        getList: function () {
            return list;
        },

        getPos: function () {
            return pos;
        },

        clear: function () {
            list = [];
            pos = 0;
            /* Save playlist to localStorage */
            localStorage.setItem(itemStr, JSON.stringify(list));
            $rootScope.$emit('playlistUpdated');
            $rootScope.$emit('playlistProgress');
        }
    };
});