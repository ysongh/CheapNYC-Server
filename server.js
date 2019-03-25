const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer");
const passport = require('passport');

const db = require('./config/keys').mongoURI;

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const itemRoutes = require("./routes/item");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

const app = express();

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: imageFilter }).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

app.use('/graphql', expressGraphQL({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

app.use('/items', itemRoutes);
app.use('/items', reviewRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('It Working'));

app.use(passport.initialize());

require('./config/passport')(passport);

const port = process.env.PORT || 8080;

mongoose.connect(db, { useNewUrlParser: true })
    .then(result => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });