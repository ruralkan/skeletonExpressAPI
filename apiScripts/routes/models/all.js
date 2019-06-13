// logic for our all route.
const data = require('../../data/data.json');

module.exports = (req, res) => {
  const models = data.models;

  res.status(200).json({ models });
}

