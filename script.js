var searchButton = $(".searchButton");
var APIKey = "00d372565b9be433ab31f424c1839876";
var keyCount = 0;

// Forloop for index page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
// Search button
searchButton.click(function () {
    var searchInput = $(".searchInput").val();
    // current weather 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";
    //5 day forecast
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + APIKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            // append list group
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // L.Storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Current Weather append 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            //Date
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            //Temperature 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            //Other attributes
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

