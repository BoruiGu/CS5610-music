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

        seek: function (index) {
            pos = index;
            $rootScope.$emit('playlistProgress');
        },

        add: function (e) {
            /* Not supported by most browsers */
            // var index = list.findIndex(function (ele) {
            //     return (ele.id == e.id);
            // });
            var index = -1;
            list.some(function (ele, i) {
                if (ele.id == e.id) {
                    index = i;
                    return true;
                }
                return false;
            });
            if (index != -1) {
                /* e in list, return its index */
                return index;
            } else {
                /* e not in list, push it */
                index = list.push(e) - 1;
                /* Save playlist to localStorage */
                localStorage.setItem(itemStr, JSON.stringify(list));
                $rootScope.$emit('playlistUpdated');
                return index;
            }
        },

        remove: function (index) {
            list.splice(index, 1);
            localStorage.setItem(itemStr, JSON.stringify(list));
            $rootScope.$emit('playlistUpdated');
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