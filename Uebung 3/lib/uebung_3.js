"use strict"

let result

function geoFindMe() {
    //let lon;
    //let lat;

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        //lon = longitude
        //lat = latitude
    
        result = [longitude, latitude]

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
    //return result;
}
  
document.querySelector('#find-me').addEventListener('click', geoFindMe);



var api = "https://api.openweathermap.org/data/2.5/onecall?lat="//+result[1]+'"&lon="'+result[0]+'"&exclude="+"hourly"+"&appid="'+apikey
//api+=result[1]+"&lon="+result[0]+"&exclude="+"hourly"+"&appid="+clientAPIKey

function iniatializeAPI(key, coordinates){
    api += coordinates[1]+"&lon="+coordinates[0]+"&exclude="+"hourly"+"&appid="+key
}


function apiRequest(){
    var response;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("demo").innerHTML = xhttp.responseText;
            response = xhttp.responseText;
        }
    };
    xhttp.open("GET", api, true);
    xhttp.send(); 
    return response;
}

function main(){
    geoFindMe()
    if(clientAPIKey != undefined){
        iniatializeAPI(clientAPIKey, result)
    } 
    else {
         console.log("clientAPIKey id undefined. Enter APIKey")
         break;
    }
    //response = apiRequest();
    var x = apiRequest();
}

var clientAPIKey;
function getAPIKey(field){
    clientAPIKey = document.getElementById(field).value;
}