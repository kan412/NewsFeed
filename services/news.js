const mongoose = require('mongoose');
const newsScheme = require('../models/news');

const News = mongoose.model('News', newsScheme);

class NewsService{

    constructor(){
        this.repository =  new NewsRepository();
    }

    validateNews(news){

        if(!news.title){
           throw new Error("Title shouldn't be empty");  
        }

        if(!news.content){
            throw new Error("Content shouldn't be empty");
        }

    }

    getAllNews(){
        return this.repository.getNews();
    }     
    
    getNewsById(id){
        const article = this.repository.getNewsById(id);

        if(!article){ 
            throw new Error(`News with id: ${id} is not found`);
        }

        return article;
    
    }

    addNews(news){
        this.validateNews(news);
        return this.repository.addNews(news);
    }

    deleteNews(id){
        const article = this.repository.getNewsById(id);

        if(!article){
            throw new Error(`News with id: ${id} is not found`);
        }

        this.repository.deleteNews(article);
    }

    updateNews(id, news){
       
        this.validateNews(news);
        const article = this.repository.getNewsById(id);
        
        if(!article){
            throw new Error(`News with id: ${id} is not found`);
        }
        
        this.repository.updateNews(article, news);
    }

    
}   

module.exports = NewsService;

