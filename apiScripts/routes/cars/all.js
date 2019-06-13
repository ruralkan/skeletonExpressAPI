const data = require('../../data/data.json');

module.exports = (req, res) => {
  const cars = data.cars;

  res.status(200).json({ cars });
};
