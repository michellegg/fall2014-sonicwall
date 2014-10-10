function render_axises (svg, x, y, height) {
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
}

function render_legends (svg, names, color, width) {
  var legend = svg.selectAll(".legend")
      .data(names).enter()
    .append("g")
      .attr("class", "legend")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("height", 300)
      .attr("width", 300);

  legend.append("rect")
    .attr("x", width - 65)
    .attr("y", function(name) { return 25 * names.indexOf(name); })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(name) { return color(name) });

  legend.append("text")
    .attr("x", width - 65)
    .attr("y", function(name) { return 25 * names.indexOf(name); })
    .text(function(name) { return name; });
}

function render_area_chart (margin, width, height, x, y, data, names, color) {
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var area = d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); });

  var stack = d3.layout.stack()
      .values(function(d) { return d.values; });

  var protocols = stack(names.map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {x: d.TIME_SPAN, y: d[name]};
      })
    };
  }));

  svg.selectAll(".protocol")
      .data(protocols).enter()
    .append("g")
      .attr("class", "protocol")
    .append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) { return color(d.name); });

  render_legends(svg, names, color, width);
  render_axises(svg, x, y, height);
}


$(function() {

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category20();

  d3.csv("data.csv", function(error, data) {
    // change value from string to int
    data = data.map(function(d) {
      var v = {};
      d3.map(d).forEach(function(key, value) {
        v[key] = parseInt(value);
      });
      return v;
    });

    var protocol_names = d3.keys(data[0]).filter(function(key) { return key !== "TIME_SPAN"; });

    // setup domains
    color.domain(protocol_names);
    x.domain(d3.extent(data, function(d) { return d.TIME_SPAN; }));
    y.domain(d3.extent(data, function(d) {
      return d3.sum(protocol_names.map(function(name) { return d[name]; })) * 1.1;
    }));

    // Stack protocols
    render_area_chart(margin, width, height, x, y, data, protocol_names, color);

    // Single protocol
    render_area_chart(margin, width, height, x, y, data, ["TCP"], color)
    render_area_chart(margin, width, height, x, y, data, ["TCP", "HTTP"], color)
  });

});
