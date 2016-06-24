 // Imports
import * as express from 'express';
import * as mongoose from 'mongoose';
// use this way of importing because we said export = { } on the config.ts
import config = require('./config/config');

// Global Vars
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/dream-car';

// mongoose connection
require('./api/cars/car.model');
require('./api/users/user.model');
mongoose.connect(MONGO_URL, (err) => {
    if (err) console.error(err);
    else console.log(`Connected to ${MONGO_URL}`);
});

// Render jade files for the client
// TODO: add gulp task to compile jade to html, and send back that html instead of rendering jade
app.get(/\/client.{0,}\/.+\.jade/, (req, res, next) => {
    res.render(config.root + req.path);
});

// Routes Config
app.use(require('body-parser')());
app.use('/client', express.static('client'));
app.use('/bower_components', express.static('bower_components'));

// Routes
app.get('/', (req, res, next) => {
    res.sendFile(config.client + '/index.html');
});

app.use('/api/v1/cars', require('./api/cars/car.routes'));
app.use('/api/v1/users', require('./api/users/user.routes'));

// if path starts with /client, /bower_components, or /api, send a 404
app.get(/\/(client|bower_components|api).{0,}/, (req, res, next) => {
    next({ status: 404, message: `${req.path} is not found, or does not exist. Please check for typos.` });
});

// all other get calls, ex: /adopt, send the index.html and let angular take care of the routing
app.get('/*', (req, res, next) => {
    res.sendFile(config.client + '/index.html');
});

app.use((req, res, next) => {
    return next({ status: 404, message: `${req.method}: ${req.path} is not found.` });
});

app.use((err: any, req, res, next) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production')
        console.log(err);
    if (process.env.NODE_ENV === 'production')
        err = { status: err.status || 500, message: err.message || '' };
    res.status(err.status).send(err);
});

// Listen
app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});
