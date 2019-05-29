const express = require('express');
const app = express();
const router = express.Router();

const data = require('../data/news');

//const newsService = require('../services/news');

router.put('/:id', (req,res) => {
    res.status('200').json({ 'message': 'Successfully Updated News'});
});

router.delete('/:id', (req,res) => {

    //remove from array
    res.status('200').json({ 'message': 'Successfully Deleted News'});
});

router.post('/', (req,res) => {  
    res.status('201').json({ 'message': 'Successfully Added News', 'body': data });
});

router.get('/:id', (req,res) => {
    data.forEach( (element) => {
        if( element.id === req.params.id){
            res.status('200').send(element);
        }
    });
});

router.get('/', (req,res) => {
   res.status('200').json(data);
});


module.exports = router;