var Log = {
    log: function (message, color) {
        var line = '<div style="background-color: #' + color + ';"><small>' + Date.now() + '</small> <b>' + message + '</b></div>'
        $('#log').html(line + $('#log').html())
    },
    error: function (message) {
        console.error(message);
        this.log(message, 'f99');
    },
    warning: function (message) {
        console.warn(message);
        this.log(message, 'f92');
    },
    info: function (message) {
        console.info(message);
        this.log(message, '9f9');
    }
};