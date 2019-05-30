const NewsRepository = require('../data/news');

class NewsService{

    constructor(){
        this.repository =  new NewsRepository();
    }

    getAllNews(){
        return this.repository.getNews();
    }     
    
    getNewsById(id){
        return this.repository.getNewsById(id);
    }

    addNews(news){
        return this.repository.addNews(news);
    }

    deleteNews(id){
        const article = this.repository.getNewsById(id);

        if(article){
            this.repository.deleteNews(article);
        }else{
            throw new Error(`News with id: ${id} is not found`);
        }
    }

    updateNews(id, news){
        const article = this.repository.getNewsById(id);
        if(article){
            this.repository.updateNews(article, news);
        }else{
            throw new Error(`News with id: ${id} is not found`);
        }
    }

    
}   

module.exports = NewsService;

