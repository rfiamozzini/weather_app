//Homework Week 4
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
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

let now = new Date();

let date = now.getDate();
let days = weekDays[now.getDay()];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

currentDate.innerHTML = `${days}, ${date} ${month}, ${year}`;
currentTime.innerHTML = `Last updated: ${hours}:${minutes}`;

let apiKey = "d2dea6f10ea74e3ef22300c3ed13b2a2";

// Homework Week 5

function searchCity(response) {
  console.log(response.data.main.temp_max);

  let apiTemperature = Math.round(response.data.main.temp);
  let apiFeelsLike = Math.round(response.data.main.feels_like);
  let apiHumidity = Math.round(response.data.main.humidity);
  let apiWind = Math.round(response.data.wind.speed);
  let apiDescription = response.data.weather[0].description;
  let apiMaxTemp = Math.round(response.data.main.temp_max);
  let apiMinTemp = Math.round(response.data.main.temp_min);
  let apiCity = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperatureTag = document.querySelector("#temperature");
  let feelsLikeTag = document.querySelector("#feels-like");
  let humidityTag = document.querySelector("#humidity");
  let windSpeedTag = document.querySelector("#wind-speed");
  let descriptionTag = document.querySelector("#description");
  let h1 = document.querySelector("h1");
  let iconTag = document.querySelector("#icon");
  let maxTempTag = document.querySelector("#max-temp");
  let minTempTag = document.querySelector("#min-temp");

  h1.innerHTML = apiCity;
  temperatureTag.innerHTML = `${apiTemperature}°`;
  feelsLikeTag.innerHTML = apiFeelsLike;
  humidityTag.innerHTML = `Humidity: ${apiHumidity}%`;
  windSpeedTag.innerHTML = `Wind: ${apiWind}km/h`;
  descriptionTag.innerHTML = apiDescription;
  maxTempTag.innerHTML = apiMaxTemp;
  minTempTag.innerHTML = apiMinTemp;

  iconTag.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchAndDisplay(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let city = searchInput.value;

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let apiKey = "d2dea6f10ea74e3ef22300c3ed13b2a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(searchCity);
}

//Bonus Week 5

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchAndDisplay);

function displayLocalWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(searchCity);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(displayLocalWeather);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureTag = document.querySelector("#temperature");
  temperatureTag.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureTag = document.querySelector("#temperature");
  temperatureTag.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
