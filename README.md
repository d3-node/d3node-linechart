## LineChart

LineChart generator in node.js.

## Install

```bash
npm install d3node-linechart
```

## Usage

```js
const d3nLine = require('d3node-linechart');
const line = d3nLine(data, selector, container, style)
```

Check out the [examples](./examples) for usage.

##### Output the example visualization

```
git clone <this repo url>
npm install
npm start
```

## Output Preview (png):

![Single line chart](./examples/output.png)
![Multi line chart](./examples/output-multiline.png)


## API

### d3nLine({ data[, selector, container, style] })

#### options

##### data

- Type: `Array`

Data from file or web processed by d3 library.

Single line is of the form `[ { key: x, value: y }, ...]`

Multiline is of the form `[ "keys": [all, possible, x's, ...], [ { key: x, value: y }, ...], ...]`.

Examples:

- Single line:

```js
[ { key: 0, value: 3 }, { key: 1, value: 2 }, { key: 2, value: 1 } ]
```

- Multiline:

```js
[ "keys": [0, 1, 2],
   [ { key: 0, value: 3 }, { key: 1, value: 2 }, { key: 2, value: 1 } ],
   [ { key: 0, value: 1 }, { key: 1, value: 2 }, { key: 2, value: 3 } ]]
```

##### selector

- Type: `String`
- Default: `'#chart'`

DOM selector in container.

##### container

- Type: `String`
- Default: `<div id="container"><h2>Line Chart</h2><div id="chart"></div></div>`

DOM contain the visualization result.

##### style

- Type: `String`<br>
- Default: `''`

Linechart style.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


### LICENSE

[MIT](LICENSE) &copy; [d3-node](https://github.com/d3-node)
