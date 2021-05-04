"use strict"

let result = [7.5957222282886505,51.9692984513806];

async function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        result = []
        result = [longitude, latitude];

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } 
    else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    } 
}


var api

function iniatializeAPI(key, coordinates){
    api = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lat="
    api += coordinates[1]+"&lon="+coordinates[0]+"&exclude="+"hourly"+"&appid="+key
}

var clientAPIKey;

function getAPIKey(){
    clientAPIKey = document.getElementById("apiField").value;
}
var response;
function apiRequest(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //document.getElementById("demo").innerHTML = xhttp.responseText;
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", api, true);
    xhttp.send(); 
}

function main(){
    if(clientAPIKey != undefined){
        iniatializeAPI(clientAPIKey, result)
    } 
    else {
         console.log("clientAPIKey id undefined. Enter APIKey")
         return
    }
    apiRequest();
    setTimeout(() => {
        console.log(response);
    }, 2000);
}
//source: http://www.sternwarte-eberfing.de/Aktuell/Himmelsrichtung.html (degree classifications)
var degreesList = [[22.5,"N"],[67.5,"NE"],[112.5,"E"],[157.5,"SE"],[202.5,"S"],[247.5,"SW"],[292.5,"W"],[337.5,"NW"],[360.0,"N"]];

/**
*@function {toDirection} Function to convert bearing from degree to string
*@param {double} degrees
*@returns {String} returns bearing as a string
*/
function toDirection(degrees){
	for(var i=0; i<degreesList.length; i++){
		if(degrees<degreesList[i][0]) {
            return degreesList[i][1];
        }
	}
}

function submit(){
    getAPIKey();
    main();
    setTimeout(() => {
        document.getElementById("source").innerHTML = "<b>Quelle: </b>" + response.alerts[0].sender_name;
        document.getElementById("timezone").innerHTML = "<b>Zeitzone: </b>" + response.timezone;
        document.getElementById("temp").innerHTML = "<b>Temperatur: </b>" + response.current.temp + " °C";
        document.getElementById("feels_like").innerHTML = "<b>Gefühlte Temperatur: </b>" + response.current.feels_like + " °C";
        document.getElementById("humidity").innerHTML = "<b>Luftfeuchtigkeit: </b>" + response.current.humidity + " %";
        document.getElementById("pressure").innerHTML = "<b>Luftdruck: </b>" + response.current.pressure + " hPa";
        document.getElementById("wind").innerHTML = "<b>Wind: </b> " + toDirection(response.current.wind_deg) + " " + response.current.wind_speed + " km/h";
    }, 2000);
    //document.getElementById("temp").innerHTML = "<b>Temperatur: </b>" + response.current.temp;
}
