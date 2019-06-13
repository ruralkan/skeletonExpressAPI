let Book = require('../../models/bookModels.js');

module.exports = (req, res) => {
  Book.find({})
  .then(doc => {
    return res.status(200).json({ doc });
  })
  .catch(err => {
    return res.send(err)
  })


};


