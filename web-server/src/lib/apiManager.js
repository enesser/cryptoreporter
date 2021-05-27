/**
 * API Manager: manages Nomics API requests
 * https://p.nomics.com/cryptocurrency-bitcoin-api
 */

'use strict';

const https = require('https');

// API key: see https://p.nomics.com/cryptocurrency-bitcoin-api
const api_key_nomics = process.env.API_KEY_NOMICS;

// default tickers
const default_tickers = 'BTC,ETH,BNB,XRP,DOGE,ADA,USDT,DOT,BCH,LTC,ETC,ETH2,ANKR,GRT,SAFEMOON,AAVE,ALGO,ICP,ADA,VET,TRX,ECP,MATIC';

// Nomics URL request template
const url_request = `https://api.nomics.com/v1/currencies/ticker?key=${api_key_nomics}&interval=1d`;

/**
 * Get Nomics API data for tickers for past 24 hour period. 
 * @param   {String}  tickers  [comma separated ticker values]
 * @return  {Promise}          
 */
const get = (tickers) => {
    console.log('got tickers: ', tickers);
    const request_tickers = tickers || default_tickers;
    const url = `${url_request}&ids=${request_tickers}`;
    console.log('Requesting from API:', url);
    return initRequest(url);
};

/**
 * Initialize HTTPS request to Nomics API.
 * @param   {String}  url  [API URL with API key]
 * @return  {Promise}       
 */
const initRequest = (url) => {
    return new Promise((resolve, reject) => {

        // initialize API request
        https.get(url, (response) => {
            let responseData = '';

            // on received data chunk
            response.on('data', (chunk) => {
                responseData += chunk;
            });

            // end
            response.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    console.error(e);
                    reject(e);
                }
            });

            // error
            response.on('error', (e) => {
                console.error(e);
                reject(e);
            });
        });
    });
}

module.exports = { get };