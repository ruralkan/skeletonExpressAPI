const Router = require('express').Router
module.exports = Router({mergeParams: true})
.put('/books/:id', async (req, res, next) => {
    try {
        const book = await req.db.Book.findById(req.params.id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.genere = req.body.genere;
        book.read = req.body.read;
        await book.save();
        res.status(204)
        res.send(book)
    } catch (error) {
        next(error)
    }
})
