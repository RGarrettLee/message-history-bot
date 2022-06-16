const express = require('express');

const historyRouter = require('./history');

const app = express();

app.use('/history', historyRouter);

module.exports = app;