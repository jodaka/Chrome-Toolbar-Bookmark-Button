var Bookmark = {
    current_url: '',

    Update: function(request) {
        console.log('-> Bookmark.Update');

        // Bookmark type
        Bookmark.icon.type = request.bookmark_icon;
        window.localStorage.setItem('toolbar_bookmark_icon', request.bookmark_icon);

        if (request.bookmark_url !== Bookmark.current_url) {
            window.localStorage.removeItem('toolbar_bookmark_url');
            window.localStorage.setItem('toolbar_bookmark_url', request.bookmark_url);
            Bookmark.current_url = request.bookmark_url;
            Bookmark.icon.reset();
        } else {
            Bookmark.icon.load();
        }
    },

    icon: {

        type: window.localStorage.getItem('toolbar_bookmark_icon'),

        // this is default icon returned by google s2.
        //def: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsElEQVQ4jaWTzU8TARDFf7bdfuy228K2RQrdWiCIUTSSEirqwWiIXrh58WCICSc88YdwwoPhrge9qImJeFBi+FAoB4kKEfloEcJaSrttWdptwQs0GL35TjPJvDdvZjLwnzh1HFy5O+IScg7/1d5Id7lyMLSbM2K6vu8G8HichXqva84qWB7NTK3Pmt5SevrZsFETuHJ3xOUypdD59sBgoVDub4sqQbVVUcpmFbtgJaoqjI8v7qylMppXcrz8svxrzBCKm9PPhg0bgJBz+M9fDAwW9yr3LlwKhaMRBUm009XZTHGvTCQk06L6lYXFTeXJ0zn3ubYAC58rj4CUBSDeG+nOFUv9DwZ6wtGIAkDZrDIzv16bNaiICIKVgfs9Yb1Y6o/3RroBLABV82DoTLg+GL+s1gimWcU0q9R5RQCKRoVszqDO60JtqguaZnWoJpDJGbG+vg6laFT+2PDNa+3Ikg0AyWXjbGuQlWSGO7fPKZldIwZgA9B1w93gl5ElG5Jop7nRR3Ojr0YGsFpgO50HoMEvk9cNd80BgCTaAYh3nWFjK0vZ/NPNMQTBCsDhUW47vvNKMi03BlRkyUbf9TYmE0mWjopaVD+NAZEb8Sjp7D5LPzQ8Hmeh5kDxiXNvxxd3Tnbq7AihpQto6QIz82t8+rwJgN/n5NWrhZ16nzhXExDsp0ZXUxltMpH8p22An1tZqgcwmUiyuZ3XnIJlFMAKYLFfK0bCPu/0x7VI4LTsVUNeHHYLgiCgHS2usyPE0orG47GplOxxPE8kfr5Y//FatwKEum6Zu2nze9Np2T71cU2ZnU9ZnG6HmM3tsaXp6Pl93k8s77yb+L4uexzPvy3/GiuJxvbG1zeVv56pN67GStWDh5ldI5bP77sPDw/xeJwFf50063DZRic/rCZOPtN/4zedKxPebhBitwAAAABJRU5ErkJggg==",

        def: "data:image/png;base64,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dGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjEuMiI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MTwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTUyPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNzA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJq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",

        // it will try to load Icon from cache and if failed - will get icon from web
        load: function() {

            console.log('-> Bookmark.icon.load');
            var cached_icon = Bookmark.icon.cache;

            if (cached_icon) {

                if (cached_icon === Bookmark.icon.def || Bookmark.icon.type === 'default') {
                    // load our own default Girl Icon
                    chrome.browserAction.setIcon({path: 'icon_18.png'});
                } else {
                    chrome.browserAction.setIcon({path: cached_icon});
                }

            } else {
                Bookmark.icon.reset();
            }
        },

        get cache() {
            var res = window.localStorage.getItem('icon_cache');
            return (res)
                ? JSON.parse(res)
                : false;
        },

        set cache(data) {
            if (data) {
                window.localStorage.setItem('icon_cache', JSON.stringify(data));
            }
        },

        reset: function(url) {
            console.log('-> Bookmark.icon.reset');

            if (!url) {
                url = window.localStorage.getItem('toolbar_bookmark_url');
            }
            var can = document.getElementById('canvas');
            var ctx = can.getContext('2d');
            var img = new Image();

            img.onload = function(e){
                can.width = img.width;
                can.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                Bookmark.icon.cache = can.toDataURL("image/png");
                Bookmark.icon.load();
            };

            if (!url) {
                url = '';
            }
            if (url.match(/^http:\/\//)) {
                url = url.replace(/^http:\/\//, '');
            }
            var parts = url.split('/');
            img.src = 'http://s2.googleusercontent.com/s2/favicons?domain='+parts[0];
        }
    },

    Click: function() {

        console.log('-> Bookmark.Click');
        // should check for already opened settings here...
        var bookmark_url = window.localStorage.getItem('toolbar_bookmark_url');

        if (bookmark_url) {

            if (!bookmark_url.match(/^chrome:/) && !bookmark_url.match(/http:\/\//)) {
                bookmark_url = 'http://'+bookmark_url;
            }
            chrome.tabs.create({url: bookmark_url});
        } else {
            chrome.tabs.create({url: chrome.extension.getURL('settings.html')});
        }
    }
};

// add listener to communicate with settings page
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'reset_icon') {
            Bookmark.icon.reset();
        }
        if (request.action === 'save_bookmark') {
            Bookmark.Update(request);
        }
    }
);


// bind Iconv click event
chrome.browserAction.onClicked.addListener(function(tab){
    Bookmark.Click();
});

chrome.browserAction.setTitle({title: chrome.i18n.getMessage('goto_bookmark')});
//chrome.browserAction.setBadgeText({text: chrome.i18n.getMessage('goto_bookmark')});

Bookmark.icon.load();