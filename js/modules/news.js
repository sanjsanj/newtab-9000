import { createDiv, append, createAnchor } from './createElement';
import secrets from '../secrets';

const createSourceImage = (sourceId) => {
  const element = document.createElement('img');
  element.className = 'news-source-image';
  switch (sourceId) {
    case 'bbc-news':
      element.src = 'http://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/2.1.0/apple-touch-icon-57x57-precomposed.png';
      break;

    case 'google-news-uk':
      element.src = 'https://www.google.de/images/branding/product/ico/googleg_lodp.ico';
      break;

    case 'the-next-web':
      element.src = 'https://cdn0.tnwcdn.com/wp-content/themes/cyberdelia/assets/icons/favicon-16x16.png';
      break;

    case 'the-verge':
      element.src = 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7395367/favicon-16x16.0.png';
      break;

    case 'techcrunch':
      element.src = 'https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/homescreen_TCIcon.png';
      break;

    case 'techradar':
      element.src = 'http://cdn0.static.techradar.futurecdn.net/201801163/favicon.ico';
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
