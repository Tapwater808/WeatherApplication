var searchButton = $(".searchButton");
var APIKey = "00d372565b9be433ab31f424c1839876";

queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
City + "&appid=" + APIKey;

// Forloop for index page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
