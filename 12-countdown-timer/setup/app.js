const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4'); // Alternatively use 'data-id', instead of multiple divs with the name of 'deadline-format'

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// ALWAYS 10 days in the
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
// let futureDate = new Date(2025, 4, 23, 11, 30, 0);
// let futureDate = new Date();

const weekday = weekdays[futureDate.getDay()];
const day = futureDate.getDate();
const month = months[futureDate.getMonth()];
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// let month = futureDate.getMonth();
// month = months[month];

giveaway.textContent = `giveaway ends on ${weekday}, ${day} ${month} ${year} ${hours}:${minutes}am`;


// Future time in miliseconds (ms)
const futureTime = futureDate.getTime(); // Time in ms

function getReaminingTime() {
  const today = new Date().getTime();
  const timeTillFutureDate = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60m
  // 1d = 24h

  // Values in ms (miliseconds)
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerHour = 1000 * 60 * 60;
  const msPerMinute = 1000 * 60;
  const msPerSecond = 1000;

  let daysTillFutureDate = Math.floor(timeTillFutureDate / msPerDay);
  let hoursTillFutureDate = Math.floor((timeTillFutureDate % msPerDay) / msPerHour);
  let minutesTillFutureDate = Math.floor((timeTillFutureDate % msPerHour) / msPerMinute);
  let secondstillFutureDate = Math.floor((timeTillFutureDate % msPerMinute) / msPerSecond);

  const values = [daysTillFutureDate, hoursTillFutureDate, minutesTillFutureDate, secondstillFutureDate];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  let deadlineIsExpired = timeTillFutureDate < 0;

  if (deadlineIsExpired) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

// Countdown
let countdown = setInterval(getReaminingTime, 1000);

// Initial initial values
getReaminingTime();