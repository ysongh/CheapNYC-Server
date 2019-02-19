const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;

const itemRoutes = require("./routes/item");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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