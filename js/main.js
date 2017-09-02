const daytimeContainer = document.querySelector(".daytime-container");
const weatherContainer = document.querySelector(".weather-container");

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

function createDiv (value, className) {
  let element;
  element = document.createElement("div");
  element.innerText = value;
  element.className = className;
  return element;
}

function createWeatherConditionIcon (value) {
  let element = document.createElement("img");
  element.className = "condition";
  element.src = `https://www.metaweather.com/static/img/weather/png/64/${value}.png`
  return element;
}

function createAnchor (text, url) {
  let anchor = document.createElement("a");
  anchor.innerText = text;
  anchor.href = `${url}/files`;
  return anchor;
}

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

function append (parent, childArray) {
  return childArray.map(child => {
    if (!child) return;
    parent.appendChild(child)
  });
}

function getDayName (index) {
  return index === 0
    ? "today"
    : "tomorrow";
}

function setupTrainXmlRequest (xmlhttp, parentId, containerId) {
  // http://nrodwiki.rockshore.net/index.php/NRE_Darwin_Web_Service_(Public)
  // https://stackoverflow.com/questions/124269/simplest-soap-example
  xmlhttp.open('POST', 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx', true);
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        // https://github.com/metatribal/xmlToJSON
        const result = xmlToJSON.parseString(xmlhttp.response);
        const toOldContainer = document.getElementById(containerId);
        const services = result.Envelope[0].Body[0].GetDepartureBoardResponse[0].GetStationBoardResult[0].trainServices[0].service;
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
  let parentElement = document.querySelector(parentId);
  parentElement.style.display = "inline-block";
}

function setupTrainTimeElement (parentId, containerId, from, to) {
  let xmlhttp = new XMLHttpRequest();
  setupTrainXmlRequest(xmlhttp, parentId, containerId);

  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(soapRequest(from, to));
}

function itsTheMorning () {
  const newDate = new Date();
  const hours = newDate.getHours();
  return hours < 12 ? true : false;
}

if (itsTheMorning()) {
  setupTrainTimeElement(".trains-to-old", "train-time-to-old", "NSG", "OLD");
} else {
  setupTrainTimeElement(".trains-to-nsg", "train-time-to-nsg", "OLD", "NSG");
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

const issuesContainer = document.querySelector(".issues-container");

function returnOpenIssue (issue) {
  if (issue.state === "open") return issue;
}

const issueIcon = `<svg aria-hidden="true" class="issue-icon-svg" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>`

const commentIcon = `<svg aria-hidden="true" class="issue-icon-comment" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path></svg>`;

function setIssueLabels (issueNumber, anchorDiv) {
  fetch(`https://api.github.com/repos/ComparetheMarket/EpiServerCTM/issues/${issueNumber}/labels?access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(labelData => {
    const element = (labelData[0] === undefined) ? null : createDiv(labelData[0].name, "issue-label");
    append(anchorDiv, [element]);
  })
  .catch(err => console.log(err))
}

function setComments (issueNumber, anchor) {
  fetch(`https://api.github.com/repos/ComparetheMarket/EpiServerCTM/pulls/${issueNumber}/comments?access_token=${secrets.gitToken}`)
  .then(response => response.json())
  .then(comments => {
    if (comments.length < 1) return null;

    const element = createDiv(comments.length, "issue-comment-number");
    const icon = document.createElement("div");
    icon.innerHTML = commentIcon;
    icon.className = "issue-comment-icon";

    append(anchor, [icon, element]);
  })
  .catch(err => console.log(err))
}

fetch(`https://api.github.com/repos/ComparetheMarket/EpiServerCTM/pulls?state=all&access_token=${secrets.gitToken}`)
.then(response => response.json())
.then(data => {
  const openIssuesArray = data.filter(issue => returnOpenIssue(issue));
  
  openIssuesArray.map(issue => {
    console.log(issue);
    const icon = document.createElement("div");
    icon.innerHTML = issueIcon;
    icon.className = "issue-icon";

    const anchor = createAnchor(issue.head.ref, issue.html_url);
    anchor.className = "issue";
    
    let lastUpdated = new Date(issue.updated_at);
    lastUpdated = lastUpdated.toLocaleDateString("en-GB", dateOptions);

    const info = createDiv(`${issue.user.login} - ${lastUpdated}`, "issue-info");

    const anchorDiv = createDiv(null, "anchor-container");
    
    setIssueLabels(issue.number, anchorDiv);
    setComments(issue.number, anchor)
    
    append(anchorDiv, [icon, anchor, info]);
    append(issuesContainer, [anchorDiv]);
  })
})
.catch(err => console.log(err))
