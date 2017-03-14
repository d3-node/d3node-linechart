const D3Node = require('d3-node');

const defaultContainer = `
<div id="container">
  <h2>Line Chart</h2>
  <div id="chart"></div>
</div>
`;
const defaultStyle = `
.axis path,.axis line {fill: none;stroke: #000;shape-rendering: crispEdges;}
.area {fill: lightsteelblue;}
.line {fill: none;stroke: steelblue;stroke-width: 1.5px;}
.dot {fill: white;stroke: steelblue;stroke-width: 1.5px;}
`;

function line(selector = '#chart', container = defaultContainer, style = defaultStyle/*, options*/) {

  const d3n = new D3Node({
    selector: selector,
    svgStyles: style,
    container: container
  });

  const d3 = d3n.d3;

  // adapted from: https://bl.ocks.org/mbostock/3883245
  ///-- start D3 code

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3n.createSVG()
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%d-%b-%y");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var lineChart = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  d3.tsv("./data/data.tsv", function(d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
  }, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", lineChart);
  });
  /// -- end D3 code

  return d3n;
}

module.exports = line;
