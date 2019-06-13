import chalk from 'chalk'
import express from 'express';
import open from 'open';
import morgan from 'morgan';

const db = require('./utils/dataBase')

// call the database connectivity function
db();


const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();




// The next command en enable use of consoles
/* eslint-disable no-console */

app.use(morgan('tiny'));
//  Connect all our routes to our application
app.use('/api', routes);


app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    //Start the server in port
    open('http://localhost:' + port + '/api');
    console.log(`Listening on ${ chalk.green(port) } `);
  }
})
