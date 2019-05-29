const express = require('express');
const router = express.Router();
const NewsService = require('../services/news');


router.put('/:id', (req,res) => {
    const newsService = new NewsService();
    newsService.updateNews(req.params.id, req.body.title, req.body.content);
    res.status('200').json({ 'message': 'Successfully Update News'});
});

router.delete('/:id', (req,res) => {
    const newsService = new NewsService();
    const result = newsService.deleteNews(req.params.id);

    if(result){
        res.status('200').json({ 'message': 'Successfully Deleted News'});
    }else{
        res.status('404').json({ 'message': `News with the id: ${req.params.id} is not found` });
    }
    
});

router.post('/', (req,res) => {  
    const newsService = new NewsService();
    const result = newsService.addNews(req.body.title,req.body.content);
    res.status('200').json({ 'message': 'Successfully Added News'});
});

router.get('/:id', (req,res) => {
    const newsService = new NewsService();
    const result = newsService.getNews(req.params.id);

    if(result){
        res.status('200').json(result);
    }else{
        res.status('404').json({ 'message': `News with the id: ${req.params.id} is not found` });
    }
    
});

router.get('/', (req,res) => {
    const newsService = new NewsService();
    const result = newsService.getAllNews();
    res.status('200').json(result);
   
});

module.exports = router;