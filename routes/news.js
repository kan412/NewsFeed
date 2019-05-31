const express = require('express');
const router = express.Router();
const NewsService = require('../services/news');
const newsService = new NewsService();

router.put('/:id', updateNews);
router.delete('/:id', deleteNews);
router.post('/', addNews);
router.get('/:id', getSingleNews);
router.get('/', getAllNews);


function updateNews(req,res,next){
    try{
        newsService.updateNews(req.params.id, req.body);
        res.status('200');
    }catch(err){
        next(err,req,res,next);
    }
    
}

function deleteNews(req,res,next){
    try{ 
        const result = newsService.deleteNews(req.params.id);
        res.status('200');
    }catch(err){
        next(err,req,res,next);
    }   
}


function addNews(req,res,next){  
    try{
        const result = newsService.addNews(req.body);
        res.status('201').send(result);
    }catch(err){
        next(err,req,res,next);
    }
}

function getSingleNews(req,res,next){
    try{
        const result = newsService.getNewsById(req.params.id);
        res.status('200').send(result);
    }catch(err){
        next(err,req,res,next);
    }
    
}

function getAllNews(req,res,next){
    try{
        const result = newsService.getAllNews();
        res.status('200').json(result);
    }catch(err){
        next(err,req,res,next);
    }  
}



module.exports = router;