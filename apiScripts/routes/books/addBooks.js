const Router = require('express').Router
module.exports = Router({mergeParams: true})
.post('/books', async (req, res, next) => {
    try {
        const book = new req.db.Book(req.body)
        await book.save()
        const location = `${req.base}${req.originalUrl}/${book.id}`
        res.setHeader('Location', location)
        res.status(201)
        res.send(book)
    } catch (error) {
        next(error)
    }
})
