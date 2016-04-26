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
         .attr("height", boardSize + "px")
         .selectAll(".fields")
         .data(board)
        .enter()
         .append("g");

    svg.append("rect")
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

    svg.append("text")
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
         })
        .append("title")
        .text(function(d) {
            return d.piece.name;
        });
});
