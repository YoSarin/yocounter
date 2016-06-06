function recalculateColumns() {
    var width = Math.floor(Math.max($('#counters').width() / Object.keys(Counter.list).length, 200));
    var columns = Math.floor($('#counters').width() / width);
    width = Math.floor(Math.max($('#counters').width() / columns, 200));
    $('.counter').css('width', width + 'px');
}