export function createDiv(value, className) {
  const element = document.createElement("div");
  element.innerText = value;
  element.className = className;
  return element;
}

export function createWeatherConditionIcon(value) {
  const element = document.createElement("img");
  element.className = "condition";
  element.src = `https://www.metaweather.com/static/img/weather/png/64/${value}.png`;
  return element;
}

export function createAnchor(text, url) {
  const anchor = document.createElement("a");
  anchor.innerText = text;
  anchor.href = `${url}`;
  return anchor;
}

export function append(parent, childArray) {
  childArray.map(child => {
    if (!child) return;
    parent.appendChild(child);
  });
}
