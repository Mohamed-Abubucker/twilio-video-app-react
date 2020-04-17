const serverless = require('serverless-http');
require('dotenv').config();
const app = require('./server');

const SERVER_ENV = process.env.SERVER_ENV || "SLS";
const PORT = process.env.PORT || 8081;

if (SERVER_ENV === "SLS")
    module.exports.handler = serverless(app);
else
    app.listen(+PORT, () => console.log(`token server running on ${PORT}`));

