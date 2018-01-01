fetchWeather();
fetchTrainTimes();
fetchIssues();
fetchNews();
fetchBtcPrice();

const container = document.querySelector("#container");
container.style.opacity = 1;

chrome.storage.sync.get('favoriteColor', item => (console.log(item)));
