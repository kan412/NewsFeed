const express = require('express');
const app = express();
const news = require('./routes/news');

app.use('/news', news);

app.get('/', (req, res) => {
    res.send('Welcome to NewsFeed');
});
  
app.listen(3000,() => console.log('Application started on port 3000'));
  