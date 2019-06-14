import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';

const router = require('./routes/createRouter')()


module.exports = ({ database, logger }) => express()
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
.use('/api', router)
.use((error, req, res, next) => {
  logger.error(error, error)
  res.status(error.status || 500).json({ error });
  next();
});
