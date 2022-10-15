function formatDate(timestamp) {
  let date = new Date(timestamp);

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = date.getMonth() + 1;
  console.log(month);

  let weekDay = week[date.getDay()];
  console.log(date);
  //formating date
  return ` ${weekDay}, ${date.getDate()}/${month}/${date.getFullYear()}`;
}

function formatTime(timestamp) {
  //formating weekday, time
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  minutes = minutes.toString();
  let hour = date.getHours();
  hour = hour.toString();
  let time = `${hour.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

  return `${time}`;
}
//updating data on current weather
function displayTemperature(response) {
  console.log(response.data);
  let elementDescription = document.querySelector(
    "#current-weather-description"
  );
  let elementFeelsLike = document.querySelector("#feels-like-element");
  let elementMaxT = document.querySelector("#maxT");
  let elementMinT = document.querySelector("#minT");
  let elementCurrentTemp = document.querySelector("#current-temperature");
  let elementPressure = document.querySelector("#pressure");
  let elementHumidity = document.querySelector("#humidity");
  let elementWind = document.querySelector("#wind");

  elementDescription.innerHTML = response.data.weather[0].description;
  elementFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  elementMaxT.innerHTML = Math.round(response.data.main.temp_max);
  elementMinT.innerHTML = Math.round(response.data.main.temp_min);
  elementCurrentTemp.innerHTML = Math.round(response.data.main.temp);
  elementPressure.innerHTML = parseFloat(
    response.data.main.pressure / 1000
  ).toFixed(2);
  elementHumidity.innerHTML = response.data.main.humidity;
  elementWind.innerHTML = response.data.wind.speed;

  //update time
  let elementTime = document.querySelector("#update-time");
  elementTime.innerHTML = formatTime(response.data.dt * 1000);
  //update date
  let elementDate = document.querySelector("#update-date");
  elementDate.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `http://openweathermap.org/img/wn/10d@2x.png`;
}

//updating icon

//api getting weather data from OpenWeather
let cityName = "New York, US";
let apiKey = `fb99ccb8bab77cbda8d3a1f7be433a27`;
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(urlWeather).then(displayTemperature);
