function createDiv(value, className) {
  let element;
  element = document.createElement("div");
  element.innerText = value;
  element.className = className;
  return element;
}

function createWeatherConditionIcon(value) {
  let element = document.createElement("img");
  element.className = "condition";
  element.src = `https://www.metaweather.com/static/img/weather/png/64/${value}.png`
  return element;
}

function createAnchor(text, url) {
  let anchor = document.createElement("a");
  anchor.innerText = text;
  anchor.href = `${url}`;
  return anchor;
}

function append(parent, childArray) {
  return childArray.map(child => {
    if (!child) return;
    parent.appendChild(child)
  });
}
