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
  let weekDay = week[date.getDay()];

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
  let elementCity = document.querySelector("#city");
  let elementCountry = document.querySelector("#country");
  let elementFeelsLike = document.querySelector("#feels-like-element");
  let elementMaxT = document.querySelector("#maxT");
  let elementMinT = document.querySelector("#minT");
  let elementCurrentTemp = document.querySelector("#current-temperature");
  let elementPressure = document.querySelector("#pressure");
  let elementHumidity = document.querySelector("#humidity");
  let elementWind = document.querySelector("#wind");

  let weatherDescription = response.data.weather[0].description;
  elementCity.innerHTML = response.data.name;
  elementCountry.innerHTML = response.data.sys.country;
  elementFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  elementMaxT.innerHTML = Math.round(response.data.main.temp_max);
  elementMinT.innerHTML = Math.round(response.data.main.temp_min);

  celsiusTemperature = response.data.main.temp;
  elementCurrentTemp.innerHTML = Math.round(celsiusTemperature);
  elementPressure.innerHTML = parseFloat(
    response.data.main.pressure / 1000
  ).toFixed(2);
  elementHumidity.innerHTML = response.data.main.humidity;
  elementWind.innerHTML = response.data.wind.speed;
  elementDescription.innerHTML = weatherDescription;

  //update time
  let elementTime = document.querySelector("#update-time");
  elementTime.innerHTML = formatTime(response.data.dt * 1000);
  //update date
  let elementDate = document.querySelector("#update-date");
  elementDate.innerHTML = formatDate(response.data.dt * 1000);
  // update weatherIcon
  let icon = document.querySelector("#weather-icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  icon.setAttribute("alt", weatherDescription);
}

//search form for the city

function searchingTown(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityName = cityInput.value;
  //api getting weather data from OpenWeather

  let apiKey = `fb99ccb8bab77cbda8d3a1f7be433a27`;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(urlWeather).then(displayTemperature);
}

let findTown = document.querySelector("#search-form");
findTown.addEventListener("submit", searchingTown);

let magnifier = document.getElementById("magnifier");
magnifier.addEventListener("submit", searchingTown);

//Searching for local weather
function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `fb99ccb8bab77cbda8d3a1f7be433a27`;
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(openWeatherUrl).then(displayTemperature);
}

function findLocalWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.getElementById("location");
button.addEventListener("click", findLocalWeather);

//converting temperature units (celsius to farenheit)
//calculate F
function calculateF(event) {
  event.preventDefault();

  let temperature = document.getElementById("current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
  //injecting css (change of color)
  let fahrenheit = document.querySelector("#f");
  let celsius = document.querySelector("#c");
  fahrenheit.style.color = "black";
  celsius.style.color = "rgba(54, 56, 62, 0.4)";

  celsius.addEventListener("click", calculateC);
}

function calculateC(event) {
  event.preventDefault();
  let temperature = document.getElementById("current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let celsius = document.querySelector("#c");
  let fahrenheit = document.querySelector("#f");
  celsius.style.color = "black";
  fahrenheit.style.color = "rgba(54, 56, 62, 0.4)";
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", calculateF);
