$(document).ready(function() {
    var slider = d3.slider().min(0).max(50).ticks(25).showRange(true).value(0);
    d3.select('#slider').call(slider);
});
