$("document").ready(function () {
    var storage = new Storage();

    Style.switchTo(storage.get('style'));

    Counter.setStorage(storage);
    Counter.recreate();

    Style.populateSwitch(storage);

    $('.reapplyStyle').click(function () {
            Style.reApply();
            return false;
    });

    $('.toggleHidden').click(function () {
        $('#' + $(this).attr('rel')).toggleClass('hidden');
        if (!$('#' + $(this).attr('rel')).hasClass('hidden')) {
            $('#' + $(this).attr('rel')).find('.focus').first().focus();
        }
    });

    $('.addCounter').click(function () {
        var name = $('#' + $(this).attr('rel')).val();
        $('#' + $(this).attr('rel')).val('');
        c = new Counter(name);
    });

    $("#setName").on("keyup", function (e) {
        if (e.which == 13) {
            $('.addCounter').click();
        }
    });

    $(window).resize(function () {
        recalculateColumns();
    });

    $(".hexagon").click(function () {
        Log.info("clicked!");
    });
});