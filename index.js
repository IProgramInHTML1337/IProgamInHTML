/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; //'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
var text = '';
var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}
return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/build'));
app.use(cors());
app.use(cookieParser());

app.get('/login', function(req, res) {

var state = generateRandomString(16);
res.cookie(stateKey, state);

const { clientId, clientSecret, scope, hostname} = req.query;
client_id = clientId;
client_secret = clientSecret;
redirect_uri = hostname + '/callback';
console.log(client_id + " " + client_secret + " " + scope);

res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
    }));
});

app.get('/callback', function(req, res) {
var code = req.query.code || null;
var state = req.query.state || null;
var storedState = req.cookies ? req.cookies[stateKey] : null;

if (state === null || state !== storedState) {
    res.redirect('/#' +
    querystring.stringify({
        error: 'state_mismatch'
    }));
} else {
    res.clearCookie(stateKey);
    var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    },
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
    };

    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        console.log('Refresh token: ' + refresh_token);

        var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
        querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
        }));
    } else {
        res.redirect('/#' +
        querystring.stringify({
            error: 'invalid_token'
        }));
    }
    });
}
});

app.get('/refresh_token', function(req, res) {

// requesting access token from refresh token
var refresh_token = req.query.refresh_token;
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
    grant_type: 'refresh_token',
    refresh_token: refresh_token
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    var access_token = body.access_token;
    res.send({
        'access_token': access_token
    });
    }
});
});

const port = process.env.PORT || 8888 || '0.0.0.0';
app.listen(port);
console.log('Listening on ' + port);