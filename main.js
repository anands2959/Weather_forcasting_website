


const app = document.querySelector('.weather_app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.querySelector('.locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')




//Default city when the page load
let cityInput = "Lucknow";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

//add submit event to the form
form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('please type a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";

    }
    e.preventDefault();
});
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(year, month, day).getDay()];
};


//ApiKey
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=[HERE ADD YOUR API KEY]&q=${cityInput}&aqi=no`)

        .then(response => response.json())
        .then(data => {
            console.log({ data });
            temp.innerHTML = data.current.temp_c + "&#176;c";
            conditionOutput.innerHTML = data.current.condition.text;
            date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);


            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./icons/" + iconId;
            
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";
            
            
            
            //change background as the weather condition 
            let timeOfDay;     
            const isday = data.current.is_day;
            if(isday == 1){
                timeOfDay= "day";
            }
            else {
                timeOfDay = "night";
            }


            const codeId = data.current.condition.code;
            if (codeId == 1000) {
                app.style.backgraoundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.backgraound = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.backgraound = "#181e27";

                }

            }
            else if (
                codeId == 1003 ||
                codeId == 1006 ||
                codeId == 1009 ||
                codeId == 1030 ||
                codeId == 1069 ||
                codeId == 1087 ||
                codeId == 1135 ||
                codeId == 1273 ||
                codeId == 1276 ||
                codeId == 1279 ||
                codeId == 1282
            ) {
                app.style.backgraoundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.backgraound = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.backgraound = "#181e27";
                }
            } else if (
                codeId == 1063 ||
                codeId == 1069 ||
                codeId == 1072 ||
                codeId == 1150 ||
                codeId == 1153 ||
                codeId == 1180 ||
                codeId == 1183 ||
                codeId == 1186 ||
                codeId == 1189 ||
                codeId == 1192 ||
                codeId == 1195 ||
                codeId == 1204 ||
                codeId == 1207 ||
                codeId == 1240 ||
                codeId == 1243 ||
                codeId == 1246 ||
                codeId == 1249 ||
                codeId == 1252
            ) {
                app.style.backgraoundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.backgraound = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.backgraound = "#325c80";
                }
            } else {
                app.style.backgraoundImage = `
                url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.backgraound = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.backgraound = "#1b1b1b";
                }
            }
            app.style.opacity = "1";

        })
        .catch(() => {
            alert('City not Found, Pls. try again');
            app.style.opacity = "1";

        });
}
fetchWeatherData();
app.style.opacity = "1";
