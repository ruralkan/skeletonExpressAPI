import express from 'express';
import open from 'open';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import expressWinston from 'express-winston';

//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;

const logger = require('./logger.js');

const database = require('./utils/createDataBase')({ logger });

// call the database connectivity function



const routes = require('./routes');

const port = process.env.PORT || 3000;



module.exports = () => express()
.use(expressWinston.logger({
    winstonInstance: logger,
    msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
    meta: false,
}))
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.use((req, res, next) => {
  req.base = `${req.protocol}://${req.get('host')}`
  req.logger = logger
  req.db = database
  return next()
})
.use(morgan('tiny'))
//  Connect all our routes to our application
.use('/api', routes)
.use((error, req, res, next) => {
  logger.error(error, error)
  res.status(error.status || 500).json({ error });
  next();
}).listen(port, (error) => {
  if (error) {
    logger.error(error, error);
  } else {
    //Start the server in port
    open('http://localhost:' + port + '/api');
    logger.info(connected(`Listening on ${port}`));

  }
})
