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

fetch("https://www.metaweather.com/api/location/44418/")
.then(response => response.json())
.then(data => {
  data.consolidated_weather.slice(0, 2).map((item, index) => {
    const minTemp = createDiv(item.min_temp.toFixed(0), "min-temp");
    const maxTemp = createDiv(item.max_temp.toFixed(0), "max-temp");
    const temp = createDiv(null, "temp");
    append(temp, [minTemp, maxTemp]);
    const condition = createIcon(item.weather_state_abbr);
    const day = createDiv(getDayName(index), "weather-day");
    const dayItem = createDiv(null, "weather-day-item");
    append(dayItem, [temp, condition, day]);
    append(weatherContainer, [dayItem]);
  })
})
.catch(error => console.log(error));

function createDiv (value, className) {
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
  return childArray.map(child => {
    if (!child) return;
    parent.appendChild(child)
  });
}

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function getDayName (index) {
  return index >= 6
    ? weekday[0]
    : weekday[date.getDay() + index];
}

{
    let xmlhttp = new XMLHttpRequest();
    // http://nrodwiki.rockshore.net/index.php/NRE_Darwin_Web_Service_(Public)
    // https://stackoverflow.com/questions/124269/simplest-soap-example
    xmlhttp.open('POST', 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx', true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              // https://github.com/metatribal/xmlToJSON
              const result = xmlToJSON.parseString(xmlhttp.response);
              const toOldContainer = document.getElementById("train-time-to-old");
              const services = result.Envelope["0"].Body["0"].GetDepartureBoardResponse["0"].GetStationBoardResult["0"].trainServices["0"].service;
              services.map((item) => {
                const std = item.std[0]._text;
                const etd = item.etd[0]._text;
                const stdDiv = createDiv(std, "std");
                const etdDiv = createDiv(etd, "etd");
                const timeBlock = createDiv(null, "time-block");
                append(timeBlock, [stdDiv, etdDiv]);
                append(toOldContainer, [timeBlock]);
              })
            }
        }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(soapRequest("NSG", "OLD"));
}

{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx', true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              const result = xmlToJSON.parseString(xmlhttp.response);
              const toNsgContainer = document.getElementById("train-time-to-nsg");
              const services = result.Envelope["0"].Body["0"].GetDepartureBoardResponse["0"].GetStationBoardResult["0"].trainServices["0"].service;
              services.map((item) => {
                const std = item.std[0]._text;
                const etd = item.etd[0]._text;
                const stdDiv = createDiv(std, "std");
                const etdDiv = createDiv(etd, "etd");
                const timeBlock = createDiv(null, "time-block");
                append(timeBlock, [stdDiv, etdDiv]);
                append(toNsgContainer, [timeBlock]);
              })
            }
        }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(soapRequest("OLD", "NSG"));
}

function soapRequest (from, to) {
  return `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">
          <soap:Header>
              <typ:AccessToken>
                <typ:TokenValue>${secrets.railApiToken}</typ:TokenValue>
              </typ:AccessToken>
          </soap:Header>
          <soap:Body>
              <ldb:GetDepartureBoardRequest>
                <ldb:numRows>3</ldb:numRows>
                <ldb:crs>${from}</ldb:crs>
                <ldb:filterCrs>${to}</ldb:filterCrs>
                <ldb:filterType>to</ldb:filterType>
                <ldb:timeOffset>5</ldb:timeOffset>
                <ldb:timeWindow>120</ldb:timeWindow>
              </ldb:GetDepartureBoardRequest>
          </soap:Body>
        </soap:Envelope>`;
}

const issuesContainer = document.getElementById("issues-container");

function createAnchor (text, url) {
  let anchor = document.createElement("a");
  anchor.innerText = text;
  anchor.href = url;
  return anchor;
}

function recentlyUpdatedOpenIssues (item) {
  const xDays = 1000 * 60 * 60 * 24 * 1;
  const nowMinusXDays = new Date().getTime() - xDays;
  if ((item.state === "open") && (new Date(item.updated_at).getTime() >= (nowMinusXDays))) return item;
}

function openIssues (item) {
  if (item.state === "open") return item;
}

function setIssueLabels (issueNumber, anchorDiv) {
  fetch(`https://api.github.com/repos/ComparetheMarket/EpiServerCTM/issues/${issueNumber}/labels?access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(labelData => {
    const element = (labelData[0] === undefined) ? null : createDiv(labelData[0].name, "issue-label");
    append(anchorDiv, [element]);
  })
  .catch(err => console.log(err))
}

fetch(secrets.git)
.then(response => response.json())
.then(data => {
  const openIssuesArray = data.filter(item => openIssues(item));
  openIssuesArray.map(issue => {
    const anchor = createAnchor(issue.head.ref, issue.html_url);
    const anchorDiv = createDiv(null, "anchor-container");
    setIssueLabels(issue.number, anchorDiv);
    append(anchorDiv, [anchor]);
    append(issuesContainer, [anchorDiv]);
  })
})
.catch(err => console.log(err))
