/**
 * Report Generator: generates a D3 tree map from requested ticker symbols.
 */

'use strict';

const sharp = require("sharp");
const apiManager = require('./apiManager');
const treeMapGenerator = require('./treeMapGenerator');
const dataMapper = require('./dataMapper');

// cache response for x seconds
const cache_response_for_seconds = 5;

let lastDate = new Date();
let cachedData = null;

/**
 * Get D3 tree map PNG stream as a buffer. 
 * @return  {Promise}          
 */
const get = () => {
    return new Promise((resolve, reject) => {

        if (((new Date() - lastDate) / 1000) >= cache_response_for_seconds || !cachedData) {
            lastDate = new Date();
            let data = null;

            apiManager.get(process.env.TICKERS).then((responseObject) => {
                data = dataMapper.map(responseObject);
                render();
            });

            /**
             * Render tree map from buffer.
             */
            const render = () => {
                const treeMapBuffer = Buffer.from(treeMapGenerator.get(data));
                sharp(treeMapBuffer)
                    .png()
                    .toBuffer((err, data, info) => {
                        cachedData = data;
                        resolve(data);
                    });
            };
        } else {
            resolve(cachedData);
        }
    });
};

module.exports = { get };
