function showCurrentTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let weekday = days[date.getDay()];
  let day = date.getDate();
  let currentDate = document.querySelector(".date-time");
  currentDate.innerHTML = `${weekday} ${day} ${month} ${hour}:${minute}`;
}

function showCityName(event) {
  event.preventDefault();
  let cityName = document.querySelector(".city-name");
  let cityField = document.querySelector(".city-field");
  let city = cityField.value;
  cityName.innerHTML = city;
  retrieveCurrentTemperature(city);
}

function retrieveCurrentTemperature(city) {
  let apiKey = "d3a3d971f59f605923c01f618f48e278";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //console.log(apiKey);
  //console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWind = response.data.wind.speed;
  let currentHumidity = response.data.main.humidity;
  let currentDescription = response.data.weather[0].description;
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  temp.innerHTML = `${currentTemperature}°C`;
  wind.innerHTML = `Wind: ${currentWind} m/s`;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  description.innerHTML = currentDescription;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d3a3d971f59f605923c01f618f48e278";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  //console.log(apiKey);
  //console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentCity);
}

function showCurrentCity(response) {
  let cityName = document.querySelector(".city-name");
  let city = response.data.name;
  cityName.innerHTML = city;
  retrieveCurrentTemperature(city);
}

showCurrentTime();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityName);
let currentLocBtn = document.querySelector("#current-loc-btn");
currentLocBtn.addEventListener("click", getCurrentLocation);

let celciusBtn = document.querySelector("#celcius-btn");
celciusBtn.addEventListener("click", changeToCelcius);
let farenheitBtn = document.querySelector("#farenheit-btn");
farenheitBtn.addEventListener("click", changeToFarenheit);

/*function changeToFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let tempFarenheit = Math.round(currentTemperature * 1.8 + 32);
  temp.innerHTML = tempFarenheit;
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°F";
}*/

/*function changeToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let tempCelcius = currentTemperature;
  temp.innerHTML = tempCelcius;
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°C";
}*/
