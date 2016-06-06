function recalculateColumns() {
    $("#counters").css('column-count', Math.min(Object.keys(Counter.list).length, $(window).width() / 300));
}