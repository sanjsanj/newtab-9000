/* global document, chrome */

import fetchWeather from './modules/weather';
import fetchTrainTimes from './modules/trainTimes';
import { fetchIssues, fetchNotifications } from './modules/issues';
import fetchNews from './modules/news';
import fetchBtcPrice from './modules/btc';
import dayAndTime from './modules/dayAndTime';

dayAndTime();
fetchWeather();
fetchTrainTimes();
fetchIssues();
fetchNotifications();
fetchNews();
fetchBtcPrice();

const container = document.querySelector('#container');
container.style.opacity = 1;

document.querySelector('#go-to-options').addEventListener(
  'click',
  () => chrome.runtime.openOptionsPage(),
);

chrome.storage.sync.get(
  'favoriteColor',
  item => console.log(item),
);
