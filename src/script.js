
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
let minutes = now.getMinutes();

let sentance = document.querySelector("#time-day");

sentance.innerHTML = `${week} ${hour}:${minutes}`;


//Get geolocation
function showTemperature(response){
  let temperature = Math.round(response.data.main.temp)
  let h2 = document.querySelector("h2")
  let h3 = document.querySelector("span")
  let cityName = response.data.name
  h2.innerHTML = `${cityName}`
  h3.innerHTML = `${temperature}`

}

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
}


searchButton.addEventListener("click", cityTemperature);


//celcius to fahrenheit

let temperatureCelcius = document.querySelector("#celcius");
let temperatureFahrenheit = document.querySelector("#fahrenheit");
let h3 = document.querySelector("span");

function changeFahrenheit() {
  h3.innerHTML = `66`;
  temperatureCelcius.classList.remove("temperature");
  temperatureFahrenheit.classList.add("temperature");
}
function changeCelcius() {
  h3.innerHTML = `19`;
  temperatureCelcius.classList.add("temperature");
  temperatureFahrenheit.classList.remove("temperature");
}

temperatureCelcius.addEventListener("click", changeCelcius);

temperatureFahrenheit.addEventListener("click", changeFahrenheit);
