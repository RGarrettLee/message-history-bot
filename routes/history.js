const history = require('express').Router();
const path = require('path');
const fs = require('fs');

history.get('/', (req, res) => {
    // TODO: return the current db data as a JSON object for the bot to use
    let data = fs.readFileSync(path.join(__dirname, '../db/messages.json'));
    res.json(JSON.parse(data));
});

history.post('/', (req, res) => {
    // TODO: accept a post request with new history data and incorporate it into the existing json file
    console.info(req.body);
    fs.writeFile(path.join(__dirname, '../db/messages.json'), JSON.stringify(req.body), (error) => {
        error ? console.info(error) : console.info('successfully updated data');
    })
    res.json('Post successfully made')
});

module.exports = history;