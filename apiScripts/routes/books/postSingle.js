const Book = require('../../models/bookModels.js');

module.exports = (req, res) => {
  const book = new Book(req.body);
  book.save()
  res.status(201)
  return res.json({ book })
};
