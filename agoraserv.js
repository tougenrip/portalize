var express = require('express');
var {AccessToken} = require('agora-access-token');
var {Token, Priviledges} = AccessToken;

var PORT = process.env.PORT || 8080;

// if (!(process.env.AGORA_APP_ID && process.env.AGORA_APP_CERT)) {
//     throw new Error('You must define an APP_ID and APP_CERTIFICATE');
// }
var APP_ID = "76476eca779d4fca945982fc694c10d4";
var APP_CERTIFICATE = "b5eee1a51ead4fd691c42dae34701c94";


var app = express();

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

var generateAccessToken = function (req, resp) {
    resp.header('Access-Control-Allow-Origin', "*")

    var channel = req.query.channel;
    if (!channel) {
        return resp.status(500).json({ 'error': 'channel name is required' });
    }

    var uid = req.query.uid;
    if (!uid) {
        uid = 0;
    }

    var expiredTs = req.query.expiredTs;
    if (!expiredTs) {
        expiredTs = 0;
    }

    var token = new Token(APP_ID, APP_CERTIFICATE, channel, uid);
    // typically you will ONLY need join channel priviledge
    token.addPriviledge(Priviledges.kJoinChannel, expiredTs);
    return resp.json({ 'token': token.build() });
};

app.get('/access_token', nocache, generateAccessToken);

app.listen(PORT, function () {
    console.log('Service URL http://127.0.0.1:' + PORT + "/");
    console.log('Channel Key request, /access_token?uid=[user id]&channel=[channel name]');
    console.log('Channel Key with expiring time request, /access_token?uid=[user id]&channel=[channel name]&expiredTs=[expire ts]');
});