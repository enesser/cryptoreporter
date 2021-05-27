# Crypto Reporter: Web Server

Web-based cryptocurrency reporter depicting gains and losses of selected coins in a graph.

![Screenshot](./docs/report-sample.png)

Demo: [https://cryptoreporter-web.herokuapp.com/report.png](https://cryptoreporter-web.herokuapp.com/report.png)

This is the web server module for Crypto Reporter. It will render a D3 tree map depicting gains and losses of your requested coin ticker symbols. The sizes of the boxes depict the size of the gain or loss over a 24 hour period.

This project was built for use in a Slack bot, but it is modular enough to be used in any way you see fit.

Price information is provided by the great folks at [Nomics](https://nomics.com/). Please see their site for API key information.

## Technology 

Crypto Reporter's web module uses:

* [Nomics](https://nomics.com/) for price information
* [Express](https://github.com/expressjs/express) as a web server
* [D3](https://github.com/d3/d3) to draw the graph
* [Sharp](https://github.com/lovell/sharp) to convert the SVG to a PNG file 
  * _Slack can't render SVGs, so PNG was used. SVG is preferable if you only want to use this on the web or another platform._

## File Structure

```
|-- index.js                          # entry point
|-- app.js                            # main app
|-- lib/                              # library support files
|   |-- apiManager.js                 # API manager for Nomics
|   |-- dataMapper.js                 # maps Nomics data to D3 for hierarchal tree map
|   |-- reportGenerator.js            # generates a PNG report from requested coin tickers
|   |-- treeMapGenerator.js           # D3 tree map generator
```

## Setup

```
npm install
```

## Configuration

In your .env file or environment variables:

```
API_KEY_NOMICS=(your API key)         # https://p.nomics.com/cryptocurrency-bitcoin-api
TICKERS=BTC,ETH,ETH2                  # comma-separated list of tickers to report on, optional
NODE_ENV=development                  # development | production
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

Once running, navigate to `http://localhost:5000/report.png`

## Contributions

Contributions are always welcome. <3

## Donations 

| Coin | Address                                                    |
| ---- | ---------------------------------------------------------- |
| BTC  | 1NjGKNoVNo8n6TujBU4WWEavw2k8QqHZJa                         |
| ETH  | 0xB4c270C298789e2138f11752e74715F852D2c867                 |
| ADA  | addr1v9skh5uvzme33pevctnfl57qdvv54azwn6wme84l75qj6ggq6dual |
| ANKR | 0xB2770e95aE4C6e16B4C307867Fb2D3bE1Dbb309f                 |