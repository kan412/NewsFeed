class NewsRepository{
    constructor(){
        this.data = [
            {
                "id": 1,
                "title": "This is a title one",
                "content": "This is content one"
            },
            {
                "id": 2,
                "title": "This is a title two",
                "content": "This is content Two"
            },
            {
                "id": 3,
                "title": "This is a title three",
                "content": "This is content three"
            },
            {
                "id": 4,
                "title": "This is a title four",
                "content": "This is content four"
            },
            {
                "id": 5,
                "title": "This is a title five",
                "content": "This is content five"
            },
            {
                "id": 6,
                "title": "This is a title six",
                "content": "This is content six"
            },
            {
                "id": 7,
                "title": "This is a title seven",
                "content": "This is content seven"
            }
        ];
    }

    getNews(){
        return this.data;
    }

    getNewsById(id){
        const news = this.data.find( (news) => news.id === parseInt(id));
        if(news){
            return news;
        }else{
            throw new Error(`News with id: ${id} is not found`);
        }
    }

    addNews(news){
        const newArticle = {
            "id" : this.data.length + 1,
            "title": news.title,
            "content": news.content
        }

        this.data.push(newArticle);
    }

    deleteNews(news){
        const newsIndex = this.data.indexOf(news);
        this.data.splice(newsIndex,1);
    }

    updateNews(currentNews, updatedNews){
        const newsIndex =  this.data.indexOf(currentNews);
        this.data[newsIndex].title= updatedNews.title;
        this.data[newsIndex].content= updatedNews.content;
    }
}


module.exports = NewsRepository;