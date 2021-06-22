let openweather;
//Functions
/**
* @function 
* @param {Array} pointA
* @param {Array} pointB
* @param {Array} pointC
* @param {Array} pointD 
* @return {Array} intersect - returns the longitude and latitude of the intersection !which means we have to check if the lines do even intersect - otherwise the result is nonsense!
*/
function lineIntersection(pointA, pointB, pointC, pointD) { 
    //longitudes and latitudes of the given points with pointA and pointB defining lineA and pointC and pointD defining lineB
    var latA = pointA[1];
    var lonA = pointA[0];
    var latB = pointB[1];
    var lonB = pointB[0];
    var latC = pointC[1];
    var lonC = pointC[0];   
    var latD = pointD[1];
    var lonD = pointD[0];

    var d = (lonA - lonB) * (latC - latD) - (latA - latB) * (lonC - lonD); 

    var intersectLon = ((lonA * latB - latA * lonB) * (lonC - lonD) - (lonA - lonB) * (lonC * latD - latC * lonD)) / d;
    var intersectLat = ((lonA * latB - latA * lonB) * (latC - latD) - (latA - latB) * (lonC * latD - latC * lonD)) / d;

    return [intersectLon, intersectLat] //return the intersect
};

/**
* @function 
* @param {Array} pointA
* @param {Array} pointB
* @param {Array} pointC
* @return {integer} - returns 1, 0, -1
*/
function getDirection(pointA, pointB, pointC) {
    if (((pointC[1] - pointA[1]) * (pointB[0] - pointA[0])) > ((pointB[1] - pointA[1]) * (pointC[0] - pointA[0]))) { 
      return 1; //returns 1 if pointC lies to the left of the segemt defined by points A and B
    }
    else if (((pointC[1] - pointA[1]) * (pointB[0] - pointA[0])) == ((pointB[1] - pointA[1]) * (pointC[0] - pointA[0]))) {
      return 0; //returns 0 if pointC lies on  the segemt defined by points A and B
    }
    else {
        return -1; //returns -1 if pointC lies to the right of the segemt defined by points A and B
    }
}

/**
* @function 
* @param {Array} pointA
* @param {Array} pointB
* @param {Array} pointC
* @return {boolean} - returns true or false
*/
function containsSegment(pointA, pointB, pointC) {
    if (pointA[0] < pointB[0] && pointA[0] < pointC[0] && pointC[0] < pointB[0]) { //checking x values -> xA < xB && xA < xC && xC < xB
        return true; //point C lies between point A B with the following order A -> C -> B
    }
    else if (pointB[0] < pointA[0] && pointB[0] < pointC[0] && pointC[0] < pointA[0]) { //checking x values -> xB < xA && xB < xC && xC < xA
        return true; //point C lies between point A B with the following order B -> C -> A
    }
    else if (pointA[1] < pointB[1] && pointA[1] < pointC[1] && pointC[1] < pointB[1]) { //checking y values -> xA < xB && xA < xC && xC < xB
        return true; //point C lies between point A B with the following order A -> C -> B
    }
    else if (pointB[1] < pointA[1] && pointB[1] < pointC[1] && pointC[1] < pointA[1]) { //checking y values -> xB < xA && xB < xC && xC < xA
        return true; //point C lies between point A B with the following order B -> C -> A
    }
    else if (pointA[0] == pointC[0] && pointA[1] == pointC[1] || pointB[0] == pointC[0] && pointB[1] == pointC[1]) { //check if point C is equal to ether point A or B
        return true; //point C has the smae position as point A or B
    }
    return false; //in all other cases -> point C does not lie between point A and B
  }

/**
* @function 
* @param {Array} pointA
* @param {Array} pointB
* @param {Array} pointC
* @param {Array} pointD 
* @return {boolean} - returns true if the segments intersect
*/
function hasIntersection(pointA, pointB, pointC, pointD) {
    //check direction of
    var d1 = getDirection(pointA, pointB, pointD); //pointD to "segment" defined by pointA and pointB
    var d2 = getDirection(pointA, pointB, pointC); //pointC to "segment" defined by pointA and pointB
    var d3 = getDirection(pointA, pointC, pointD); //pointD to "segment" defined by pointA and pointC
    var d4 = getDirection(pointB, pointC, pointD); //pointD to "segment" defined by pointB and pointC
    
    //if the rotations are the opposite of each other thy intersect
    var intersect = d1 != d2 && d3 != d4;
    
    //if the points are all on the same line we have to check for overlap or if one segments (partly) contains the other
    if (d1 == 0 && d2 == 0 && d3 == 0 && d4 == 0) {
      intersect = containsSegment(pointA, pointB, pointC) || containsSegment(pointA, pointB, pointD) ||
      containsSegment(pointC, pointD, pointA) || containsSegment(pointC, pointD, pointB);
    }
    return intersect; //return true or false
};

