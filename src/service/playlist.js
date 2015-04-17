app.factory('Playlist', function ($rootScope, Player) {
    /* List of {id, name, preview_url, artists[], album.name, album.id} */
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
            $rootScope.$emit('playlistUpdated');
            //console.log(pos);
            //console.log(index);            
            if (index == pos) {
                /* Remove current track */

                if (pos >= list.length) {
                    /* End of playlist */
                    /* move position */
                    pos--;
                    $rootScope.$emit('playlistProgress');
                    /* Seek to end of track, trigger playerEnded */
                    Player.changeProgress(Player.getDuration());
                } else {
                    /* Start playing next track */
                    Player.startPlaying(list[pos].preview_url);
                }
            } else {
                /* Not remove current track */
                if (index < pos) {
                    /* remove an item before current */
                    pos--;
                    $rootScope.$emit('playlistProgress');
                }
            }
            localStorage.setItem(itemStr, JSON.stringify(list));            
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
        },

        set: function (l) {
            /* Clone the array as arrays are passed by reference */
            list = l.slice();
            pos = 0;
            localStorage.setItem(itemStr, JSON.stringify(list));
            $rootScope.$emit('playlistUpdated');
            $rootScope.$emit('playlistProgress');
        }
    };
});