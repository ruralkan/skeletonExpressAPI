module.exports = (req, res) => {
    const { book } = req;
    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;

    });
    req.book.save((err) =>{
        if (err) {
            return res.send(err);
        }
        return res.json(book);
    });
};
