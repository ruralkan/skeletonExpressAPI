 //we have access to data in the request by the time the handler is hit.
 //This is because we use util/findObject.js

module.exports = (req, res) => {
    const model = req.model;

    res.status(200).json({ model });
};
