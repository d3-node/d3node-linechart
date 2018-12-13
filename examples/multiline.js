const output = require("d3node-output");
const d3nLine = require("../");

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomData(lines = 3, n = 6, max = 100, min = 0) {
  const data = [];
  data.allKeys = Array.from(new Array(n).keys());
  for (let i = 0; i < lines; ++i) {
    data.push([...data.allKeys].map(key => ({ key, value: randomNumber(min, max) })));
  }
  return data;
}

const data = generateRandomData();
console.log(data);

// create output files
output(
  "./examples/output-multiline",
  d3nLine({
    data: data,
    container: `<div id="container"><h2>Multiline Example</h2><div id="chart"></div></div>`,
    lineColors: ["steelblue", "darkorange"],
    width: 800,
    height: 570
  })
);
