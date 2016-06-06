function recalculateColumns() {
    console.log($(window).width() / 300);

    console.log('Counter #' + Object.keys(Counter.list).length);

    $("#counters").css('column-count', Math.floor(Math.min(Object.keys(Counter.list).length, $(window).width() / 300)));
}