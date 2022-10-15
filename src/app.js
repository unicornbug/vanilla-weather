//formating date
let date = new Date();
let month = date.getMonth() + 1;
let dateFormat = `${date.getDate()}/${month}/${date.getFullYear()}`;
let updateDate = document.querySelector("#updateDate");
updateDate.innerHTML = dateFormat;

//formating weekday, time
let minutes = date.getMinutes();
minutes = minutes.toString();
let hour = date.getHours();
hour = hour.toString();
let time = `${hour.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = week[date.getDay()];
let upadateToday = document.querySelector("#today");
upadateToday.innerHTML = `   ${weekDay},`;

let updateTime = document.querySelector("#update-time");
updateTime.innerHTML = `   ${time}`;
