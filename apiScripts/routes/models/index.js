//Router handler for models
const models = require('express').Router();

const all = require('./all');

const single = require('./single');

const cars = require('./cars');

const findObject = require('../../utils/findObject');

models.param('modelId', findObject('model'));

models.get('/', all);

models.get('/:modelId', single);

models.use('/:modelId/cars', cars);

module.exports = models;
