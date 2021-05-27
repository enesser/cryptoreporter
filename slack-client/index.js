/**
 * CryptoReporter: a cryptocurrency reporting tool for Slack 
 */

'use strict';

const reportManager = require('./lib/reportManager.js');

// initialize cryptoreporter
console.log('CryptoReporter for Slack starting up...');
reportManager.init();
