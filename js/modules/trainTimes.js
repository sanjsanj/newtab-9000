const setupTrainXmlRequest = (xmlhttp, parentId, containerId) => {
  // http://nrodwiki.rockshore.net/index.php/NRE_Darwin_Web_Service_(Public)
  // https://stackoverflow.com/questions/124269/simplest-soap-example
  xmlhttp.open('POST', 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx', true);
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
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

const soapRequest = (from, to) => {
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

const setupTrainTimeElement = (parentId, containerId, from, to) => {
  let xmlhttp = new XMLHttpRequest();
  setupTrainXmlRequest(xmlhttp, parentId, containerId);

  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(soapRequest(from, to));
}

const itsTheMorning = () => {
  const newDate = new Date();
  const hours = newDate.getHours();
  return hours < 12;
}

const fetchTrainTimes = () => {
  if (itsTheMorning()) {
    setupTrainTimeElement(".trains-to-old", "train-time-to-old", "NSG", "OLD");
  } else {
    setupTrainTimeElement(".trains-to-nsg", "train-time-to-nsg", "OLD", "NSG");
  }
}
