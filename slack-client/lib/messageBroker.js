/**
 * Message broker: allows for sending and receiving messages
 */

'use strict';

const { dotenv } = require('dotenv').config();
const events  = require('events');
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

/**
 * Constants 
 */
const CHANNEL_NAME = process.env.CHANNEL_NAME || '#cryptocurrencies';
const BOT_NAME = process.env.BOT_NAME || 'CryptoBot';
const PORT = process.env.PORT || 3000;

/**
 * Start listener (on slacks/events)
 *
 * @param   {Integer}  port to listen on
 */
slackEvents.start(PORT).then(() => {    
    console.log(`Server listening on port ${PORT}`);
});

// log errors
slackEvents.on('error', console.error);

// create new event listener
let eventListener = new events.EventEmitter();

// initialize web client
const web = new WebClient(process.env.SLACK_TOKEN);

/**
 * On message received event.
 * 
 * @param   {Object}  event information 
 */
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);    

    (async () => {
        const userInfo = await web.users.info({ user: event.user });

        if (userInfo.user.name !== BOT_NAME) {            
            eventListener.emit('message', { event, userInfo });                        
        }
    })();
});

/**
 * Send a message.
 *
 * @param   {String}  message to send.
 * @param   {Function}  callback function to invoke after message is successfully sent.
 */
let sendMessage = (message, callback) => {
    (async () => {
        try {
            const response = await web.chat.postMessage({
                channel: CHANNEL_NAME,
                text: message,
            });

            if (callback) {
                callback(response);
            }

        } catch (error) {
            console.log(error);
        }
    })();
};

module.exports = { sendMessage, eventListener };