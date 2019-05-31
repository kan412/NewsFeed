const NewsRepository = require('../data/news');

class NewsService{

    constructor(){
        this.repository =  new NewsRepository();
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

        if( (news.title === undefined || news.title === '') && (news.content === undefined || news.content === ''  )) {
            throw new Error("Title and Content shouldn't be empty");
        }else if(news.title === undefined || news.title === ''){
            throw new Error("Title shouldn't be empty");
        }else if(news.content === undefined || news.content === ''){
            throw new Error("Content shouldn't be empty");
        }

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

        if((news.title === undefined || news.title === '') && (news.content === undefined || news.content === '' )) {
            throw new Error("Title and Content shouldn't be empty");
        }else if(news.title === undefined || news.title === ''){
            throw new Error("Title shouldn't be empty");
        }else if(news.content === undefined || news.content === ''){
            throw new Error("Content shouldn't be empty");
        }

        const article = this.repository.getNewsById(id);

        if(!article){
            throw new Error(`News with id: ${id} is not found`);
        }

        this.repository.updateNews(article, news);
    }

    
}   

module.exports = NewsService;

