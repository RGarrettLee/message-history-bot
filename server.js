const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');
const html = require('./helper/pagePopulation');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/redirect.html'));
})

app.get('/history/:username/:user_id/:avatar', (req, res) => {
    // get user message history page here, use helper function to generate the page
    if (req.params.user_id) {
        //res.send(`<h1>${req.params.username}</h1><br><img alt="pfp" src="https://cdn.discordapp.com/avatars/${req.params.user_id}/${req.params.avatar}.png" />`);
        res.send(html(req.params.username, req.params.user_id, req.params.avatar));
    } else {
        res.sendFile()
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/404.html'));
});

app.listen(PORT, () => {
    console.info(`Server is live at http://localhost:${PORT}`);
});