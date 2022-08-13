const D3Node = require('d3-node');

function line({
  data,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 960,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 60, left: 30 },
  lineWidth: _lineWidth = 1.5,
  lineColor: _lineColor = 'steelblue',
  lineColors: _lineColors = ['steelblue'],
  isCurve: _isCurve = true,
  tickSize: _tickSize = 5,
  tickPadding: _tickPadding = 5,
  xTickValues: _xTickValues = null,
  yTickValues: _yTickValues = null,
} = {}) {
  const d3n = new D3Node({
    selector: _selector,
    svgStyles: _style,
    container: _container,
  });

  const d3 = d3n.d3;

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  const svg = d3n.createSVG(_width, _height)
        .append('g')
        .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  const g = svg.append('g');

  const { allKeys } = data;
  const xScale = d3.scaleLinear()
      .domain(allKeys ? d3.extent(allKeys) : d3.extent(data, d => d.key))
      .rangeRound([0, width]);
  const yScale = d3.scaleLinear()
      .domain(allKeys ? [d3.min(data, d => d3.min(d, v => v.value)), d3.max(data, d => d3.max(d, v => v.value))] : d3.extent(data, d => d.value))
      .rangeRound([height, 0]);
  const xAxis = d3.axisBottom(xScale)
        .tickSize(_tickSize)
        .tickValues(_xTickValues)
        .tickPadding(_tickPadding);
  const yAxis = d3.axisLeft(yScale)
        .tickSize(_tickSize)
        .tickValues(_yTickValues)
        .tickPadding(_tickPadding);

  const lineChart = d3.line()
      .x(d => xScale(d.key))
      .y(d => yScale(d.value));

  if (_isCurve) lineChart.curve(d3.curveBasis);

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  g.append('g').call(yAxis);

  g.append('g')
    .attr('fill', 'none')
    .attr('stroke-width', _lineWidth)
    .selectAll('path')
    .data(allKeys ? data : [data])
    .enter().append("path")
    .attr('stroke', (d, i) => i < _lineColors.length ? _lineColors[i] : _lineColor)
    .attr('d', lineChart);

  return d3n;
}

module.exports = line;
