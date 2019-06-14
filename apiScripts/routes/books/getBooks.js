const Router = require('express').Router
module.exports = Router({mergeParams: true})
.get('/books', async (req, res, next) => {
    try {
        console.log('Si entra a books');


        const book = await req.db.Book.find({});
        res.status(200)
        //res.send(books)
        res.json({ book })
    } catch (error) {
        next(error)
    }
})
