/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createDiv;
/* harmony export (immutable) */ __webpack_exports__["d"] = createWeatherConditionIcon;
/* harmony export (immutable) */ __webpack_exports__["b"] = createAnchor;
/* harmony export (immutable) */ __webpack_exports__["a"] = append;
/* global document */

function createDiv(value, className) {
  const element = document.createElement('div');
  element.innerText = value;
  element.className = className;
  return element;
}

function createWeatherConditionIcon(value) {
  const element = document.createElement('img');
  element.className = 'condition';
  element.src = `https://www.metaweather.com/static/img/weather/png/64/${value}.png`;
  return element;
}

function createAnchor(text, url) {
  const anchor = document.createElement('a');
  anchor.innerText = text;
  anchor.href = `${url}`;
  return anchor;
}

function append(parent, childArray) {
  childArray.map((child) => {
    if (!child) return;
    parent.appendChild(child);
  });
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  railApiToken: '0104ba6b-e4ec-4e48-95e5-4549bed1bce0',
  gitToken: 'f7cc1ef4967e3ababd282607f55dd46ff39af403',
  newsApi: '87efed34d7b2420fbf5d19ce4cbea0eb',
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_weather__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_trainTimes__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_issues__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_news__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_btc__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_dayAndTime__ = __webpack_require__(11);
/* global document, chrome */








Object(__WEBPACK_IMPORTED_MODULE_5__modules_dayAndTime__["a" /* default */])();
Object(__WEBPACK_IMPORTED_MODULE_0__modules_weather__["a" /* default */])();
Object(__WEBPACK_IMPORTED_MODULE_1__modules_trainTimes__["a" /* default */])();
Object(__WEBPACK_IMPORTED_MODULE_2__modules_issues__["a" /* fetchIssues */])();
Object(__WEBPACK_IMPORTED_MODULE_2__modules_issues__["b" /* fetchNotifications */])();
Object(__WEBPACK_IMPORTED_MODULE_3__modules_news__["a" /* default */])();
Object(__WEBPACK_IMPORTED_MODULE_4__modules_btc__["a" /* default */])();

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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchWeather;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createElement__ = __webpack_require__(0);
/* global document, fetch */



const weatherContainer = document.querySelector('.weather-container');

const getDayName = index => (index === 0 ? 'today' : 'tomorrow');

function fetchWeather() {
  fetch('https://www.metaweather.com/api/location/44418/')
    .then(response => response.json())
    .then((data) => {
      data.consolidated_weather.slice(0, 2).map((item, index) => {
        const minTemp = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(item.min_temp.toFixed(0), 'min-temp');
        const maxTemp = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(item.max_temp.toFixed(0), 'max-temp');
        const temp = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(null, 'temp');
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(temp, [minTemp, maxTemp]);

        const condition = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["d" /* createWeatherConditionIcon */])(item.weather_state_abbr);
        const day = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(getDayName(index), 'weather-day');
        const dayItem = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(null, 'weather-day-item');
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(dayItem, [temp, condition, day]);

        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(weatherContainer, [dayItem]);
      });
    })
    .catch(error => console.log(error));
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchTrainTimes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__secrets__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vendor_xmlToJSON_min__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vendor_xmlToJSON_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vendor_xmlToJSON_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createElement__ = __webpack_require__(0);




const setupTrainXmlRequest = (xmlhttp, parentId, containerId) => {
  // http://nrodwiki.rockshore.net/index.php/NRE_Darwin_Web_Service_(Public)
  // https://stackoverflow.com/questions/124269/simplest-soap-example
  xmlhttp.open('POST', 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx', true);
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        const result = __WEBPACK_IMPORTED_MODULE_1__vendor_xmlToJSON_min___default.a.parseString(xmlhttp.response);
        const toOldContainer = document.getElementById(containerId);
        const services = result.Envelope[0].Body[0].GetDepartureBoardResponse[0].GetStationBoardResult[0].trainServices[0].service;
        services.map((item) => {
          const std = item.std[0]._text;
          const etd = item.etd[0]._text;
          const stdDiv = Object(__WEBPACK_IMPORTED_MODULE_2__createElement__["c" /* createDiv */])(std, 'std');
          const etdDiv = Object(__WEBPACK_IMPORTED_MODULE_2__createElement__["c" /* createDiv */])(etd, 'etd');
          const timeBlock = Object(__WEBPACK_IMPORTED_MODULE_2__createElement__["c" /* createDiv */])(null, 'time-block');
          Object(__WEBPACK_IMPORTED_MODULE_2__createElement__["a" /* append */])(timeBlock, [stdDiv, etdDiv]);
          Object(__WEBPACK_IMPORTED_MODULE_2__createElement__["a" /* append */])(toOldContainer, [timeBlock]);
        });
      }
    }
  };
  const parentElement = document.querySelector(parentId);
  parentElement.style.display = 'inline-block';
};

