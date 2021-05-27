/**
 * Express setup to handle routing.
 */

'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const reportGenerator = require('./lib/reportGenerator');
const middlewares = require('./middlewares');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Report generator request handler that returns a PNG tree map.
 *
 * @param   {String}  /report.png  [Filename for the tree map]
 * @param   {Object}  req          [request]
 * @param   {Object}  res          [response]
 */
app.get('/report.png', (req, res) => {
  reportGenerator.get()
    .then((img) => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    }
    ).catch((e) => {
      res.status(500);
      console.error(e);
    });
});

// not found
app.use(middlewares.notFound);

// general errors
app.use(middlewares.errorHandler);

module.exports = app;