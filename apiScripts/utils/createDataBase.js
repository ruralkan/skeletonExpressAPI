// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
const glob = require('glob')
const path = require('path')

//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;


//export this function and imported by server.js
module.exports =({ logger }) => {


    //Models and schemas

    const db = glob.sync('../models/**/*.js', { cwd: __dirname })
    .map(filename => {
        return {
            schema: require(filename),
            name: path
                .basename(filename)
                .replace(path.extname(filename), ''),
        }
    })
    .map(({name, schema}) => mongoose.model(name, schema))
    .reduce((db, model) => {
        return {
            ...db,
            [model.modelName]: model,
        }
    }, {})

    // Build the connection string
    var dbURI = 'mongodb://localhost/bookAPI';

    // Create the database connection
    mongoose.connect(dbURI, {useNewUrlParser: true });

    // CONNECTION EVENTS

    // When successfully connected
    mongoose.connection.on('connected', function(){
        logger.info(connected(`MongoDB connected at ${dbURI}`));
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err){
        logger.error(error("Mongoose default connection has occured "+err+" error"));
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function(){
        logger.info(disconnected("Mongoose default connection is disconnected"));
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            logger.info(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });

    return db;
}