/**
* @function 
* @param {Array} array - the input needs to be an array which represents a line or an polygon
* @return {} - returns the input as an GeoJson
*/
function arrayToGeoJson(array) {
    var geoJson; //variable for storing the result
    //if last first and last entry of the array are equal it is assumed the input is an polygon (later version may include an option that must be set beforehand)
    if(array[0][0] == array[array.length-1][0] && array[0][1] == array[array.length-1][1]) {
        //create an String formatted as an GeoJson polygon by concatenation
        var polygonString = '{' + '"type": "Polygon",' + '"coordinates": [[' + arrayToString(array) + ']]}';
        //parsing the String
        geoJson = JSON.parse(polygonString);
    }
    //other inpits are interpreted as lines
    else {
        //create an String formatted as an GeoJson polygon by concatenation
        var lineString = '{' + '"type": "LineString",' + '"coordinates": [' + arrayToString(array) + ']}';
        //parsing the String
        geoJson = JSON.parse(lineString);     
    }
    //Output
    return geoJson;
}

/**
* @function 
* @param {Array} array
* @return {String} - outputs the array as an correctly formatted String
*/
function arrayToString(array) {
    var string = '[' + array[0] + '],';
    for (var i = 1; i < array.length-1; i++) {
        string = string + '[' + array[i] + '],'
    }
    string = string + '[' + array[array.length-1] + ']'
    return string;
}

/**
* @function 
* @param {Array} array 
* @return {String} - outputs a JSON Rectangle 
*/
function arrayToPolygon(array) {
    array = array.push(array[0]);
    return array;
}

/**
 * @function
 * @param {Array} route - array which contains the coordinates of the route
 * @param {Array} polygon - array which contains the coordinates of the polygon
 * @return
 */
function getAllIntersections(route, polygon) {
    var intersections = [];
    for(i = 0; i < route.length-1; i++) {
        for(j = 0; j < polygon.length-1; j++) {
            if(hasIntersection(route[i], route[i+1], polygon[j], polygon[j+1])) {
                intersections.push(lineIntersection(route[i], route[i+1], polygon[j], polygon[j+1]));
            }
        }
    }
    return intersections;
}

/**
 * @function
 * @param {array} polygon - input needs to be an array with the coordinates of the polygon
 * @return {array} - outputs the same polygon but with swapped coordinates
 */
 function convertToLonLat(polygon) { //swap coordinates
    var swappedPolygon = []; //initialize output
    for(var i = 0; i < polygon.length; i++) { //iterate over the polygon
        var lon = polygon[i][1];
        var lat = polygon[i][0];
        swappedPolygon.push([lon, lat]); //push swapped coordinate
    }
    return swappedPolygon; //return the swapped coordinates
}

/**
 * @function
 * @param {array} point - input needs to be an array which contains a coordinate which represents a position
 * @return {geoJSON} returns the point formatted as a geoJSON
 */
function arrayToPoint(point) { // arrray of coordinates to geojson point
    //create a geoJSON as a String by concatinating 
    var pointGeoJson = '{' + '"type": "Feature",' + '"properties": {},' + '"geometry": {' + '"type": "Point", "coordinates": [' + point[0] + ',' + point[1] + ']}}';
    return JSON.parse(pointGeoJson); //return the parsed String -> a geoJSON
}

/**
 * @function
 * @param {array} position - the position for the request as an array
 * @param {apiKey} openWeather_key - the openWeather API-key
 * @param {L.Marker} marker - the marker which represents the requested position on the map
 * @return
 */
