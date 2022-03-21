var citySearchInputEl = document.querySelector("#city-search-input");
var searchFormEl = document.querySelector('#city-search');
var searchHistoryEl = document.querySelector('#search-history');
var searchItemEl = document.querySelector('#search-item');
var weatherAPIKey = "56d6dd58ac6b3583bfd6b3243e861145";
var displayCityEl = document.querySelector('#wCity');

var formSubmitHandler = function(event, citySearchInput) {
    
    event.preventDefault();

    var citySearchInput = citySearchInputEl.value.trim();

    if (citySearchInput) {
        getGeoCode(citySearchInput);
        createHistory(citySearchInput);
    } else {
        console.log("Bad Search");
    } 
};

var createHistory = function (city) {
    $("#search-history").prepend("<button type='button' class='list-group-item' id="+city+">"+city+"</button>");
}

var reSubmit = function(event) {
    console.log(event.target.getAttribute("id"));
    formSubmitHandler(event, JSON.stringify(event.target.getAttribute("id")))
}

var getWeather = function(latC, longC) {
    var latC = JSON.parse(localStorage.getItem("cityLat"));
    var longC = JSON.parse(localStorage.getItem("cityLong"));
    var weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latC +"&lon="+ longC +"&units=imperial&appid="+ weatherAPIKey;
    fetch (weatherAPI)
        .then(function(response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function(data) {
                    console.log(data);
                    $("#wTemp").text("Temp: "+ data.current.temp +"F");
                    $("#wWind").text("Wind: "+ data.current.wind_speed +" MPH" );
                    $("#wHumidity").text("Humidity: "+ data.current.humidity);
                    $("#wUV").text("UV Index: "+ data.current.uvi);
                    for (i=0; i>5; i++) {
                        var forcastCardEl = document.createElement("div").appendTo("#forcast-display");
                        forcastCardEl.classList = "col card bg-secondary text-white";
                        forcastCardEl.setAttribute("id", "#card"+i)
                        $("#forcast-display").append(forcastCardEl)

                        var forcastDateEl = document.createElement("span")
                        forcastDateEl.text("DD/MM/YYYY")

                        var forcastIconEl = document.createElement("i");
                        forcastIconEl.classList = "bi bi-cloud-lightning-rain";

                        var forcastTempEl = document.createElement("p");
                        forcastTempEl.innerText("Temp: "+ data.daily[i].temp.day +"F");

                        var forcastWindEl = document.createElement("p")
                        forcastWindEl.innerText("Wind: "+ data.daily[i].wind +"MPH");

                        var forcastHumidityEl = document.createElement("p");
                        forcastHumidityEl.innerText("Humidity: "+ data.daily[i].humidity);

                        var forcastUVIEl = document.createElement("p");
                        forcastUVIEl.innerText("UV Index: "+ data.daily[i].uvi);

                        $("#card"+i).append(forcastDateEl, forcastIconEl, forcastTempEl, forcastWindEl, forcastHumidityEl, forcastUVIEl);

                        
                        
                    }
                });
            };
        });
};



var getGeoCode = function(city) {
    $("#wCity").text(city);
    var geoAPI = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText="+ city;
    fetch(geoAPI, {
        method: "GET",
        headers: { apiKey: "MTVlMDlmMGUzNTQzNDgzODhlYzY0NWJhNzU0YWU3YjU6OGVhOWJmM2MtM2E0OC00MTNlLWIxNTctY2VlZGFiNzY1MzMx", "Content-Type": "application/json" },
    })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            var cityLat=data.locations[0].referencePosition.latitude;
                cityLat=JSON.stringify(cityLat.toFixed(2));
                localStorage.setItem("cityLat", cityLat);
            var cityLong=data.locations[0].referencePosition.longitude;
                cityLong=JSON.stringify(cityLong.toFixed(2));
                localStorage.setItem("cityLong", cityLong);
            });

        };
    }).then(getWeather());
    
};
searchFormEl.addEventListener("submit", formSubmitHandler);

searchHistoryEl.addEventListener("click", reSubmit);