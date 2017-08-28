const daytimeContainer = document.getElementById("daytime-container");
const weatherContainer = document.getElementById("weather-container");

let date = new Date;  
const dateOptions = {  
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};

daytimeContainer.innerText = date.toLocaleDateString("en-GB", dateOptions);

{
  setInterval(() => {
    date = new Date;
    daytimeContainer.innerText = date.toLocaleDateString("en-GB", dateOptions);
  }, 60000)
}

// fetch("https://www.metaweather.com/api/location/44418/")
// .then(response => response.json())
// .then(data => console.log(data.consolidated_weather))
// .catch(error => console.log(error));

const data = {  
   "consolidated_weather":[  
      {  
         "id":5354413057114112,
         "weather_state_name":"Light Cloud",
         "weather_state_abbr":"lc",
         "wind_direction_compass":"S",
         "created":"2017-08-28T14:19:01.593220Z",
         "applicable_date":"2017-08-28",
         "min_temp":16.468333333333334,
         "max_temp":28.353333333333335,
         "the_temp":26.843333333333334,
         "wind_speed":4.1155510209337471,
         "wind_direction":181.83746044060317,
         "air_pressure":1020.865,
         "humidity":55,
         "visibility":6.9167934263898836,
         "predictability":70
      },
      {  
         "id":6401589837299712,
         "weather_state_name":"Showers",
         "weather_state_abbr":"s",
         "wind_direction_compass":"W",
         "created":"2017-08-28T14:19:02.257670Z",
         "applicable_date":"2017-08-29",
         "min_temp":16.413333333333334,
         "max_temp":26.564999999999998,
         "the_temp":24.426666666666666,
         "wind_speed":4.3729936781887107,
         "wind_direction":277.23810475301315,
         "air_pressure":1016.125,
         "humidity":61,
         "visibility":10.055028632784538,
         "predictability":73
      },
      {  
         "id":4773238081060864,
         "weather_state_name":"Light Rain",
         "weather_state_abbr":"lr",
         "wind_direction_compass":"N",
         "created":"2017-08-28T14:19:01.463220Z",
         "applicable_date":"2017-08-30",
         "min_temp":12.486666666666666,
         "max_temp":16.739999999999998,
         "the_temp":15.666666666666666,
         "wind_speed":7.6046048920212632,
         "wind_direction":356.49157494443148,
         "air_pressure":1017.4300000000001,
         "humidity":70,
         "visibility":11.563407201940667,
         "predictability":75
      },
      {  
         "id":5939050447896576,
         "weather_state_name":"Showers",
         "weather_state_abbr":"s",
         "wind_direction_compass":"W",
         "created":"2017-08-28T14:19:05.727770Z",
         "applicable_date":"2017-08-31",
         "min_temp":11.111666666666665,
         "max_temp":19.419999999999998,
         "the_temp":17.576666666666668,
         "wind_speed":5.8577917843195735,
         "wind_direction":276.64004069399175,
         "air_pressure":1021.37,
         "humidity":65,
         "visibility":15.149961723534558,
         "predictability":73
      },
      {  
         "id":5120582018400256,
         "weather_state_name":"Heavy Cloud",
         "weather_state_abbr":"hc",
         "wind_direction_compass":"NNW",
         "created":"2017-08-28T14:19:03.232910Z",
         "applicable_date":"2017-09-01",
         "min_temp":11.475,
         "max_temp":19.614999999999998,
         "the_temp":18.260000000000002,
         "wind_speed":4.8538840807921737,
         "wind_direction":330.27335406955257,
         "air_pressure":1022.1800000000001,
         "humidity":57,
         "visibility":14.664981507993319,
         "predictability":71
      },
      {  
         "id":4593726970134528,
         "weather_state_name":"Heavy Cloud",
         "weather_state_abbr":"hc",
         "wind_direction_compass":"NNW",
         "created":"2017-08-28T14:19:05.022520Z",
         "applicable_date":"2017-09-02",
         "min_temp":11.535000000000002,
         "max_temp":20.541666666666668,
         "the_temp":19.329999999999998,
         "wind_speed":4.7707251252684326,
         "wind_direction":340.83200670065429,
         "air_pressure":1030.3299999999999,
         "humidity":56,
         "visibility":null,
         "predictability":71
      }
   ],
   "time":"2017-08-28T16:10:20.278370+01:00",
   "sun_rise":"2017-08-28T06:06:51.312414+01:00",
   "sun_set":"2017-08-28T19:55:24.617725+01:00",
   "timezone_name":"LMT",
   "parent":{  },
   "sources":[  ],
   "title":"London",
   "location_type":"City",
   "woeid":44418,
   "latt_long":"51.506321,-0.12714",
   "timezone":"Europe/London"
}

function createNode (value, className) {
  let element;
  element = document.createElement("div");
  element.innerText = value;
  element.className = className;
  return element;
}

function createIcon (value) {
  let element = document.createElement("img");
  element.className = "condition";
  element.src = `https://www.metaweather.com/static/img/weather/png/64/${value}.png`
  return element;
}

function append (parent, childArray) {
  return childArray.map(child => parent.appendChild(child));
}

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function dayName (index) {
  return index >= 6
    ? weekday[0]
    : weekday[date.getDay() + index];
}

data.consolidated_weather.map((item, index) => {
  const minTemp = createNode(item.min_temp.toFixed(0), "min-temp");
  const maxTemp = createNode(item.max_temp.toFixed(0), "max-temp");
  const temp = createNode(null, "temp");
  append(temp, [minTemp, maxTemp]);

  const condition = createIcon(item.weather_state_abbr);

  const day = createNode(dayName(index), "weather-day");

  const dayItem = createNode(null, "weather-day-item");

  append(dayItem, [temp, condition, day]);
  append(weatherContainer, [dayItem]);
})