function weatherRequest(position, openweather, marker) { 
    var request = buildRequest(position, openweather); //build the request for the position
    {$.ajax({ //handle request via ajax
        url: request, //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(response) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            marker.bindPopup( 
                            '<p  style="font-size: 18px;">Wetter an dieser Position</p>' +
                            '<p>Ort: ' +  response.lat + ', ' + response.lon + '<br>' + //position
                            'Zeitzone: ' + response.timezone + '<br>' + //timezone
                            'Temperatur: ' + response.current.temp + '°C<br>' + //temperature
                            'Luftfeuchte: ' + response.current.humidity + '%<br>' + //humidity
                            'Luftdruck: ' + response.current.pressure + 'hPa<br>' + //pressure
                            'Wolkenbedeckung: ' + response.current.clouds + '%<br>' + //cloud cover
                            'Wetter: ' + response.current.weather[0].description + '</p>' //openWeather short classification
            );
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
            marker.bindPopup( //and bind a "error" popup to the given marker
                '<p  style="font-size: 18px;">Wetter an dieser Position</p>' +
                '<p>Wetterdaten konnten nicht abgerufen werden.</p>' + 
                '<p>Bitte wenden sie sich an den Administrator</p>'
            );
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })}
}

/**
 * @function
 * @param {array} position - the position for the request as an array
 * @param {apiKey} openWeather_key - the openWeather API-key
 * @return {String} - returns a valid openWeather request for the given position
 */
function buildRequest(position, key){
    //create the request by concatenating a String / here we request meatric measurements
    var api = "https://api.openweathermap.org/data/2.5/onecall?units=metric&lat="+position[1]+"&lon="+position[0]+"&exclude="+"hourly"+"&appid="+key;
    return api;
}

/**
 * @function
 * @return
 */
 function resetMap(){ //function for the reset button
    markerLayer.clearLayers(); //clear all markers
    rectangleLayer.clearLayers(); //clear all rectangles
    intersections = []; //clear the intersections
}

/**
 * @function
 * @return
 */
 function goToIfGi(){ 
    window.open("https://www.uni-muenster.de/Geoinformatics/"); //route user to the IfGi webpage
}

/**
 * @function
 * @return
 */
function getAPIKey() {
    var value = document.getElementById("api_key_input").value; //read content from field
    openweather = value; //store the value inside variable
    checkAPIKey(openweather);
}

/**
 * @function
 * @return
 */
function checkAPIKey(openweather) {
    var url = buildRequest([7.595715522766113, 51.969495094294324], openweather); //teste request at IfGi
    //console.log(url);
    function httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null ); 
        var response = JSON.parse(xmlHttp.responseText);
        if(response.cod != 401) { //if no error code ist returned
            document.getElementById("input_button").className = "btn btn-success"; //chnge button color by class to green
        }
        else {
            document.getElementById("input_button").className = "btn btn-danger";
        }
    }
    httpGet(url);
}
 
function getDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(response) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            for(i = 0; i < response.length; i++) {
                var layer = L.geoJSON(response[i].geojson.features[0]);
                routesLayerGroup.addLayer(layer);
                layer.bindPopup("Nummer: " + response[i].nummer);
                route = response[i].geojson;
            } 
            //Fit Bounds to the Route
            map.fitBounds(routesLayerGroup.getBounds());
            fillTable(response);
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}

function resetSelect() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(response) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            for(i = 0; i < response.length; i++) {
                var layer = L.geoJSON(response[i].geojson.features[0]);
                routesLayerGroup.addLayer(layer);
                layer.bindPopup("Nummer: " + response[i].nummer);
                route = response[i].geojson;
            } 
            //Fit Bounds to the Route
            map.fitBounds(routesLayerGroup.getBounds());
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}

function getSelectedRoute(selector) { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(response) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            for(i = 0; i < response.length; i++) {
                    if(response[i].nummer == selector) {
                        var layer = L.geoJSON(response[i].geojson.features[0]);
                        routesLayerGroup.addLayer(layer);
                        layer.bindPopup("Nummer: " + response[i].nummer);
                        route = response[i].geojson;
                }
            } 
            //Fit Bounds to the Route
            map.fitBounds(routesLayerGroup.getBounds());
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}
//----------------->Map<-----------------
//Selector
var selector = false;
//Map Object
var map = L.map('mapdiv'); 
//Set view to Muenster
map.setView([51.975, 7.61], 13);
    //Basemap Layer
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); 

