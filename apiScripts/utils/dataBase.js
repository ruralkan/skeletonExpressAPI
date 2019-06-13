// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;


//export this function and imported by server.js
module.exports =function(){

    // Build the connection string
    var dbURI = 'mongodb://localhost/bookAPI';

    // Create the database connection
    mongoose.connect(dbURI);

    // CONNECTION EVENTS

    // When successfully connected
    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", dbURI));
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}
