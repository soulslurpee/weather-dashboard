var formHandler = function(citySearchInput) {
    var weatherstackAPI = "http://api.weatherstack.com/current?access_key=e5b5ce23f2d8c81d597e9188fe288956&query="+ citySearchInput +"&units=f";

    fetch(weatherstackAPI)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                })
            } else {
                console.log("That is not right")
            };
        })
}




    