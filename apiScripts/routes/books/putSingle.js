/* es-lint-disable no-param-reassign */
module.exports = (req, res) => {
  const book = req.book;
  book.title = req.body.title;
    book.author = req.body.author;
    book.genere = req.body.genere;
    book.read = req.body.read;
    book.save();
    return res.status(200).json({ book });
};

