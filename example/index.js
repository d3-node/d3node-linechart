const fs = require('fs');
const output = require('d3node-output');
const d3 = require('d3-node')().d3;
const d3nLine = require('../');

const parseTime = d3.timeParse('%d-%b-%y');
const tsvString = fs.readFileSync('data/data.tsv').toString();
const data = d3.tsvParse(tsvString, d => {
  return {
    key: parseTime(d.date),
    value: +d.close
  };
});

// create output files
output('./example/output', d3nLine({ data: data }));
