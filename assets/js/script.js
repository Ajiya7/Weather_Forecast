var searchbtn = $("#submit");
var CityNameAndDate = $("#city-date");
var Icon = $("#icon");
var Temprature = $("#temp");
var Humidity = $("#humidity");
var wind = $("#wind-speed");
var seconadryContainer = $("#content2-container");
var apikey = "f4299bef35c7fb3410eeb230e66758d1";

searchbtn.on("click", function (event) {
    event.preventDefault();
    var city = $("#input").val().trim();
    Api(city)
  });

var today = moment();
var todaysDate = today.format("ddd Do MMM YYYY");

function Api(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apikey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var weatherIcon = Icon.attr("src", iconURL);
        CityNameAndDate.text( response.name + ", " + todaysDate);
        Temprature.text( "Temperature: " + response.main.temp + " F");
        Humidity.text( "Humidity: " + response.main.humidity + "%");
        wind.text( "Wind Speed: " + response.wind.speed + " MPH");

        var lon = response.coord.lon;
        var lat = response.coord.lat;

        Forecasthandler (lon, lat);
    })
}

function Forecasthandler (lon, lat){
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + apikey;
    $.ajax({   
        url: queryURL,
        method: "GET"
    })
    .then(function(response2){
        seconadryContainer.empty();
        for (var i = 1; i < 6; i++){
            var fiveDayContainer = $('<div class="fiveDayWeather">');
            var fiveCityDate = $('<p class="five-city-date">');
            var fiveCityIcon = $('<img class="icon2 " src=""></img>');
            var fiveCityTemp = $('<p class="five-city-temp">');
            var fiveCityHumidity = $('<p class="five-city-humidity">');
            var fivecityWind = $('<p class="five-city-wind">');

            seconadryContainer.append(fiveDayContainer);
            fiveDayContainer.append(fiveCityDate, fiveCityIcon, fiveCityTemp, fiveCityHumidity, fivecityWind);

            var newDate = moment().add(i, 'days');
            var nextDate = newDate.format("ddd, MMM DD");

            fiveCityDate.text(nextDate);
            fiveCityTemp.text("Temp: " + response2.daily[i].temp.day + " F");
            fiveCityHumidity.text("Humidity: " + response2.daily[i].humidity + "%")
            fivecityWind.text("Wind Speed: "+ response2.daily[i].wind_speed + " MPH" )
            var iconCode2 = response2.daily[i].weather[0].icon;
            var iconURL2 = "http://openweathermap.org/img/wn/" + iconCode2 + "@2x.png";
            fiveCityIcon.attr("src", iconURL2);
        }
    })
}