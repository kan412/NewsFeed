const express = require('express');
const app = express();
const router = express.Router();

const data = require('../data/news');

//const newsService = require('../services/news');

router.get('/', (req,res) => {
    res.json(data);
});


module.exports = router;