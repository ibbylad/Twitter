/**
 * MDN - Working with JSON
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
 */

/**
 * To use:
 * 1. Run 'NPM install' to install dependencies
 * 2. Change the config as necessary
 * 3. Run 'node stream' to run stream.js
 * 4. Check the output file
 */

/**
 * Import the required Node modules and JS data from external files
 */
const fs = require('fs'),
    keys = require('./twitter-config'),
    Twitter = require('twitter');

/**
 * Initialise config object
 * This contains:
 *  1. The name of the file to read and write to
 *  2. The maximum number of tweets to be used
 *  3. The keyword to track on Twitter
 */
const config = {
    "output": "tweets.json",
    "max_tweets": 30,
    "params": {
        "track": "football"
    },
    "twitter": keys
}

/**
 * Create a global data variable.
 * Check to see if data file exists.
 * If it does, read the file.
 */
let data;
if (fs.existsSync(config.output)) {
    data = fs.readFileSync(config.output);
}

/**
 * Try to parse the data variable.
 * If it cannot be parsed, create a new array.
 */
let tweets;
try {
    tweets = JSON.parse(data);
} catch (err) {
    if (err) tweets = [];
}

/**
 * Initialise the Twitter client with the API keys
 */
const client = new Twitter(config.twitter);

/**
 * Launch stream and handle data
 */
const stream = client.stream('statuses/filter', config.params, stream => {

    /**
     * When the stream receives a "data" event, it has discovered a new tweet.
     * Push the tweet to the tweets array.
     * If the arrays length is greater than or equal to 100,
     * get rid of all but the last item.
     * Then write the to the file defined in the config.
     */
    stream.on('data', event => {
        tweets.push(event);
        if (tweets.length > config.max_tweets) {
            tweets = tweets.slice(tweets.length - 1);
        }
        /**
         * JSON.stringify converts the variable in the first argument to a string,
         * and the third argument defines the number of spaces to use as indentation.
         * This allows the array to be easily readable, or "pretty-printed".
         * The callback function just throws any errors.
         */
        fs.writeFile(config.output, JSON.stringify(tweets, null, 4), err => {
            if (err) throw err;
        });
        console.log(`There are ${tweets.length} tweets in ${config.output}.\n`);
    });

    /**
     * If the stream receives an "error" event, throw the error
     */
    stream.on('error', err => {
        throw err;
    });

});
