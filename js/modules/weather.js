const weatherContainer = document.querySelector(".weather-container")

const getDayName = index => (index === 0 ? "today" : "tomorrow")

const fetchWeather = () => {
  fetch("https://www.metaweather.com/api/location/44418/")
    .then(response => response.json())
    .then(data => {
      data.consolidated_weather.slice(0, 2).map((item, index) => {
        const minTemp = createDiv(item.min_temp.toFixed(0), "min-temp");
        const maxTemp = createDiv(item.max_temp.toFixed(0), "max-temp");
        const temp = createDiv(null, "temp");
        append(temp, [minTemp, maxTemp]);

        const condition = createWeatherConditionIcon(item.weather_state_abbr);
        const day = createDiv(getDayName(index), "weather-day");
        const dayItem = createDiv(null, "weather-day-item");
        append(dayItem, [temp, condition, day]);

        append(weatherContainer, [dayItem]);
      })
    })
    .catch(error => console.log(error));
}
