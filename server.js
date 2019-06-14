//https://medium.com/@carlos.illobre/nodejs-express-how-to-organize-your-routes-in-very-big-applications-and-why-controllers-are-evil-e202eea497f4?fbclid=IwAR0a93q4yyR6nLwXRURQg7p_jCe32HmA57mIbgeH8eyl1VslhbgUcsjl5z8

const port = process.env.PORT || 3000
const logger = require('./logger.js')
const database = require('./dataBase/createDataBase')({ logger })
const app = require('./apiScripts/createExpressApp')({logger, database})
const server = require('http').createServer()
server
    .on('request', app)
    .on('listening', function() {
        const addr = this.address()
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
        logger.info(`Listening on ${bind}`)
    })
    .on('error', function(error) {
        if (error.syscall !== 'listen') throw error
        const addr = this.address() || { port }
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
        switch (error.code) {
            case 'EACCES':
                logger.error(`${bind} requires elevated privileges`)
                process.exit(1)
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`)
                process.exit(1)
                break;
            default:
                throw error
        }
    })
    .listen(port)
