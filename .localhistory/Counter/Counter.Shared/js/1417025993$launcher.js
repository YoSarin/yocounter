$("document").ready(function () {

    var settingsHandler = new SettingsHandler(Windows.Storage.ApplicationData.localSettings);
    Counter.setSettingsHandler(SettingsHandler);
    Counter.recreate();

    $('.toggleHidden').click(function () {
        $('#' + $(this).attr('rel')).toggleClass('hidden');
        if (!$('#' + $(this).attr('rel')).hasClass('hidden')) {
            $('#' + $(this).attr('rel')).find('.focus').first().focus();
        }
    });

    $('.addCounter').click(function () {
        var name = $('#' + $(this).attr('rel')).val();
        $('#' + $(this).attr('rel')).val('');
        $(this).closest('div').toggleClass('hidden');
        c = new Counter(name);
    });
});