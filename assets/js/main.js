console.log("I'm connected")
var previousSearchesArray = [];

var previousSearches = document.querySelector("#previous-searches")

if(localStorage.getItem("previousSearches") !== null){
    previousSearchesArray = JSON.parse(localStorage.getItem("previousSearches"));
}

console.log(previousSearchesArray)

function printBtn() {
    for (var i = 0; i < previousSearchesArray.length; i++) {
       var btn = document.createElement("button");
       var t = document.createTextNode(previousSearchesArray[i]);
       btn.appendChild(t);
       btn.setAttribute("id",btn.textContent);
       btn.setAttribute("class","previous-search")

       btn.addEventListener("click", (event)=>{
       console.log("you clicked on ", event.target)
       })
      
    document.getElementById("previous-searches").appendChild(btn);

    btn.addEventListener("click", (getWeather)=>{
    var cityNameInput = btn.textContent;
    console.log(cityNameInput);
    getWeather.preventDefault();

    var APIKey = "cb74eb0e90621bbc58227b168f04cfc8";
    var locationQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityNameInput + ",US&limit=1&appid="+ APIKey;

    fetch(locationQueryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Location \n----------');
        console.log(data);
        console.log(data[0].name);
        console.log(data[0].lat);
        console.log(data[0].lon);
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial";
        var cityName = data[0].name;

        fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Weather2 \n----------');
            console.log(data);
            console.log(new Date(data.current.dt*1000).toLocaleDateString("en-US"));
            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.humidity);
            console.log(data.current.uvi);
            console.log(typeof(data.current.uvi));
            console.log(data.current.weather[0].icon)
            var day0LocationSpan = document.getElementById("0-location");
            day0LocationSpan.textContent = cityName;
            var day0DateSpan = document.getElementById("0-date");
            day0DateSpan.textContent = " (" + new Date(data.current.dt*1000).toLocaleDateString("en-US") + ")";
            var day0IconIMG = document.getElementById("0-img");
            day0IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.current.weather[0].icon +"@2x.png")
            var day0TempP = document.getElementById("0-temp");
            day0TempP.textContent = "Temp: " + data.current.temp + "℉";
            var day0WindP = document.getElementById("0-wind");
            day0WindP.textContent = "Wind: " + data.current.wind_speed + " MPH";
            var day0HumidityP = document.getElementById("0-humidity");
            day0HumidityP.textContent = "Humidity: " + data.current.humidity + " %";
            var day0UVP = document.getElementById("uv-value");
            day0UVP.textContent = data.current.uvi;
            
            if(data.current.uvi < 3) {
                day0UVP.setAttribute("style","background-color: rgb(113, 216, 87)");
            }
            else if(data.current.uvi < 6) {
                day0UVP.setAttribute("style","background-color: rgb(181, 184, 35)");
            }
            else if(data.current.uvi < 8) {
                day0UVP.setAttribute("style","background-color: rgb(233, 173, 43)");
            }
            else if(data.current.uvi < 11) {
                day0UVP.setAttribute("style","background-color:rgb(206, 64, 64)");
            }
            else if(11 <= data.current.uvi) {
                day0UVP.setAttribute("style","background-color:rgb(159, 63, 197)");
            }

            // 1 day from now
            console.log(new Date(data.daily[1].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[1].temp.max);
            console.log(data.daily[1].wind_speed);
            console.log(data.daily[1].humidity);
            console.log(data.daily[1].weather[0].icon)
            var day1DateP = document.getElementById("1-date");
            day1DateP.textContent = new Date(data.daily[1].dt*1000).toLocaleDateString("en-US")
            var day1IconIMG = document.getElementById("1-img");
            day1IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon +"@2x.png");
            var day1TempP = document.getElementById("1-temp");
            day1TempP.textContent = "Temp: " + data.daily[1].temp.max + "℉";
            var day1WindP = document.getElementById("1-wind");
            day1WindP.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
            var day1HumidityP = document.getElementById("1-humidity");
            day1HumidityP.textContent = "Humidity: " + data.daily[1].humidity + " %";

            // 2 days from now
            console.log(new Date(data.daily[2].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[2].temp.max);
            console.log(data.daily[2].wind_speed);
            console.log(data.daily[2].humidity);
            console.log(data.daily[2].weather[0].icon)
            var day2DateP = document.getElementById("2-date");
            day2DateP.textContent = new Date(data.daily[2].dt*1000).toLocaleDateString("en-US")
            var day2IconIMG = document.getElementById("2-img");
            day2IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon +"@2x.png");
            var day2TempP = document.getElementById("2-temp");
            day2TempP.textContent = "Temp: " + data.daily[2].temp.max + "℉";
            var day2WindP = document.getElementById("2-wind");
            day2WindP.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
            var day2HumidityP = document.getElementById("2-humidity");
            day2HumidityP.textContent = "Humidity: " + data.daily[2].humidity + " %";

            // 3 days from now
            console.log(new Date(data.daily[3].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[3].temp.max);
            console.log(data.daily[3].wind_speed);
            console.log(data.daily[3].humidity);
            console.log(data.daily[3].weather[0].icon)
            var day3DateP = document.getElementById("3-date");
            day3DateP.textContent = new Date(data.daily[3].dt*1000).toLocaleDateString("en-US")
            var day3IconIMG = document.getElementById("3-img");
            day3IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon +"@2x.png");
            var day3TempP = document.getElementById("3-temp");
            day3TempP.textContent = "Temp: " + data.daily[3].temp.max + "℉";
            var day3WindP = document.getElementById("3-wind");
            day3WindP.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
            var day3HumidityP = document.getElementById("3-humidity");
            day3HumidityP.textContent = "Humidity: " + data.daily[3].humidity + " %";

            // 4 days from now
            console.log(new Date(data.daily[4].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[4].temp.max);
            console.log(data.daily[4].wind_speed);
            console.log(data.daily[4].humidity);
            console.log(data.daily[4].weather[0].icon)
            var day4DateP = document.getElementById("4-date");
            day4DateP.textContent = new Date(data.daily[4].dt*1000).toLocaleDateString("en-US")
            var day4IconIMG = document.getElementById("4-img");
            day4IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon +"@2x.png");
            var day4TempP = document.getElementById("4-temp");
            day4TempP.textContent = "Temp: " + data.daily[4].temp.max + "℉";
            var day4WindP = document.getElementById("4-wind");
            day4WindP.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
            var day4HumidityP = document.getElementById("4-humidity");
            day4HumidityP.textContent = "Humidity: " + data.daily[4].humidity + " %";

            // 5 days from now
            console.log(new Date(data.daily[5].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[5].temp.max);
            console.log(data.daily[5].wind_speed);
            console.log(data.daily[5].humidity);
            console.log(data.daily[5].weather[0].icon)
            var day5DateP = document.getElementById("5-date");
            day5DateP.textContent = new Date(data.daily[5].dt*1000).toLocaleDateString("en-US")
            var day5IconIMG = document.getElementById("5-img");
            day5IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon +"@2x.png");
            var day5TempP = document.getElementById("5-temp");
            day5TempP.textContent = "Temp: " + data.daily[5].temp.max + "℉";
            var day5WindP = document.getElementById("5-wind");
            day5WindP.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
            var day5HumidityP = document.getElementById("5-humidity");
            day5HumidityP.textContent = "Humidity: " + data.daily[5].humidity + " %";
        })
    })
});
    }
}
printBtn()

