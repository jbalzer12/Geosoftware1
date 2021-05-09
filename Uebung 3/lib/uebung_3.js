"use strict"

//Standard position for weather request (Geo 1)
let result = [7.5957222282886505,51.9692984513806];
/**
 * @function {geoFindMe} - This function geolocates the browser-location.
 * source: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
async function geoFindMe() {
    // To variables get intitialized to be used in a simpler way
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    // At first the reference for the link has to be empty. The link will show to actual 
    // position on OpenStreetMap 
    mapLink.href = '';
    mapLink.textContent = '';
    
    /**
     * @function {success} - This function gets executed if the request successes.
     * It will build up an array "result" which contains the information about latitude and
     * longitude. Afterwards it builds the link which is behind the printed coordinates.
     * The link refers to OpenStreetMap to show the position on the map.
     * @param {*} position - The answer we get from the browser
     */
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // This array will contain the needed information to work with them afterwards
        result = [longitude, latitude];

        status.textContent = 'Die Position ist:';
        // The link gets built
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Breitengrad: ${latitude} °, Längengrad: ${longitude} °`;
    }

    /**
     * @function {error} - This function gets called incase the request throws an error 
     * and the geolocatization is not possible.
     */
    function error() {
        status.textContent = 'Position kann nicht ermittelt werden!';
    }
    // Incase the user rejects the geolocalization or the browser rejects it itself, an error-message
    // gets printed on the html-webite.
    if(!navigator.geolocation) {
        status.textContent = 'Die Geolokalisiation wird vom Browser nicht unterstützt';
    } 
    else {
        // Incase everything succeeded the status "Loading.../Laden..." gets printed.
        status.textContent = 'Laden...';
        navigator.geolocation.getCurrentPosition(success, error);
    } 
}
// The API gets stored in this variable.
var api;

/**
 * @function {initializeAPI} - This funtion builds up the whole api to use it afterwards.
 * @param {String} key - This key is user-dependent and has to be entered by the user himself.
 * @param {[double, double]} coordinates - These are the requested coordinates. Either the
 * browser location or the standard coordinates (GEO1).
 */
function iniatializeAPI(key, coordinates){
    api = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lat="
    api += coordinates[1]+"&lon="+coordinates[0]+"&exclude="+"hourly"+"&appid="+key
}

//variable to store the API-Key
var clientAPIKey;

/**
* @function {} - reads the API-Key from Input-Field
* and the geolocatization is not possible.
*/
function getAPIKey(){
    clientAPIKey = document.getElementById("apiField").value; //retrieve API-Key
}

//variable to store the response
var response;

/**
*@function {loadOpenWeather} fetches results and prints them to the canvas
*@param {api} complete api request
*@returns {} 
*/
async function loadOpenWeather(api) {
    let res = await fetch(api); //fetch results
    response = await res.json(); //get result as json
    //fill the html with information from the response
    document.getElementById("timezone").innerHTML = "<b>Zeitzone: </b>" + response.timezone;
    document.getElementById("temp").innerHTML = "<b>Temperatur: </b>" + response.current.temp + " °C";
    document.getElementById("feels_like").innerHTML = "<b>Gefühlte Temperatur: </b>" + response.current.feels_like + " °C";
    document.getElementById("humidity").innerHTML = "<b>Luftfeuchtigkeit: </b>" + response.current.humidity + " %";
    document.getElementById("pressure").innerHTML = "<b>Luftdruck: </b>" + response.current.pressure + " hPa";
    document.getElementById("wind").innerHTML = "<b>Wind: </b> " + toDirection(response.current.wind_deg) + " " + response.current.wind_speed + " km/h";
}

/**
*@function {main} main function to handle Request generation and Response handling
*@param {}
*@returns {} 
*/
function main(){
    if(clientAPIKey != undefined){ //if an API-Key is given
        iniatializeAPI(clientAPIKey, result); //generate Request
    } 
    else {
         console.log("clientAPIKey id undefined. Enter APIKey"); //log error message to console
         return;
    }
    loadOpenWeather(api); //fetch results from OpenWeater and print them o canvas
    //console.log(result);
}

//set of degrees with corresponding cardinal direction
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

/**
*@function {submit} Function to genrate the output, checks if the API-Key is set
*@returns {} prints results to canvas
*/
function submit(){
    getAPIKey(); //get the API-Key
    if(clientAPIKey==""){ //if no API-Key is set
        document.getElementById("timezone").innerHTML = "Der API-Key fehlt"; //print error message to canvas
        document.getElementById("temp").innerHTML = "";
        document.getElementById("feels_like").innerHTML = "";
        document.getElementById("humidity").innerHTML = "";
        document.getElementById("pressure").innerHTML = "";
        document.getElementById("wind").innerHTML = "";
        return; //break
    }
    main(); //else send request
}

