var citySearchInputEl = document.querySelector("#city-search-input");
var searchFormEl = document.querySelector('#city-search');
var searchHistoryEl = document.querySelector('#search-history');
var searchItemEl = document.querySelector('#search-item');

var formSubmitHandler = function(event, citySearchInput) {
    
    event.preventDefault();

    var citySearchInput = citySearchInputEl.value.trim();

    if (citySearchInput) {
        getWeatherData(citySearchInput);
        createHistory(citySearchInput);
    } else {
        console.log("Bad Search");
    } 
};

var getWeatherData = function (city) {
    var cityLat="1"
    var cityLong="1"
    getGeoCode(city);
    console.log(cityLat, cityLong)
    var weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ cityLat +"&lon="+ cityLong +"&appid=56d6dd58ac6b3583bfd6b3243e86114";

    fetch(weatherAPI)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            console.log("Bad API Pull")
        }
    });
};

// var getForcastData = function (cityLat, cityLong) {
//     var weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ cityLat +"&lon="+ cityLong +"&appid="+ weatherAPIKey;

//     fetch(weatherAPI)
//     .then(function(response) {
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function(data) {
//                 console.log(data);
//             });
//         } else {
//             console.log("Bad API Pull")
//         }
//     });
// };

var createHistory = function (city) {
    $("#search-history").prepend("<button type='button' class='list-group-item' id="+city+">"+city+"</button>");
}

var reSubmit = function(event) {
    console.log(event.target.getAttribute("id"));
    formSubmitHandler(event, JSON.stringify(event.target.getAttribute("id")))
}

var getGeoCode = function(city) {
    var cityLat=""
    var geoAPI = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText="+ city;
    fetch(geoAPI, {
        method: "GET",
        headers: { apiKey: "MTVlMDlmMGUzNTQzNDgzODhlYzY0NWJhNzU0YWU3YjU6OGVhOWJmM2MtM2E0OC00MTNlLWIxNTctY2VlZGFiNzY1MzMx", "Content-Type": "application/json" },
    })
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
            var cityLat=data.locations[0].referencePosition.latitude;
                cityLat=JSON.stringify(cityLat.toFixed(2));
            var cityLong=data.locations[0].referencePosition.longitude;
                cityLong=JSON.stringify(cityLong.toFixed(2));

            console.log(cityLat, cityLong)
            
            return cityLat, cityLong;
            });
        } else {
            console.log("Bad API Pull")
        }
    });
};

searchFormEl.addEventListener("submit", formSubmitHandler);

searchHistoryEl.addEventListener("click", reSubmit);