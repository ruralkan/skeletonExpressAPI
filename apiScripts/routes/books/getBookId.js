const Router = require('express').Router
module.exports = Router({mergeParams: true})
.get('/books/:id', async (req, res, next) => {
    try {
        const book = await req.db.Book.findById(req.params.id);
        res.status(200)
        //res.send(books)
        res.json({ book })
    } catch (error) {
        next(error)
    }
})
