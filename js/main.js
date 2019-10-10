let pageNumbers = 1;
let newArticles = [];

const addScript = language => {
    var s = document.createElement("script");
    s.setAttribute(
      "src",
      `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`
    );
    document.body.appendChild(s);
  };
  
  if (window.clientInformation.language == "ko-KR") {
    addScript("ko");
  } else if (window.clientInformation.language == "vi") {
    addScript("vi");
  }
const getNews = async() =>{
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=fff53b01ce0b4f07ab4abd1853cd3fb7&page=${pageNumbers}`)
    const data = await response.json();
    newArticles = newArticles.concat(data.articles);
    renderNews(newArticles);    
    renderArticleCount(newArticles);
    console.log(newArticles);
    pageNumbers++;
}
const renderNews = (articles) =>{
    const articleHTML = articles.map(article =>{
        return`<div>
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}>
            <h3>${article.description}</h3>
            <p>${article.content}</p>
            <p>${article.author}</p>
            <p>${article.source.name}</P>
            <p>${moment(article.publishedAt).fromNow()}</p>
            <a href="${article.url}">More</a>
        </div>`
    });
    document.getElementById("articleList").innerHTML = articleHTML.join('');
}
const renderArticleCount = (article) =>{
    document.getElementById("count").innerHTML = "Count News: " + article.length;
}


getNews();