console.log("I'm connected")

var APIKey = "cb74eb0e90621bbc58227b168f04cfc8";
var city = "Atlanta";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Weather \n----------');
    console.log(data);
    console.log(new Date(data.dt*1000).toLocaleDateString("en-US"))
    console.log(data.main.feels_like);
    console.log(data.wind.speed)
    console.log(data.main.humidity)
    var currentDateSpan = document.getElementById("a-date");
    currentDateSpan.textContent = " (" + new Date(data.dt*1000).toLocaleDateString("en-US") + ")";
    var currentTempP = document.getElementById("a-temp");
    currentTempP.textContent = "Temp: " + data.main.feels_like + "℉";
    var currentWindP = document.getElementById("a-wind");
    currentWindP.textContent = "Wind: " + data.wind.speed + " mph";
    var currentHumidityP = document.getElementById("a-humidity");
    currentHumidityP.textContent = "Humidity: " + data.main.humidity + " %";
  });