const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const news = require('./routes/news');
const fs = require('fs');
const morgan = require('morgan');


// Logger 
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan(':method :url  :date', { stream: accessLogsStream }));


app.use(express.json());

// /news routing
app.use('/news', news);


// Main Page
app.get('/', (req, res) => {
    res.send({ 'message' : 'Welcome to NewsFeed' });
});

app.use(function (err, req, res, next) {
    res.status(500).send(err.message);
})

  
app.listen(port,() => console.log('Application started on port ' + port));
  