const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')
require("dotenv").config()
const app = express();


app.use(express.json());

//mongoconnection
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB_connected"))
    .catch(err => console.log(err))

app.use('/', route);
app.listen(process.env.PORT || 4000, () => {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
})