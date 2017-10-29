function fetchNews () {
  fetch(`https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=${secrets.newsApi}`)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.querySelector(".news-container");

    data.articles.map((article) => {
      const anchor = createAnchor(article.title, article.url);
      const articleDiv = createDiv(null, "news-item")
      anchor.className = "news-item-anchor";
      
      append(articleDiv, [anchor]);
      append(newsContainer, [articleDiv]);
    })
  })
  .catch(err => console.log(err))
}
