const D3Node = require('d3-node');

function line({
  data,
  selector: defaultSelector = '#chart',
  container: defaultContainer = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: defaultStyle = '',
} = {}) {
  const d3n = new D3Node({
    selector: defaultSelector,
    svgStyles: defaultStyle,
    container: defaultContainer,
  });

  const d3 = d3n.d3;

  const margin = { top: 20, right: 20, bottom: 60, left: 30 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3n.createSVG()
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);


  const x = d3.scaleLinear()
      .rangeRound([0, width]);

  const y = d3.scaleLinear()
      .rangeRound([height, 0]);

  const lineChart = d3.line()
      .x(d => x(d.key))
      .y(d => y(d.value));

  x.domain(d3.extent(data, d => d.key));
  y.domain(d3.extent(data, d => d.value));

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .select('.domain');

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em');

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', lineChart);

  return d3n;
}

module.exports = line;
