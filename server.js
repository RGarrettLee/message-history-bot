const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/404.html'));
});

app.listen(PORT, () => {
    console.info(`Server is live at http://localhost:${PORT}`);
});