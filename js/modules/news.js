import { createDiv, append, createAnchor } from './createElement';
import secrets from '../secrets';

const createSourceImage = (sourceId) => {
  const element = document.createElement('img');
  element.className = 'news-source-image';
  switch (sourceId) {
    case 'bbc-news':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=www.bbc.co.uk%2fnews';
      break;

    case 'google-news-uk':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=google.co.uk';
      break;

    case 'the-next-web':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=https%3a%2f%2fthenextweb.com%2f';
      break;

    case 'the-verge':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=theverge.com';
      break;

    case 'techcrunch':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=https%3a%2f%2ftechcrunch.com%2f';
      break;

    case 'techradar':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=http%3a%2f%2fwww.techradar.com%2f';
      break;

    default:
      break;
  }
  return element;
};

export default function fetchNews() {
  fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,google-news-uk,techcrunch,techradar,the-next-web,the-verge&apiKey=${secrets.newsApi}`)
    .then(response => response.json())
    .then((data) => {
      const newsContainer = document.querySelector('.news-container');
      data.articles.map((article) => {
        const anchor = createAnchor(article.title, article.url);
        const articleDiv = createDiv(null, 'news-item');
        anchor.className = 'news-item-anchor';
        const sourceImage = createSourceImage(article.source.id);
        append(articleDiv, [sourceImage, anchor]);
        append(newsContainer, [articleDiv]);
      });
    })
    .catch(err => console.log(err));
}
