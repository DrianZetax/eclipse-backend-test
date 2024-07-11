const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// add logger on get or post
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.post('/player/login/dashboard', function (req, res) {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.get('/player/login/dashboard', function (req, res) {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.use(express.json());

app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    const _token = req.body._token;
    const growId = req.body.growId;
    const password = req.body.password;

    const token = Buffer.from(
        `_token=${_token}&growId=${growId}&password=${password}`,
    ).toString('base64');

    console.log(`Received: GrowID - ${growId}`);

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token},"url":"","accountType":"growtopia"}`,
    );
});

app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});