express = require('express');
var bodyParser = require('body-parser');
app = module.exports = express();
var config = require("./config.js").getConfig();
app.locals.config = config;
var path = require('path');
var morgan = require('morgan');
var api = express.Router();
var index;
var env = process.env.NODE_ENV;
require('./controllers')(app, api);

app.enable('trust proxy');
app.use(bodyParser.json());

switch (env) {
    case 'local_machine':
        app.use(express.static(path.join(__dirname, '../src')));
        index = path.resolve(__dirname, '../src/index.html');
        break;
}


// Add support for logging the hostname using Morgan.
morgan.token('host', function (req) {
    return req.hostname;
});

// Add support for logging the IP using Morgan (which is the actual IP, if trust proxy is set).
morgan.token('ip', function (req) {
    return req.ip;
});

app.use(morgan(':ip -> :host - :method :url :status :res[content-length] - :response-time ms'));
app.use('/api/v1', api);


app.use(function (req, res) {
    res.sendFile(index);
});



module.exports = app;
