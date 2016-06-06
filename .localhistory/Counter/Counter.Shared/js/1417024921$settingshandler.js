function SettingsHandler(handler) {
    this.handler = handler;

    this.getValue = function (name) {
        return this.handler.values[name];
    };

    this.setValue = function(name, value) {
        this.handler.values[name] = value;
    }
}