fetchWeather();
fetchTrainTimes();
fetchIssues();
fetchNotifications();
fetchNews();
fetchBtcPrice();

const container = document.querySelector("#container");
container.style.opacity = 1;

document.querySelector('#go-to-options').addEventListener('click',
  () => chrome.runtime.openOptionsPage());

chrome.storage.sync.get('favoriteColor',
  item => console.log(item));
