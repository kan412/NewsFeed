const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const newsRoute = require('./routes/news');
const authRoute = require('./routes/auth');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport =  require('passport');


app.use(express.json());
app.use(passport.initialize());


mongoose.connect('mongodb://localhost/NewsFeed', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Succesfully Connected');
});


// Logger 
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan(':method :url  :date', { stream: accessLogsStream }));



// /news routing
app.use('/news', newsRoute);

// auth routing
app.use('/auth',authRoute);


// Main Page
app.get('/', (req, res) => {
    res.send({ 'message' : 'Welcome to NewsFeed' });
});

app.use(function (err, req, res, next) {
    if(err){
        res.status(500).send(err.message || "Unknown Error");
    }else{
        next(err,req,res,next);
    }
})

  
app.listen(port,() => console.log('Application started on port ' + port));
  