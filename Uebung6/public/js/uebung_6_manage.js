//----------------->Map<-----------------
//Map Object
var map = L.map('mapdiv'); 
//Set view to Muenster
map.setView([51.163, 10.447], 6);
//Basemap Layer
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); 

//Routes Layer Group
var routesLayerGroup = L.featureGroup().addTo(map);

//Feature Group Layers for the Input Features
var polylineLayer = L.featureGroup().addTo(map);

//Draw Control
var drawControl = new L.Control.Draw({
    draw: {
        //disable all draw functions but the polyline
        polyline: true, 
        polygon: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: false
    },
    edit: {
        //drawn features will be stored in the polylineLayer
        featureGroup: polylineLayer,
        remove: false,
        edit: false
    }
}); 
map.addControl(drawControl); //add the control to the map

var newRoute = {}; //create new Object
var coordArray = []; 
map.on('draw:created', function(e) {
    routesLayerGroup.addLayer(e.layer); 
    //create array with the coordinates for the geometry object
    for(i = 0; i < e.layer._latlngs.length; i++) {
         var lat = e.layer._latlngs[i].lat;
        var lon = e.layer._latlngs[i].lng;
        coordArray.push([lon, lat]);
    }

    //build geoJSON
    var array = {};
    array.type = "Feature";
    array.properties = {};
    coordinates = coordArray;
    type = "LineString"
    array.geometry = {type, coordinates}
        
    newRoute.type = "FeatureCollection";
    newRoute.features = [array];
    var geoString = JSON.stringify(newRoute);
    document.getElementById("geojson").value = geoString;
});
var response;
function getDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(res) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            response = res;
            for(i = 0; i < res.length; i++) {
                var  layer = L.geoJSON(res[i].geojson.features[0]);
                routesLayerGroup.addLayer(layer);
                layer.bindPopup("Nummer: " + res[i].nummer);
                route = res[i].geojson;
            }
            //fillTable(res);
            //Fit Bounds to the Route
            map.fitBounds(routesLayerGroup.getBounds());

            // The following lines of code build up the dropdown menu from the actual state of the database
            const togglerDelete = document.getElementById("inputGroupSelectDelete");
            for(i = 0; i < res.length; i++) {
                const elem = document.createElement("option");
                elem.href = "#";
                const elemText = document.createTextNode(res[i].nummer);
                elem.setAttribute("value", res[i].nummer) 
                elem.appendChild(elemText);
                togglerDelete.appendChild(elem);
            }
            // The following lines of code build up the dropdown menu from the actual state of the database
            const togglerUpdate = document.getElementById("inputGroupSelectUpdate");
            for(i = 0; i < res.length; i++) {
                const elem = document.createElement("option");
                elem.href = "#";
                const elemText = document.createTextNode(res[i].nummer);
                elem.setAttribute("value", res[i].nummer) 
                elem.appendChild(elemText);
                togglerUpdate.appendChild(elem);
            }   
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed :(", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}   

//getDataForDropdown(response);

function fillTable(routes) {
    var table = document.getElementById("tableBody");
    var tableData = []; //initialise tabledata as array
    for(var i = 0; i < routes.length; i++) { //iterate over the paths
        tableData.push(routes[i].nummer); //push aggregated paths into table data array
    }

    //fill the table with the paths
    for(var i = 0; i < tableData.length; i++) { //iterate over table data
        //initialise table row as variable
        var row =  `<tr> 
            <td>${tableData[i][0]}</td>
        </tr>`
        table.innerHTML += row; //pass row to given table
    }
}
/**
 * @function dropdownAnswerDelete
 * This function gets the value of the selected option of the dropdown menu and enters it into the form to delete it easily
 */
function dropdownAnswerDelete(){
    //selectedElem = document.querySelector('#inputGroupSelect').getAttribute('value');
    var selectedIndex = document.querySelector('#inputGroupSelectDelete').selectedIndex;
    var selectedElem = document.querySelector('#inputGroupSelectDelete').options[selectedIndex].getAttribute('value');
    document.getElementById("gNummer").value = selectedElem;  
}
/**
 * @function dropdownAnswerUpdate
 * This function checks which number got selected by the dropdown menu and enters the value to the form to update it.
 */
function dropdownAnswerUpdate(){
    //selectedElem = document.querySelector('#inputGroupSelect').getAttribute('value');
    var selectedIndex = document.querySelector('#inputGroupSelectUpdate').selectedIndex;
    var selectedElem = document.querySelector('#inputGroupSelectUpdate').options[selectedIndex].getAttribute('value');
    document.getElementById("nummer2").value = selectedElem;  
}