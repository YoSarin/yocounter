$("document").ready(function () {
    Counter.setStorage(new Storage());
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

    $(window).resize(function () {
        recalculateColumns();
        $("#counters").css('column-count', Math.min(Object.keys(Counter.list).length, $(window).width() / 300));
    });
});