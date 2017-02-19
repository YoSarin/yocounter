function Storage () {
    try {
        // win8 app
        Windows.Storage.ApplicationData.current.localSettings.values;
        this.storage = win8Storage;
        Log.info('win8Storage');
    } catch (e) {
        Log.warning('Windows.Storage.ApplicationData.localSettings.values: ' + e);
        if (typeof(localStorage) !== undefined) {
            // html5 storage
            this.storage = html5Storage;
            Log.info('html5Storage');
        } else {
            Log.info('fakt se mi to nechce implementovat přes cookies');
            this.storage = defaultStorage;
            Log.info('defaultStorage');
        }
    }

    this.get = function (name) { return this.storage.get(name); }
    this.set = function (name, value) { this.storage.set(name, value); }
}

var html5Storage = {
    get: function (name) { return localStorage.getItem(name); },
    set: function (name, value) { localStorage.setItem(name, value); }
};

var win8Storage = {
    get: function (name) { return Windows.Storage.ApplicationData.current.localSettings.values[name]; },
    set: function (name, value) { Windows.Storage.ApplicationData.current.localSettings.values[name] = value; }
};

var defaultStorage = {
    get: function (name) { },
    set: function (name, value) { }
};

