var selected = ["Black Knight", "White Pawn"];

$(document).ready(function() {
    var div = d3.select("body")
        .append("div")
        .style("display", "block")
        .style("margin", "auto")
        .style("margin-top", marginTop + "px")
        .style("left", marginLeft + "px")
        .style("width", boardSize + "px")
        .style("height", boardSize + "px");

    var svg = div.append("svg")
         .attr("width", boardSize + "px")
         .attr("height", boardSize + "px");

    svg
        .append("defs")
        .append("marker")
        .attr({
            "id":"arrow",
            "viewBox":"0 -5 10 10",
            "refX":5,
            "refY":0,
            "markerWidth":4,
            "markerHeight":4,
            "orient":"auto"
        })
        .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("class","arrowHead");

    var fields = svg.selectAll(".fields");
    var piece = fields.data(board).enter().append("g");

    piece.append("rect")
         .style("class", "fields")
         .style("class", "rects")
         .attr("x", function (d) {
             return d.x*fieldSize;
         })
         .attr("y", function (d) {
             return d.y*fieldSize;
         })
         .attr("width", fieldSize + "px")
         .attr("height", fieldSize + "px")
         .style("fill", function (d) {
             if ( ((d.x%2 == 0) && (d.y%2 == 0)) ||
                  ((d.x%2 == 1) && (d.y%2 == 1))    )
                 return "beige";
             else
                 return "tan";
         });

    piece.append("text")
        .attr("x", function (d) {
            return d.x*fieldSize;
        })
        .attr("y", function (d) {
            return d.y*fieldSize;
        })
        .style("font-size", "70")
        .attr("text-anchor", "middle")
        .attr("dy", "54px")
        .attr("dx", "32px")
        .text(function (d) {
            return d.piece.code;
         });

    var clear = function() {
        svg.selectAll("text").remove();
        svg.selectAll("line").remove();
    };

    show = function(move) {
        var data = [
            [
                {
                    name: "Black Knight",
                    x: 3,
                    y: 3,
                    moves: [
                        {
                            x: 4,
                            y: 1,
                            weight: 0.9
                        },
                        {
                            x: 1,
                            y: 4,
                            weight: 0.3
                        }
                    ]
                }
            ],
            [
                {
                    name: "Black Knight",
                    x: 4,
                    y: 1,
                    moves: [
                        {
                            x: 6,
                            y: 2,
                            weight: 0.9
                        },
                        {
                            x: 2,
                            y: 0,
                            weight: 0.3
                        }
                    ]
                }
            ]
        ];
        clear();
        fields
            .data(data[move])
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x*fieldSize;
            })
            .attr("y", function (d) {
                return d.y*fieldSize;
            })
            .style("font-size", "70")
            .attr("text-anchor", "middle")
            .attr("dy", "54px")
            .attr("dx", "32px")
            .text(function (d) {
                if (!selected.includes(d.name)) {
                    return "";
                }
                d.moves.forEach(function(move) {
                    console.log(d);
                    svg
                        .append("line")
                        .attr("class", "arrow")
                        .attr("marker-end", "url(#arrow)")
                        .attr("x1", d.x * fieldSize + 32)
                        .attr("y1", d.y * fieldSize + 32)
                        .attr("x2", move.x * fieldSize + 32)
                        .attr("y2", move.y * fieldSize + 32)
                        .attr("opacity", move.weight);

                });
                return codes[d.name];
            });
    };

    show(0);
});
