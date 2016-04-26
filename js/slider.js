var show = function(move) {};

$(document).ready(function() {
    var value  = 0;
    var slider = d3.slider();
    slider.min(0).max(50).ticks(25).showRange(true).value(0);
    slider.callback(function() {
        var next = Math.round(slider.value());
        if (next == value) {
            return;
        }
        value = next;
        show(value);
    });
    d3.select('#slider').call(slider);
});
