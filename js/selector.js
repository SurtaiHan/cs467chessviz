var show = function() {};
var selectFieldSize = 48;
var selection = []
for (var i = 0; i < 12; i++) {
    selection.push({
        x: i % 6,
        y: Math.floor(i / 6),
        piece: pieces.NONE,
        selected: false
    });
};

selection[0].piece = pieces.BLACK_PAWN
selection[1].piece = pieces.BLACK_KNIGHT
selection[2].piece = pieces.BLACK_BISHOP
selection[3].piece = pieces.BLACK_QUEEN
selection[4].piece = pieces.BLACK_KING
selection[5].piece = pieces.BLACK_ROOK

selection[6].piece = pieces.WHITE_PAWN
selection[6].selected = true
selection[7].piece = pieces.WHITE_KNIGHT
selection[7].selected = true
selection[8].piece = pieces.WHITE_BISHOP
selection[9].piece = pieces.WHITE_QUEEN
selection[10].piece = pieces.WHITE_KING
selection[11].piece = pieces.WHITE_ROOK

$(document).ready(function() {
    var div = d3.select("body")
        .append("div")
        .style("display", "block")
        .style("margin", "auto")
        .style("margin-bottom", "20px")
        .style("margin-top", "0px")
        .style("width", 6 * selectFieldSize + "px")
        .style("height", 2 * selectFieldSize + "px");

    var svg = div.append("svg")
         .attr("height", boardSize / 4 + "px")
         .attr("width", boardSize * 6 / 8 + "px");

    var fields = svg.selectAll(".fields");
    var piece = fields.data(selection).enter().append("g");

    piece.append("rect")
         .style("class", "fields")
         .style("class", "rects")
         .attr("x", function (d) {
             return d.x*selectFieldSize;
         })
         .attr("y", function (d) {
             return d.y*selectFieldSize;
         })
         .attr("width", selectFieldSize + "px")
         .attr("height", selectFieldSize + "px")
         .style("fill", function (d) {
             if ( ((d.x%2 == 0) && (d.y%2 == 0)) ||
                  ((d.x%2 == 1) && (d.y%2 == 1))    )
                 return "beige";
             else
                 return "tan";
         });

    var clear = function() {
        svg.selectAll("text").remove();
    };

    var draw = function() {
        clear();
        piece.append("text")
            .attr("x", function (d) {
                return d.x*selectFieldSize;
            })
            .attr("y", function (d) {
                return d.y*selectFieldSize;
            })
            .style("font-size", "45")
            .attr("text-anchor", "middle")
            .attr("dy", "38px")
            .attr("dx", "24px")
            .attr("opacity", function(d) {
                return d.selected ? 1 : 0.5;
            })
            .style("stroke-width", "2px")
            .style("stroke", function(d) {
                return d.piece.name.startsWith("White")
                    ? "black"
                    : "none";
            })
            .attr("fill", function(d) {
                return d.piece.name.startsWith("White")
                    ? "white"
                    : "black";
            })
            .on("click", function(d) {
                d.selected = !d.selected;
                draw();
                show(Math.round(slider.value()));
            })
            .text(function (d) {
                return d.piece.code;
            });
    };
    draw();
});
