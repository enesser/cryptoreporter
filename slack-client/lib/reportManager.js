/**
 * Report Manager: manages crypto reports
 */

'use strict';

const { sendMessage, eventListener } = require('./messageBroker');
const REPORT_URL = process.env.REPORT_URL;
const REQUEST_REPORT_COMMAND = 'show status';
let lastResponse = new Date();

console.log('report manager up.');

let init = () => {
    eventListener.on('message', (data) => {

        if ((new Date() - lastResponse) / 1000 > 0) {
            lastResponse = new Date();
            console.log('received message', data);
            if (data.event.text.match(new RegExp(`^${REQUEST_REPORT_COMMAND}$`, 'i'))) {
                sendMessage(`
                Current cryptocurrency market prices (past 24 hours).
                ${REPORT_URL}?ts=${encodeURIComponent(new Date().toISOString()).replace(/\./g, '')}
                `
                );
            };
        }
    });
};

module.exports = { init };