//current time and day

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let now = new Date();

let week = weekDays[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
  }
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let sentance = document.querySelector("#time-day");

sentance.innerHTML = `${week} ${hour}:${minutes}`;


//Show temperature

function showTemperature(response){
  let temperature = Math.round(response.data.main.temp)
  let h2 = document.querySelector("h2")
  let h3 = document.querySelector("#currentTemperature")
  let cityName = response.data.name
  let status = document.querySelector("#status")
  let description = document.querySelector("#description")
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = `${cityName}`
  h3.innerHTML = Math.round(celsiusTemperature);
  status.innerHTML = response.data.weather[0].main
  description.innerHTML = response.data.weather[0].description
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  console.log(apiUrl)
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
}


searchButton.addEventListener("click", cityTemperature);


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


deafaultCity()