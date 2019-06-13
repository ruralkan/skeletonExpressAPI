/*Our function takes a type. In our case, this type will be either "car" or "model"
We use this type to make sure we search through the correct piece of data for our object
and then to make sure we add the correct piece of data to the request.*/

const data = require('../data/data.json');

module.exports = (type, typePlural = `${type}s`) => {
  return (req, res, next, value) => {
    const obj = data[typePlural].find(t =>  t.id === (value * 1));

    if (obj) {
      req[type] = obj;
      next();
    } else {
      res.status(404).send(`Invalid ${type} ID`);
    }
  };
};
