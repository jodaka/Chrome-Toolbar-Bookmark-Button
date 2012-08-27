
var Settings = (function(){

    var self = {};

    self.bookmark_icon = (window.localStorage.getItem('toolbar_bookmark_icon'))
                        ? window.localStorage.getItem('toolbar_bookmark_icon')
                        : 'default';

    if (self.bookmark_icon === 'default') {
        document.getElementById('bookmark_icon_def').checked = 'checked';
    } else {
        document.getElementById('bookmark_icon_favicon').checked = 'checked';
    }

    // display current value
    self.bookmark_url = window.localStorage.getItem('toolbar_bookmark_url');

    document.getElementById('bookmark_url').value = self.bookmark_url;


    self.translate = function() {

        document.title = chrome.i18n.getMessage('cfg_title');

        // translating all i18n elements
        var i18n = document.getElementsByClassName('i18n');

        for (var i = 0, len = i18n.length; i < len; i++) {

            var id = i18n[i].id;
            var trans = chrome.i18n.getMessage(id);

            if (trans) {
                if (i18n[i].nodeName === 'SPAN' || i18n[i].nodeName === 'LABEL' || i18n[i].nodeName === 'A') {
                    i18n[i].innerHTML = trans;
                    continue;
                }
                if (i18n[i].nodeName === 'INPUT' || i18n[i].nodeName === 'BUTTON') {
                    i18n[i].value = trans;
                    continue;
                }
                console.warn('Don\'t know how to handle translation for '+i18n[i].nodeName);
            } else {
                console.warn('No translation for '+id);
            }
        }
    };

    // saving new value
    self.save = function() {
        var url = document.getElementById('bookmark_url').value;

        if (url !== '') {
            window.localStorage.getItem('toolbar_bookmark_icon');

                // ask background process to update icon
                chrome.extension.sendRequest({
                    action          : 'save_bookmark',
                    bookmark_url    : url,
                    bookmark_icon   : self.bookmark_icon
                });
        }
    };

    self.reset_icon = function() {
        chrome.extension.sendRequest({action: 'reset_icon'});
    };

    return {
        setBookmarkIcon: function(val) {
            self.bookmark_icon = val;
        },

        save: self.save,
        translate: self.translate
    };

}());


document.addEventListener('DOMContentLoaded', function() {

    //document.querySelector('button').addEventListener('click', clickHandler);

    // saving
    document.getElementById('cfg_save').addEventListener('click', Settings.save);

    // close
    document.getElementById('cfg_close').addEventListener('click', function() {
        window.close();
        return false;
    });

    document.getElementById('bookmark_icon_favicon').addEventListener('click', function() {
        Settings.setBookmarkIcon('favicon');
    });

    document.getElementById('bookmark_icon_def').addEventListener('click', function() {
        Settings.setBookmarkIcon('default');
    });

    Settings.translate();
});