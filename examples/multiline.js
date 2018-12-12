const output = require('d3node-output');
const d3nLine = require('../');

const data = [ [ { key: 0, value: 3 }, { key: 1, value: 2 }, { key: 2, value: 1 } ], [ { key: 0, value: 1 }, { key: 1, value: 2 }, { key: 2, value: 3 } ]];
data["allkeys"] = [0, 1, 2];

// create output files
output('./examples/output-multiline', d3nLine({
  data: data,
  container: `<div id="container"><h2>Multiline Example</h2><div id="chart"></div></div>`,
  lineColors: ['steelblue', 'darkorange'],
  width: 800,
  height: 570,
}));
