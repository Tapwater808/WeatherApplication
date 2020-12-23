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

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });
                // 5Day Ajax 
                $.ajax({
                    url: urlFiveDay,
                    method: "GET"
                }).then(function (response) {
                    // Array for 5-days 
                    var day = [0, 8, 16, 24, 32];
                    var fiveDayCard = $(".fiveDayCard").addClass("card-body");
                    var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
                    fiveDayDiv.empty();
                    // For each loop
                    day.forEach(function (i) {
                    var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                    FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                    fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 
                    + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` 
                    + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " 
                    + response.list[i].main.humidity + "%" + "</p>" + "</div>");
                    })
        
                });
            }
        });