/*Stacked Area Chart.*/
$(function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var x = d3.scale.linear()
      .range([0, width]);
  var y = d3.scale.linear()
      .range([height, 0]);
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  var color = d3.scale.category20();
  var area = d3.svg.area()
      .x(function(d) { return x(d.TIME_SPAN); })
      .y0(function(d) {return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); });

  var stack = d3.layout.stack()
	  .values(function(d) {
		  return d.values; });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("MultipleProtocol.tsv", function(error, data) {
  	color.domain(d3.keys(data[0]).filter(function(key) {return key != "TIME_SPAN"; }));

    data.forEach(function(d) {
		d.TIME_SPAN = parseInt(d.date);
	});
  	  //TODO what does name and d[name] means???   and browsers???
	  var browsers = stack(color.domain().map(function(name) {
		  return {
			  name : name,
		      values : data.map(function(d) {
				  return {TIME_SPAN: d.TIME_SPAN, y:d[name]/2900000};
			  })
		  };
	  }));
	  //	console.log(browsers);
    x.domain(d3.extent(data, function(d) { return d.TIME_SPAN; }));
    //TODO  what does this browser mean?
	var browser = svg.selectAll(".browser")
			.data(browsers)
			.enter().append("g")
			.attr("class","browser");
	
	browser.append("path")
			.attr("class", "area")
			.attr("d", function(d) {return area(d.values); })
			.style("fill", function(d) {return color(d.name); });

	browser.append("text")
		.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
		.attr("transform", function(d) { return "translate(" + x(d.value.TIME_SPAN) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
        .attr("x", -6)
		.attr("dy", ".35em")
        .text(function(d) { return d.name; });
	
	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
	});
});

// DNS protocol 
$(function() {
  var target_protocol = "DNS";
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var color = d3.scale.category20();

  var area = d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(height)
      .y1(function(d) { return y(d.y); });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

  d3.tsv("MultipleProtocol.tsv", function(error, data) {
    data = data.map(function(d) {
      d.x = parseInt(d.TIME_SPAN);
      d.y = parseInt(d.DNS);
      return d;
    });

    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain([0, d3.max(data.map(function(d) { return d.y; })) * 1.1]);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", function(d) { return color(2); });

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("x", width-65)
        .attr("y", 25)
        .attr("height", 300)
        .attr("width", 300);

  legend.append("rect")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", color(2));

    legend.append("text")
      .attr("x", width-65)
      .attr("y", 25)
	  .style("font-size","16px")
      .text("DNS");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
  });

});

// TCP protocol.
$(function() {
  var target_protocol = "TCP";
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var color = d3.scale.category20();

  var area = d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(height)
      .y1(function(d) { return y(d.y); });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("MultipleProtocol.tsv", function(error, data) {
    data = data.map(function(d) {
      d.x = parseInt(d.TIME_SPAN);
      d.y = parseInt(d.TCP);
      return d;
    });

    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain([0, d3.max(data.map(function(d) { return d.y; })) * 1.1]);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", function(d) { return color(0); });

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("x", width-65)
        .attr("y", 25)
        .attr("height", 300)
        .attr("width", 300);

    legend.append("rect")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", color(0));

    legend.append("text")
      .attr("x", width-65)
      .attr("y", 25)
	  .style("font-size","16px")
      .text(target_protocol);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
  });

});


