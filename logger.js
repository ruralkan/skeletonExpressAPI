/*
   Copyright 2018 Makoto Consulting Group, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
// Example 3 - Multiple transports
// require Winston
const winston = require('winston');

// LOGGING
const myFormat = winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.File({
            level: 'debug',
            format: winston.format.combine(winston.format.timestamp(), myFormat),  // winston.format.json(),
            filename: './logs/log.log',
            HandleExceptions: true,
            exitOnError: true,
            json: false,
            maxsize: 104857600,
            maxFiles: 5
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),  // winston.format.json(),
            handleExceptions: true,
            exitOnError: true
        })
    ]
};

// Create the logger
const logger =  winston.createLogger(logConfiguration);



//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
/*if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'error',
        handleExceptions: true,
        exitOnError: true
    }));
  }

*/
// Log some messages
module.exports = logger
