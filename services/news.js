class NewsService{

    constructor(){
        this.data = require('../data/news');
    }

    getAllNews(){
       return this.data;
    }     
    
    getNews(id){
        // for( let i=0; i < this.data.length; i++){
        //     if(this.data[i].id === id){
        //         return this.data[i];
        //     }
        // }
        const news = this.data.find( (news) => news.id === parseInt(id));

        if(news){
            return news;
        }else{
            return false;
        }
    }

    addNews(title, content){
        const newArticle = {
            "id" : this.data.length + 1,
            "title": title,
            "content": content
        }
       
        this.data.push(newArticle);

        console.log(this.data);

    }

    deleteNews(id){
        const news = this.data.find( (news) => news.id === parseInt(id));

        if(news){
            const newsIndex = this.data.indexOf(news);
            this.data.splice(newsIndex,1);
            return true;
        }else{
            return false;
        }
    }

    updateNews(id, title, content){
        // for( let i=0; i < this.data.length; i++){
        //     if(this.data[i].id === id){
        //         const currentNewsIndex = this.data.indexOf(this.data[i]);
        //         this.data[currentNewsIndex]['title'] = title;
        //         this.data[currentNewsIndex]['content']= content; 
        //     }
        // } 
        console.log(this.data);
    }

    
}   

module.exports = NewsService;

