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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function updateForecast(response) {
  let forecast = response.data.daily;

  let dayForecast = `<div class="row forecast">`;

  forecast.forEach((element, index) => {
    if (index > 0 && index < 7) {
      dayForecast =
        dayForecast +
        `<div class="col-2 col-md-2 forecast-format">
      <div class="day">${formatForecastDay(element.time)}</div>
      <img class="icon-weekday"
        src=${element.condition.icon_url}
        alt=${element.condition.icon}
      />
      <div class="forecast-temperature">
       <span class="forecast-max-temperature">↑${Math.round(
         element.temperature.maximum
       )}°</span>
      <span class="forecast-min-temperature">↓${Math.round(
        element.temperature.minimum
      )}°</span>
      </div>
    </div>`;
    }
  });

  dayForecast = dayForecast + `</div>`;
  let weatherForecast = document.getElementById("weather-forecast");
  weatherForecast.innerHTML = dayForecast;
}

//getting data for 7day forecast through coordinates info from daily forecast
function getForecast(coordinates) {
  let key = `ca8fboc4888373atb3f492ce6063330f`;
  let units = "metric";
  let celsius = document.querySelector("#c");
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);

  fahrenheit.addEventListener("click", displayTemperatureF);
  function displayTemperatureF(event) {
    event.preventDefault();
    units = "imperial";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${key}&units=${units}`;
    axios.get(apiUrl).then(updateForecast);
    celsius.addEventListener("click", displayTemperatureC);
  }
  function displayTemperatureC(event) {
    event.preventDefault();
    units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${key}&units=${units}`;
    axios.get(apiUrl).then(updateForecast);
    fahrenheit.addEventListener("click", displayTemperatureF);
  }
}

//updating data on current weather (daily forecast)
function displayTemperature(response) {
  getForecast(response.data.coord);

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
  ).toFixed(1);
  elementHumidity.innerHTML = response.data.main.humidity;
  elementWind.innerHTML = parseFloat(response.data.wind.speed).toFixed(1);
  elementDescription.innerHTML = weatherDescription;

  //update time
  let elementTime = document.querySelector("#update-time");
  elementTime.innerHTML = formatTime(response.data.dt * 1000);
  //update date
  let elementDate = document.querySelector("#update-date");
  elementDate.innerHTML = formatDate(response.data.dt * 1000);
  //weather icon
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${weatherDescription}`);
}

//1.2 search form for the city
function searchingTown(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityName = cityInput.value;
  ///api getting weather data from OpenWeather
  let apiKey = `cb286bad3607984b41ed10c8de5cf00e`;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(urlWeather).then(displayTemperature);
}

//1.1 Searching for local weather- calling from findLocalWeather
function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `cb286bad3607984b41ed10c8de5cf00e`;
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(openWeatherUrl).then(displayTemperature);
}

//0
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

//Event Listener

let celsiusTemperature = null;
let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", calculateF);

let findTown = document.querySelector("#search-form");
findTown.addEventListener("submit", searchingTown);

let magnifier = document.getElementById("magnifier");
magnifier.addEventListener("submit", searchingTown);
