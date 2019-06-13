module.exports = (req, res) => {
 const { book } = req;
    return res.status(200).json({ book });
};
