const route = require('express').Router({ mergeParams: true });
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID ? process.env.TWILIO_ACCOUNT_SID.trim() : "";
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID ? process.env.TWILIO_API_KEY_SID.trim() : "";
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET ? process.env.TWILIO_API_KEY_SECRET.trim() : "";

console.log(
    {
        twilioAccountSid,
        twilioApiKeySID,
        twilioApiKeySecret
    },
    'credentials'
);

route.get('/', (req, res) => {
    const { identity, roomName } = req.query;
    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });
    token.identity = identity;
    const videoGrant = new VideoGrant({ room: roomName });
    token.addGrant(videoGrant);
    res.send(token.toJwt());
    console.log(`issued token for ${identity} in room ${roomName}`);
});

module.exports = route;