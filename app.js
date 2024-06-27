// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//selecting icon element
const iconElement = document.querySelector(".weather-icon");
const notificationElement = document.querySelector(".notification");
const temperatureElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//App-data
const Weather={};
Weather.temperature={
    unit:"celsius"
}

//App consts and data
const KELVIN=273;

//Api key
const Key="24236592bc498a2f0a13979bfb915c99";

//CHECK IF BROWSER SUPPORTS
window.addEventListener('load',() => {
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPostion,showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support geolocation</p>";
}
});


//set user position
function setPostion(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude);
}

function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`;
}

//get weather from api https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;

    console.log(api)
   
    
 fetch (api)
  .then(function(response){
    let data=response.json();
    return data;
    })
    .then(function(data){
        Weather.temperature.value=Math.floor(data.main.temp-KELVIN);
        Weather.description=data.weather[0].description;
        Weather.city=data.name;
        Weather.country=data.sys.country;
        Weather.iconID=data.weather[0].icon;
    })
       .then(function(){
        displayWeather();
       });
      
}

//DISPLAY WEATHER
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${Weather.iconID}.png"/>`;
    temperatureElement.innerHTML=`${Weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML=Weather.description;
    locationElement.innerHTML=`${Weather.city}, ${Weather.country}`;

}

function logData(data) {
    console.log("Weather data received:", data);
}

