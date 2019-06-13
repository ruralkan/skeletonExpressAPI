const books = require('express').Router();
const getAll = require('./getAll');

const getSingle = require('./getSingle');
const postSingle = require('./postSingle');
const putSingle = require('./putSingle');
const patchSingle = require('./patchSingle');

const findObject = require('../../utils/mongooseBy');


books.param('bookId', findObject('book'));


books.get('/:bookId', getSingle);

books.get('/', getAll);

books.post('/',postSingle);

books.put('/:bookId', putSingle);

books.patch('/:bookId', patchSingle);





module.exports = books;