const soapRequest = (from, to) => `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2016-02-16/ldb/">
          <soap:Header>
              <typ:AccessToken>
                <typ:TokenValue>${__WEBPACK_IMPORTED_MODULE_0__secrets__["a" /* default */].railApiToken}</typ:TokenValue>
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

const setupTrainTimeElement = (parentId, containerId, from, to) => {
  const xmlhttp = new XMLHttpRequest();
  setupTrainXmlRequest(xmlhttp, parentId, containerId);

  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(soapRequest(from, to));
};

const itsTheMorning = () => {
  const newDate = new Date();
  const hours = newDate.getHours();
  return hours < 12;
};

function fetchTrainTimes() {
  if (itsTheMorning()) {
    setupTrainTimeElement('.trains-to-old', 'train-time-to-old', 'NSG', 'OLD');
  } else {
    setupTrainTimeElement('.trains-to-nsg', 'train-time-to-nsg', 'OLD', 'NSG');
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;var xmlToJSON = function () { this.version = "1.3.4"; var e = { mergeCDATA: !0, grokAttr: !0, grokText: !0, normalize: !0, xmlns: !0, namespaceKey: "_ns", textKey: "_text", valueKey: "_value", attrKey: "_attr", cdataKey: "_cdata", attrsAsObject: !0, stripAttrPrefix: !0, stripElemPrefix: !0, childrenAsArray: !0 }, t = new RegExp(/(?!xmlns)^.*:/), r = new RegExp(/^\s+|\s+$/g); return this.grokType = function (e) { return /^\s*$/.test(e) ? null : /^(?:true|false)$/i.test(e) ? "true" === e.toLowerCase() : isFinite(e) ? parseFloat(e) : e }, this.parseString = function (e, t) { return this.parseXML(this.stringToXML(e), t) }, this.parseXML = function (a, n) { for (var s in n) e[s] = n[s]; var l = {}, i = 0, o = ""; if (e.xmlns && a.namespaceURI && (l[e.namespaceKey] = a.namespaceURI), a.attributes && a.attributes.length > 0) { var c = {}; for (i; i < a.attributes.length; i++) { var u = a.attributes.item(i); m = {}; var p = ""; p = e.stripAttrPrefix ? u.name.replace(t, "") : u.name, e.grokAttr ? m[e.valueKey] = this.grokType(u.value.replace(r, "")) : m[e.valueKey] = u.value.replace(r, ""), e.xmlns && u.namespaceURI && (m[e.namespaceKey] = u.namespaceURI), e.attrsAsObject ? c[p] = m : l[e.attrKey + p] = m } e.attrsAsObject && (l[e.attrKey] = c) } if (a.hasChildNodes()) for (var y, d, m, h = 0; h < a.childNodes.length; h++)4 === (y = a.childNodes.item(h)).nodeType ? e.mergeCDATA ? o += y.nodeValue : l.hasOwnProperty(e.cdataKey) ? (l[e.cdataKey].constructor !== Array && (l[e.cdataKey] = [l[e.cdataKey]]), l[e.cdataKey].push(y.nodeValue)) : e.childrenAsArray ? (l[e.cdataKey] = [], l[e.cdataKey].push(y.nodeValue)) : l[e.cdataKey] = y.nodeValue : 3 === y.nodeType ? o += y.nodeValue : 1 === y.nodeType && (0 === i && (l = {}), d = e.stripElemPrefix ? y.nodeName.replace(t, "") : y.nodeName, m = xmlToJSON.parseXML(y), l.hasOwnProperty(d) ? (l[d].constructor !== Array && (l[d] = [l[d]]), l[d].push(m)) : (e.childrenAsArray ? (l[d] = [], l[d].push(m)) : l[d] = m, i++)); else o || (e.childrenAsArray ? (l[e.textKey] = [], l[e.textKey].push(null)) : l[e.textKey] = null); if (o) if (e.grokText) { var x = this.grokType(o.replace(r, "")); null !== x && void 0 !== x && (l[e.textKey] = x) } else e.normalize ? l[e.textKey] = o.replace(r, "").replace(/\s+/g, " ") : l[e.textKey] = o.replace(r, ""); return l }, this.xmlToString = function (e) { try { return e.xml ? e.xml : (new XMLSerializer).serializeToString(e) } catch (e) { return null } }, this.stringToXML = function (e) { try { var t = null; return window.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = !1, t.loadXML(e), t) } catch (e) { return null } }, this }.call({}); "undefined" != typeof module && null !== module && module.exports ? module.exports = xmlToJSON : "function" == "function" && __webpack_require__(7) && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return xmlToJSON }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchIssues;
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchNotifications;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createElement__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__secrets__ = __webpack_require__(1);



const issuesContainer = document.querySelector('.issues-container');
const issueIcon = '<svg aria-hidden="true" class="issue-icon-svg" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>';
const commentIcon = '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path></svg>';

const setIssueLabels = (issueNumber, anchorDiv) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/issues/${issueNumber}/labels?access_token=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].gitToken}`)
    .then(response => response.json())
    .then((labelData) => {
      const element = (labelData[0] === undefined) ? null : Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(labelData[0].name, 'issue-label');
      Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(anchorDiv, [element]);
    })
    .catch(err => console.log(err));
};

