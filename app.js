const express = require('express');
//const cors = require('cors');

//routes
const imageRouter = require('./src/routes/image');

//conf
const app = express();
//app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/image', imageRouter);

module.exports = app;