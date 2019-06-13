import express from "express"
const routes = express.Router();

var bodyParser = require('body-parser'); //

// attaching a new Router for models
const models = require('./models');

//attaching a new Router for cars
const cars = require('./cars');

// attaching a new Router for books
const books = require('./books');


// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());



routes.use('/models', models);

routes.use('/cars', cars);

routes.use('/books', books);



routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my Book API!' })
});

module.exports = routes;
