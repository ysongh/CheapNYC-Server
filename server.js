const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;

const itemRoutes = require("./routes/item");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.use('/items', itemRoutes);

app.get('/', (req, res) => res.send('It Working'));

const port = process.env.PORT || 8080;

mongoose.connect(db, { useNewUrlParser: true })
    .then(result => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });