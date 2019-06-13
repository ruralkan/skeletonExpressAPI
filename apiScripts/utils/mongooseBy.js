/*Our function takes a type. In our case, this type will be either "car" or "model"
We use this type to make sure we search through the correct piece of data for our object
and then to make sure we add the correct piece of data to the request.*/

let Book = require('../models/bookModels.js');

module.exports = (type = `${type}s`) => {
  return (req, res, next, value) => {

    console.log(value);

    //query could be {genre: 'fantasy'} and is in req
    // localhost:3000/api/books?genre=Fantasy
    //its necesary implement a validation of queries
    // const query = req.query
    //Change value for query
    Book.findById(value,(err, book) => {
      if(err)return res.status(500).send({message: 'Error en la petición'});
      if(!book) return res.status(404).send({message: `EL libro ${value} no existe`});
      req.book = book;
      return next();

    });

  };
};