const setComments = (issueNumber, anchor) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls/${issueNumber}/comments?access_token=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].gitToken}`)
    .then(response => response.json())
    .then((comments) => {
      if (comments.length < 1) return null;

      const element = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(comments.length, 'issue-comment-number');
      const icon = document.createElement('div');
      icon.innerHTML = commentIcon;
      icon.className = 'issue-comment-icon';

      Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(anchor, [icon, element]);
    })
    .catch(err => console.log(err));
};

const setReviewStatus = (issueNumber, info) => {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls/${issueNumber}/reviews?state=all&access_token=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].gitToken}`)
    .then(response => response.json())
    .then((data) => {
      let text = 'Review required';
      data.forEach((review) => {
        if (review.state === 'APPROVED') {
          text = 'Approved';
        }
      });
      info.innerText += ` - ${text}`;
    })
    .catch(err => console.log(err));
};

const timeSince = (date) => {
  date = new Date(date);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

function fetchIssues() {
  fetch(`https://api.github.com/repos/ComparetheMarket/CTM.MIT/pulls?state=all&access_token=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].gitToken}`)
    .then(response => response.json())
    .then((data) => {
      const openIssuesArray = data.filter(issue => issue.state === 'open');

      openIssuesArray.map((issue) => {
        const icon = document.createElement('div');
        icon.innerHTML = issueIcon;
        icon.className = 'issue-icon';

        const anchor = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["b" /* createAnchor */])(issue.head.ref, `${issue.html_url}/files`);
        anchor.className = 'issue';
        setComments(issue.number, anchor);
        setIssueLabels(issue.number, anchor);

        const lastUpdated = timeSince(issue.updated_at);
        const info = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(`${issue.user.login} - last updated ${lastUpdated} ago`, 'issue-info');
        setReviewStatus(issue.number, info);

        const anchorDiv = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(null, 'anchor-container');
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(anchorDiv, [icon, anchor, info]);
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(issuesContainer, [anchorDiv]);
      });
    })
    .catch(err => console.log(err));
}

function fetchNotifications() {
  fetch(`https://api.github.com/notifications?access_token=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].gitToken}`)
    .then(response => response.json())
    .then((data) => {
      if (data.length > 0) {
        document.querySelector('.issues-notifications').style.display = 'inline-block';
      }
    })
    .catch(err => console.log(err));
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchNews;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createElement__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__secrets__ = __webpack_require__(1);



const createSourceImage = (sourceId) => {
  const element = document.createElement('img');
  element.className = 'news-source-image';
  switch (sourceId) {
    case 'bbc-news':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=www.bbc.co.uk%2fnews';
      break;

    case 'google-news-uk':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=google.co.uk';
      break;

    case 'the-next-web':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=https%3a%2f%2fthenextweb.com%2f';
      break;

    case 'the-verge':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=theverge.com';
      break;

    case 'techcrunch':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=https%3a%2f%2ftechcrunch.com%2f';
      break;

    case 'techradar':
      element.src = 'https://icons.better-idea.org/icon?size=80..120..200&url=http%3a%2f%2fwww.techradar.com%2f';
      break;

    default:
      break;
  }
  return element;
};

function fetchNews() {
  fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,google-news-uk,techcrunch,techradar,the-next-web,the-verge&apiKey=${__WEBPACK_IMPORTED_MODULE_1__secrets__["a" /* default */].newsApi}`)
    .then(response => response.json())
    .then((data) => {
      const newsContainer = document.querySelector('.news-container');
      data.articles.map((article) => {
        const anchor = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["b" /* createAnchor */])(article.title, article.url);
        const articleDiv = Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["c" /* createDiv */])(null, 'news-item');
        anchor.className = 'news-item-anchor';
        const sourceImage = createSourceImage(article.source.id);
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(articleDiv, [sourceImage, anchor]);
        Object(__WEBPACK_IMPORTED_MODULE_0__createElement__["a" /* append */])(newsContainer, [articleDiv]);
      });
    })
    .catch(err => console.log(err));
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchBtcPrice;
/* global fetch, document */

function fetchBtcPrice() {
  fetch('https://api.coindesk.com/v1/bpi/currentprice/gbp.json')
    .then(response => response.json())
    .then((data) => {
      const btcContainer = document.querySelector('.btc-container');
      const btcGbpRate = parseInt((data.bpi.GBP.rate).replace(/,/g, ''), 10);
      btcContainer.innerHTML += btcGbpRate;
    })
    .catch(err => console.log(err));
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dayAndTime;
const daytimeContainer = document.querySelector('.daytime-container');

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

let date = new Date();

function dayAndTime() {
  daytimeContainer.innerText = date.toLocaleDateString('en-GB', dateOptions);

  setInterval(() => {
    date = new Date();
    daytimeContainer.innerText = date.toLocaleDateString('en-GB', dateOptions);
  }, 60000);
}


/***/ })
/******/ ]);