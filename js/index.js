/* global document, chrome */

import fetchWeather from "./modules/weather";
import fetchTrainTimes from "./modules/trainTimes";
import { setupNotes } from "./modules/notes";
import { fetchNotifications } from "./modules/issues";
import fetchNews from "./modules/news";
import dayAndTime from "./modules/dayAndTime";

dayAndTime();
setupNotes();
fetchWeather();
fetchTrainTimes();
fetchNotifications();
fetchNews();

const container = document.querySelector("#container");
container.style.opacity = 1;
