var searchbtn = $("#submit");
var CityNameAndDate = $("#city-date");
var Icon = $("#icon");
var Temprature = $("#temp");
var Humidity = $("#humidity");
var wind = $("#wind-speed");
var seconadryContainer = $("#content2-container");
var apikey = "735d63d6d5691921b415ae3835edf890";

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
    })
}

