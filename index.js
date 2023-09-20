const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
//conexio mongo db
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(error) => console.log(error));
db.once('open', () => console.log('Connected to the db'));

//MIDDLEWARES
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());




//view engine

app.set('view engine','ejs');

//route prefix
app.use("", require('./routes/routes'));


app.listen(PORT,()=>{
    console.log('Server started at http://localhost:5000');
})