const mongoose = require('mongoose');
const newsScheme = require('../models/news');

const News = mongoose.model('news', newsScheme);

class NewsService{

    constructor(){
        this.repository = News;
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
        return this.repository.find({});
    }     
    
    getNewsById(id){
        const article = this.repository.findById(id)

        if(!article){ 
            throw new Error(`News with id: ${id} is not found`);
        }

        return article;
    
    }

    addNews(news){
        this.validateNews(news);
        return this.repository.create(news);
    }

    deleteNews(id){
        const article = this.repository.findByIdAndDelete(id);

        if(!article){
            throw new Error(`News with id: ${id} is not found`);
        }

        return article;
    }

    updateNews(id, news){
       
        this.validateNews(news);
        const article = this.repository.findByIdAndUpdate(id, news);
        
        if(!article){
            throw new Error(`News with id: ${id} is not found`);
        }
        
        return article;
    }

    
}   

module.exports = NewsService;