//Routes Layer Group
var routesLayerGroup = L.featureGroup().addTo(map);

//Feature Group Layers for the Input Features
var rectangleLayer = L.featureGroup().addTo(map);
var markerLayer = L.featureGroup().addTo(map);

getDatafromDB();

//Draw Control
var drawControl = new L.Control.Draw({
    draw: {
        //disable all draw functions but the rectangle
        polyline: false, 
        polygon: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: {
            showArea: true,
            metric: ['km', 'm']
        }
    },
    edit: {
        //drawn features will be stored in the polylineLayer
        featureGroup: rectangleLayer,
        remove: false,
        edit: false
    }
}); 
map.addControl(drawControl); //add the control to the map

//initialize variables for the algorithm
var inputRectangle; //varibale for storing the extracted leaflet draw object
var inputRectangleArray = []; //array for storing the coordinates of the drawn rectangle
var inputRectangleGeoJSON; //variable for storing the drawn rectangle converted to a geojson
var intersections = []; //array for storing the intersections of the route with the drawn rectangle
var route;
map.on('draw:created', function(e) {
    if(selector){
        rectangleLayer.addLayer(e.layer); 

        var inputRectangle = e.layer._latlngs[0]; //extract the rectangle coordinates 
        
                    
        //push the rectangle verticies into an array
        for(i = 0; i < inputRectangle.length; i++) {
            inputRectangleArray.push([inputRectangle[i].lat, inputRectangle[i].lng]);
        };
                    
        inputRectangleArray.push(inputRectangleArray[0]); //push the last vertex to the array to conform to the geoJSON encoding
        inputRectangleArray = convertToLonLat(inputRectangleArray); //swap coordinates
        inputRectangleGeoJSON = arrayToGeoJson(inputRectangleArray); //convert array to a geoJSON

        //calculate intersections
        intersections = getAllIntersections(route.features[0].geometry.coordinates, inputRectangleGeoJSON.coordinates[0]);

        //empty used array to enbale a clean second input
        inputRectangleArray = [];
        inputRectangleArray = [];
        inputRectangleGeoJSON = [];

        for(i = 0; i < intersections.length; i++) { //for every intersection
            var marker = new L.Marker([intersections[i][1], intersections[i][0]]); //create a marker variable
            marker.addTo(map); //place the marker to the map
            markerLayer.addLayer(marker); //add the marker to the corresponding layer
            weatherRequest([intersections[i][0], intersections[i][1]], openweather, marker); //perform a weather request for the marker
        };
    }
    else {
        //console.log("Selection empty");
        alert("Bitte eine Route auswählen!"); //Alert User if no specific Route is selected
    }
});

/**
 * @function
 * @return
 */
function fillTable(routes) {
    var table = document.getElementById("availableRoutes");
    var tableData = []; //initialise tabledata as array
    for(var i = 0; i < routes.length; i++) { //iterate over the paths
        tableData.push(routes[i].nummer); //push aggregated paths into table data array
    }
    
    //fill the table with the paths
    for(var i = 0; i < tableData.length; i++) { //iterate over table data
        //initialise table row as variable
        var row =  `<tr> 
            <td>${tableData[i][0]}</td>
            <td><input class="btn btn-secondary" type=submit value="Auswahl" onClick="selectRoute(${tableData[i][0]})"></td>
        </tr>`
        table.innerHTML += row; //pass row to given table
    }
}

/**
 * @function
 * @return
 */
function selectRoute(nummer) {
    routesLayerGroup.clearLayers(); //clar Routes
    routesLayerGroup = L.featureGroup().addTo(map); ///create new RoutesLayer
    rectangleLayer.clearLayers(); //clear Rectangles
    rectangleLayer = L.featureGroup().addTo(map); //create new RectangleLayer 
    //console.log(nummer);
    getSelectedRoute(nummer); //selctor for a specific route
    selector = true; //switch selector
}

/**
 * @function
 * @return
 */
function clearMap() {
    rectangleLayer.clearLayers(); //clear Rectangles
    markerLayer.clearLayers(); ///clear Marker
    rectangleLayer = L.featureGroup().addTo(map); //create new RectangleLayer
    markerLayer = L.featureGroup().addTo(map); //create new MarkerLayer
    resetSelect(); //reset the Selector
    selector = false; //switch selector 
}

