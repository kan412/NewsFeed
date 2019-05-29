const express = require('express');
const app = express();
const news = require('./routes/news');
const port = 3000;

app.use('/news', news);

app.get('/', (req, res) => {
    res.send({ 'message' : 'Welcome to NewsFeed' });
});
  
app.listen(port,() => console.log('Application started on port ' + port));
  