//current time and day

  
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


//Show temperature

function showTemperature(response){
  let temperature = Math.round(response.data.main.temp)
  let h2 = document.querySelector("h2")
  let h3 = document.querySelector("#currentTemperature")
  let cityName = response.data.name
  let status = document.querySelector("#status")
  let description = document.querySelector("#description")
  let icon = document.querySelector("#icon");
  let date = document.querySelector("#time-day");

  celsiusTemperature = response.data.main.temp;

  date.innerHTML = formatDate(response.data.dt * 1000);
  h2.innerHTML = `${cityName}`
  h3.innerHTML = Math.round(celsiusTemperature);
  status.innerHTML = response.data.weather[0].main
  description.innerHTML = response.data.weather[0].description
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  
  let unit = "metric"
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308"
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function deafaultCity (){
  let cityName = `São Paulo`
  let unit = "metric"
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`
  axios.get(apiUrl).then(showTemperature)

  
}


//Get geolocation

function showPosition(position){
  let lat = (position.coords.latitude)
  let lon = (position.coords.longitude)
  let unit = "metric"
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
  axios.get(apiUrl).then(showTemperature)

}
 
function currentPosition (){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition)
}

let locationButton = document.querySelector("#location-button")
locationButton.addEventListener("click", currentPosition)


//Search city temperature
let searchForm = document.querySelector("#search-form");
let searchButton = document.querySelector("#search-button");
let h2 = document.querySelector("h2");


function cityTemperature (){
  event.preventDefault();
  let cityName = `${searchForm.value}`
  let unit = "metric"
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`
  axios.get(apiUrl).then(showTemperature)
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}


searchButton.addEventListener("click", cityTemperature);

//Forecast

function displayForecast(response) {
  let cityName = `${searchForm.value}`
  let unit = "metric"
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308"
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${apiKey}`

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `

  <dev class="row" id="forecastBox">
    <dev class="col-3">
      <h6>
        <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      </h6>
    </dev>
    <dev class="col-6">
      <h4>
        ${formatHours(forecast.dt * 1000)}
      </h4>
      <h5>
        <strong>
          ${Math.round(forecast.main.temp_max)}°C
        </strong>
        / ${Math.round(forecast.main.temp_min)}°C
      </h5>
    </dev>
  </dev>
`;
}
}


//celcius to fahrenheit


let h3 = document.querySelector("#currentTemperature");

function changeFahrenheit() {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureCelcius.classList.remove("active");
  temperatureFahrenheit.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function changeCelcius() {
  event.preventDefault();
  temperatureCelcius.classList.add("active");
  temperatureFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let temperatureCelcius = document.querySelector("#celcius");
temperatureCelcius.addEventListener("click", changeCelcius);

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", changeFahrenheit);


deafaultCity();