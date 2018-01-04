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

export default function dayAndTime() {
  daytimeContainer.innerText = date.toLocaleDateString('en-GB', dateOptions);

  setInterval(() => {
    date = new Date();
    daytimeContainer.innerText = date.toLocaleDateString('en-GB', dateOptions);
  }, 60000);
}
