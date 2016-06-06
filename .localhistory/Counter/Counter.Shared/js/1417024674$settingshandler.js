function SettingsHandler(handler) {
    this.handler = handler;

    this.getValue =function (name)
    {
        return this.handler.values()
    }
}