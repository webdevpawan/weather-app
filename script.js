const apiKey = "5b49aeb08cdcb9d5b151ceaefb7372fa";

navigator.geolocation.getCurrentPosition((position) => {
    showWeather(position.coords.latitude, position.coords.longitude);
});

function handlePermissions() {
    navigator.permissions.query({ name: 'geolocation' })
    .then((result) => {
        if (result.state != "granted") {
            alert("Sorry, location is needed.")
            $(".outer").css({ "display": "none" });
        }
    })
}
setTimeout(handlePermissions, 5000)

$("#search").click(function () {

    let location = $("#location").val();

    $.ajax({
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`,
        method: "GET",
        success: function (data) {
            if (data.length == 0) {
                alert("Not Found")
            }
            else {
                $(".outer").css({ "display": "" });
                showWeather(data[0].lat, data[0].lon);
            }
        },
        error: function (err) {
            console.log(err)
        }

    })
})

function showWeather(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        method: "GET",
        success: function (data) {
            // console.log(data);
            $("#city").html(`${data.name}, ${data.sys.country}`);

            let date = new Date();
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            $("#date").html(`${weekday[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`);
            $("#temp").html(`${data.main.temp.toFixed(1)}° C`);
            $("#weather").html(data.weather[0].main)
            $("#weather-desc").html(data.weather[0].description)

            if (data.weather[0].main == "Rain") {
                $("body").css({ "background-image": "url('./images/rain.jpg')" })
            }
            else if (data.weather[0].main == "Clear") {
                $("body").css({ "background-image": "url('./images/clear.jpg')" })
            }
            else if (data.weather[0].main == "Cloudy" || data.weather[0].main == "Clouds") {
                $("body").css({ "background-image": "url('./images/cloudy.jpg')" })
            }
            else if (data.weather[0].main == "Snow") {
                $("body").css({ "background-image": "url('./images/cloudy.jpg')" })
            }
            else {
                $("body").css({ "background-image": "url('./images/bg.jpeg')" })
            }

            $(".outer").css({ "display": "none" });

        },
        error: function (err) {
            console.log(err)
        }

    })
}
