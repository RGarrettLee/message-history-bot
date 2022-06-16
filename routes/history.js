const history = require('express').Router();
const path = require('path');
const db = require('../db/messages.json');

history.get('/:user_id', (req, res) => {
    // get user message history page here
});

module.exports = history;