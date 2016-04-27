var show = function(move) {};
var slider;

$(document).ready(function() {
    var value  = 0;
    slider = d3.slider();
    slider.min(0).max(164).ticks(41).showRange(true).value(0);
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
