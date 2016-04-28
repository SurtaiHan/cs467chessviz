function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var hsv2rgb = function(h, s, v) {
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};

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

    var defs = svg.append("defs");

    defs
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
        .attr("d", "M0,-5L10,0L0,5");

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
             if ((d.x % 2 === 0 && d.y % 2 === 0) ||
                 (d.x % 2 === 1 && d.y % 2 === 1))
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

    var marker = function(color) {
        var val = guidGenerator();
        svg
            .append("svg:defs")
            .selectAll("marker")
            .data([val])
            .enter()
            .append("svg:marker")
            .attr({
                "id":"arrow",
                "viewBox":"0 -5 10 10",
                "refX":5,
                "refY":0,
                "markerWidth":4,
                "markerHeight":4,
                "orient":"auto"
            })
            .attr("id", String)
            .style("fill", color)
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        return "url(#" +val+ ")";
    };

    var clear = function() {
        svg.selectAll("text").remove();
        svg.selectAll("line").remove();
    };

    var occupied = {};

    show = function(move) {
        var selected = selection
            .filter(function(s) {
                return s.selected;
            })
            .map(function(s) {
                return s.piece.name;
            });
        if (stats[move].filter(function(m) {
            return selected.includes(m.name);
        }).length === 0) {
            move += 1;
        }
        var moves = stats[move].concat(stats[move + 1]);
        clear();
        console.log(selected);
        fields
            .data(moves)
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x * fieldSize;
            })
            .attr("y", function (d) {
                return d.y * fieldSize;
            })
            .style("font-size", "70")
            .attr("text-anchor", "middle")
            .attr("dy", "54px")
            .attr("dx", "32px")
            .attr("opacity", function(d) {
                return Math.min(d.weight * 2000, 1);
            })
            .style("stroke-width", "2px")
            .style("stroke", function(d) {
                return d.name.startsWith("White")
                    ? "black"
                    : "none";
            })
            .attr("fill", function(d) {
                return d.name.startsWith("White")
                    ? "white"
                    : "black";
            })
            .text(function (d) {
                if (!selected.includes(d.name)) {
                    return "";
                }
                if (d.x + "" + d.y in occupied) {
                    return;
                }
                occupied[d.x + "" + d.y] = 0;
                d.moves.forEach(function(move) {
                    var value = move.weight * 150;
                    var h = Math.floor((100 - value) * 120 / 100);
                    var s = Math.abs(value - 50) / 50;
                    var rgb = hsv2rgb(h, s, 1);
                    var arrow = marker(rgb);
                    svg
                        .append("line")
                        .attr("class", "arrow")
                        .attr("marker-end", arrow)
                        .attr("x1", d.x * fieldSize + 32)
                        .attr("y1", d.y * fieldSize + 32)
                        .attr("x2", move.x * fieldSize + 32)
                        .attr("y2", move.y * fieldSize + 32)
                        .attr("stroke", rgb)
                        .attr("opacity", move.weight * 100);
                });
                return codes[d.name];
            });
        occupied = {};
    };

    show(0);
});
