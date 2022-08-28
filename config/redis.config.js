const { createClient } = require("redis");
require("dotenv").config()

const client = createClient({
    url: `redis://default:${process.env.AUTH_KEY}@redis-10624.c16.us-east-1-2.ec2.cloud.redislabs.com:10624`
});

client.connect()
    .then(_ => console.log("Redis is connected!"))
    .catch(e => console.log("Redis Error: ", e.message));


module.exports = { client }