searchButton = document.getElementById("search");
searchButton.addEventListener("click", function(getWeather){
    var cityNameInput = document.getElementById("city-name").value;
    console.log(cityNameInput);
    getWeather.preventDefault();

var APIKey = "cb74eb0e90621bbc58227b168f04cfc8";
var locationQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityNameInput + ",US&limit=1&appid="+ APIKey;

    fetch(locationQueryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Location \n----------');
        console.log(data);
        console.log(data[0].name);
        console.log(data[0].lat);
        console.log(data[0].lon);
        var weatherQueryURL = "httpss://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial";
        var cityName = data[0].name;

    var previousSearch = document.createElement("button");
    previousSearch.textContent = cityName;
    previousSearches.append(previousSearch)

    previousSearchesArray.push(cityName);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearchesArray));

        fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Weather2 \n----------');
            console.log(data);
            console.log(new Date(data.current.dt*1000).toLocaleDateString("en-US"));
            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.humidity);
            console.log(data.current.uvi);
            console.log(typeof(data.current.uvi));
            console.log(data.current.weather[0].icon)
            var day0LocationSpan = document.getElementById("0-location");
            day0LocationSpan.textContent = cityName;
            var day0DateSpan = document.getElementById("0-date");
            day0DateSpan.textContent = " (" + new Date(data.current.dt*1000).toLocaleDateString("en-US") + ")";
            var day0IconIMG = document.getElementById("0-img");
            day0IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.current.weather[0].icon +"@2x.png")
            var day0TempP = document.getElementById("0-temp");
            day0TempP.textContent = "Temp: " + data.current.temp + "℉";
            var day0WindP = document.getElementById("0-wind");
            day0WindP.textContent = "Wind: " + data.current.wind_speed + " MPH";
            var day0HumidityP = document.getElementById("0-humidity");
            day0HumidityP.textContent = "Humidity: " + data.current.humidity + " %";
            var day0UVP = document.getElementById("uv-value");
            day0UVP.textContent = data.current.uvi;
            
            if(data.current.uvi < 3) {
                day0UVP.setAttribute("style","background-color: rgb(113, 216, 87)");
            }
            else if(data.current.uvi < 6) {
                day0UVP.setAttribute("style","background-color: rgb(181, 184, 35)");
            }
            else if(data.current.uvi < 8) {
                day0UVP.setAttribute("style","background-color: rgb(233, 173, 43)");
            }
            else if(data.current.uvi < 11) {
                day0UVP.setAttribute("style","background-color:rgb(206, 64, 64)");
            }
            else if(11 <= data.current.uvi) {
                day0UVP.setAttribute("style","background-color:rgb(159, 63, 197)");
            }

            // 1 day from now
            console.log(new Date(data.daily[1].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[1].temp.max);
            console.log(data.daily[1].wind_speed);
            console.log(data.daily[1].humidity);
            console.log(data.daily[1].weather[0].icon)
            var day1DateP = document.getElementById("1-date");
            day1DateP.textContent = new Date(data.daily[1].dt*1000).toLocaleDateString("en-US")
            var day1IconIMG = document.getElementById("1-img");
            day1IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon +"@2x.png");
            var day1TempP = document.getElementById("1-temp");
            day1TempP.textContent = "Temp: " + data.daily[1].temp.max + "℉";
            var day1WindP = document.getElementById("1-wind");
            day1WindP.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
            var day1HumidityP = document.getElementById("1-humidity");
            day1HumidityP.textContent = "Humidity: " + data.daily[1].humidity + " %";

            // 2 days from now
            console.log(new Date(data.daily[2].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[2].temp.max);
            console.log(data.daily[2].wind_speed);
            console.log(data.daily[2].humidity);
            console.log(data.daily[2].weather[0].icon)
            var day2DateP = document.getElementById("2-date");
            day2DateP.textContent = new Date(data.daily[2].dt*1000).toLocaleDateString("en-US")
            var day2IconIMG = document.getElementById("2-img");
            day2IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon +"@2x.png");
            var day2TempP = document.getElementById("2-temp");
            day2TempP.textContent = "Temp: " + data.daily[2].temp.max + "℉";
            var day2WindP = document.getElementById("2-wind");
            day2WindP.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
            var day2HumidityP = document.getElementById("2-humidity");
            day2HumidityP.textContent = "Humidity: " + data.daily[2].humidity + " %";

            // 3 days from now
            console.log(new Date(data.daily[3].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[3].temp.max);
            console.log(data.daily[3].wind_speed);
            console.log(data.daily[3].humidity);
            console.log(data.daily[3].weather[0].icon)
            var day3DateP = document.getElementById("3-date");
            day3DateP.textContent = new Date(data.daily[3].dt*1000).toLocaleDateString("en-US")
            var day3IconIMG = document.getElementById("3-img");
            day3IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon +"@2x.png");
            var day3TempP = document.getElementById("3-temp");
            day3TempP.textContent = "Temp: " + data.daily[3].temp.max + "℉";
            var day3WindP = document.getElementById("3-wind");
            day3WindP.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
            var day3HumidityP = document.getElementById("3-humidity");
            day3HumidityP.textContent = "Humidity: " + data.daily[3].humidity + " %";

            // 4 days from now
            console.log(new Date(data.daily[4].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[4].temp.max);
            console.log(data.daily[4].wind_speed);
            console.log(data.daily[4].humidity);
            console.log(data.daily[4].weather[0].icon)
            var day4DateP = document.getElementById("4-date");
            day4DateP.textContent = new Date(data.daily[4].dt*1000).toLocaleDateString("en-US")
            var day4IconIMG = document.getElementById("4-img");
            day4IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon +"@2x.png");
            var day4TempP = document.getElementById("4-temp");
            day4TempP.textContent = "Temp: " + data.daily[4].temp.max + "℉";
            var day4WindP = document.getElementById("4-wind");
            day4WindP.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
            var day4HumidityP = document.getElementById("4-humidity");
            day4HumidityP.textContent = "Humidity: " + data.daily[4].humidity + " %";

            // 5 days from now
            console.log(new Date(data.daily[5].dt*1000).toLocaleDateString("en-US"));
            console.log(data.daily[5].temp.max);
            console.log(data.daily[5].wind_speed);
            console.log(data.daily[5].humidity);
            console.log(data.daily[5].weather[0].icon)
            var day5DateP = document.getElementById("5-date");
            day5DateP.textContent = new Date(data.daily[5].dt*1000).toLocaleDateString("en-US")
            var day5IconIMG = document.getElementById("5-img");
            day5IconIMG.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon +"@2x.png");
            var day5TempP = document.getElementById("5-temp");
            day5TempP.textContent = "Temp: " + data.daily[5].temp.max + "℉";
            var day5WindP = document.getElementById("5-wind");
            day5WindP.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
            var day5HumidityP = document.getElementById("5-humidity");
            day5HumidityP.textContent = "Humidity: " + data.daily[5].humidity + " %";
        })
    })
});