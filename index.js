const D3Node = require('d3-node');

const defaultContainer = `
<div id="container">
  <h2>Line Chart</h2>
  <div id="chart"></div>
</div>
`;
const defaultStyle = '';

function line(data, selector = '#chart', container = defaultContainer, style = defaultStyle/*, options*/) {

  const d3n = new D3Node({
    selector,
    svgStyles: style,
    container,
  });

  const d3 = d3n.d3;

  // adapted from: https://bl.ocks.org/mbostock/3883245

  const margin = { top: 20, right: 20, bottom: 60, left: 30 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3n.createSVG()
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);


  const x = d3.scaleTime()
      .rangeRound([0, width]);

  const y = d3.scaleLinear()
      .rangeRound([height, 0]);

  const lineChart = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

  x.domain(d3.extent(data, d => d.date));
  y.domain(d3.extent(data, d => d.close));

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove();

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Price ($)');

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', lineChart);

  return d3n;
}

module.exports = line;
