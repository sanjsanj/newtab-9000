/* global fetch, document */

export default function fetchBtcPrice() {
  fetch('https://api.coindesk.com/v1/bpi/currentprice/gbp.json')
    .then(response => response.json())
    .then((data) => {
      const btcContainer = document.querySelector('.btc-container');
      const btcGbpRate = parseInt((data.bpi.GBP.rate).replace(/,/g, ''), 10);
      btcContainer.innerHTML += btcGbpRate;
    })
    .catch(err => console.log(err));
}
