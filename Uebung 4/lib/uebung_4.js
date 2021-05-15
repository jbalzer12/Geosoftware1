"use strict"

// This constant is the mean earth radius
const R = 6371 

/**
*@function deg2rad - Function to convert degree to radian
*@param {double} degree
*@returns {double} radian
*/
function deg2rad(deg) 
{
    return deg * (Math.PI/180)
}

/**
*@function rad2deg - Function to convert from radian to degree
*@param {double} radian
*@returns {double} degree 
*/
function rad2deg(rad)
{
    return rad * (180/Math.PI)
}

/**
 * @function calculateDistance - Function to calculat the distance between two coordinates
 * @param {double} coord1 - is the first coordinate [lat, lon]
 * @param {double} coord2 - is the second coordinate [lat, lon]
 * @returns {double} dist - returns the distance in km 
 */
 function calculateDistance(coord1, coord2) // works
 {
     var lat1 = deg2rad(coord1[0])
     var lon1 = deg2rad(coord1[1])
     var lat2 = deg2rad(coord2[0])
     var lon2 = deg2rad(coord2[1])
 
     var dLat = lat2-lat1
     var dLon = lon2-lon1
     var a = Math.sin(dLon/2) * Math.sin(dLon/2) +
             Math.cos(lon1) * Math.cos(lon2) * 
             Math.sin(dLat/2) * Math.sin(dLat/2)
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
     var dist = R * c // Distance in km
     return dist
 }

/**
 *@function getBearing - Function to calcuate bearing between two points
 *@param {[double]} coord1 - Coordinates of the first point
 *@param {[double]} coord2  - Coordinates of the second point
 *@returns {String} bearing between the given points
 *source: https://www.movable-type.co.uk/scripts/latlong.html
*/
function getBearing(coord1, coord2)
{
    // Transformation of given values 
    var lat1 = deg2rad(coord1[0])
    var lon1 = deg2rad(coord1[1])
    var lat2 = deg2rad(coord2[0])
    var lon2 = deg2rad(coord2[1])

    const y = Math.sin(lon2-lon1) * Math.cos(lat2)
    const x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
    const theta = Math.atan2(y, x)
    const brng = rad2deg(theta)
    return (brng + 360) % 360
}

/**
 * @function crossTrackDistance - The function calculates the crosstrackdistance. That
 * is the distance between a path (coord1, coord2) and a point
 * @param {[double, double]} coord1 - Is the start coordinate of a path
 * @param {[double, double]} coord2 - Is the end coordinate of a path
 * @param {[double, double]} coord3 - Is a point 
 * @returns dist - is the crosstrackdistance between the path and a point
 * source: https://www.movable-type.co.uk/scripts/latlong.html
 */
function crossTrackDistance(coord1, coord2, coord3) // calculates the distance between point (coord3) and line (coord1, coord2)
{
    var dstFstToThrd = calculateDistance(coord1, coord3)
    var brgFstToThrd = getBearing(coord1, coord3)
    var brgFstToSnd = getBearing(coord1, coord2)

    var sigma = dstFstToThrd / R
    var dist = Math.asin(Math.sin(sigma)*Math.sin(brgFstToThrd-brgFstToSnd)) * R
    if(dist<0) return dist * (-1) // we would like to get the amount of the value (positive)
    else return dist
}

/**
 * @function pointOnLine - Calculates whether a point is located on a line
 * @param {[[double, double],[double, double]]} line - Is the line which is involved
 * @param {[double, double]} pnt - Is the point that is involved
 * @returns 
 */
function pointOnLine(line, pnt)
{
    if(crossTrackDistance(line[0], line[1], pnt) == 0) return true
    else return false
}

/**
* @function intersect - Calculates the coordinate, where two sequences cross each other
* @param {[[double, double],[double, double]]} segment1 - Builds up one sequence
* @param {[[double, double],[double, double]]} segment2 - Builds up the other one
* @returns intersectionPoint - That is the coordinate the sequences cross
* source: https://www.movable-type.co.uk/scripts/latlong.html
*/
function intersect(segment1, segment2) // works 
{
    var coord11 = segment1[0]
    var lat11 = coord11[0]; var lon11 = coord11[1]
    var coord12 = segment1[1]
    var lat12 = coord12[0]; var lon12 = coord12[1]
    var coord21 = segment2[0]
    var lat21 = coord21[0]; var lon21 = coord21[1]
    var coord22 = segment2[1]
    var lat22 = coord22[0]; var lon22 = coord22[1]
     
    // Transformation to radian
    var phi1 = deg2rad(lat11), lambda1 = deg2rad(lon11)
    var phi2 = deg2rad(lat21), lambda2 = deg2rad(lon21)
    var theta13 = deg2rad(getBearing(coord11,coord12)), theta23 = deg2rad(getBearing(coord21,coord22))
    var dphi = phi2-phi1, dlambda = lambda2-lambda1
 
    var gamma12 = 2 * Math.asin(Math.sqrt(Math.sin(dphi/2) * Math.sin(dphi/2)
        + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda/2) * Math.sin(dlambda/2)))
    if (Math.abs(gamma12) < Number.EPSILON) {
        //console.log("Coincident points")
        return  [phi1, phi2]
    }
 
    var cosThetaA = (Math.sin(phi2)-Math.sin(phi1)*Math.cos(gamma12))/(Math.sin(gamma12)*Math.cos(phi1))
    var cosThetaB = (Math.sin(phi1)-Math.sin(phi2)*Math.cos(gamma12))/(Math.sin(gamma12)*Math.cos(phi2))
 
    var thetaA = Math.acos(Math.min(Math.max(cosThetaA, -1), 1))
    var thetaB = Math.acos(Math.min(Math.max(cosThetaB, -1), 1))
    
    var theta12, theta21
 
    if(Math.sin(lambda2-lambda1) > 0) {
        theta12 = thetaA
        theta21 = 2 * Math.PI - thetaB
    } else {
        theta12 = 2 * Math.PI - thetaA
        theta21 = thetaB
    }

    var alpha1 = theta13 - theta12
    var alpha2 = theta21 - theta23

    // If this case gets entered, it exists infinite solutions
    if(Math.sin(alpha1) == 0 && Math.sin(alpha2) == 0) {
        //console.log("infinite solutions") 
        return null
    }
    // If this case gets entered, it exists ambitious solutions
    if(Math.sin(alpha1) * Math.sin(alpha2) < 0) {
        //console.log("ambitious solutions") 
        return null
    }

    var alpha3 = Math.acos(-Math.cos(alpha1)*Math.cos(alpha2)+Math.sin(alpha1)*Math.sin(alpha2)*Math.cos(gamma12))
    var gamma13 = Math.atan2(Math.sin(gamma12)*Math.sin(alpha1)*Math.sin(alpha2), 
        Math.cos(alpha2)+Math.cos(alpha1)*Math.cos(alpha3))
    var phi3 = Math.asin(Math.min(Math.max(Math.sin(phi1)*Math.cos(gamma13) + Math.cos(phi1) * Math.sin(gamma13) * Math.cos(theta13), -1), 1))
    var deltaLambda13 = Math.atan2(Math.sin(theta13)*Math.sin(gamma13)*Math.cos(phi1), 
        Math.cos(gamma13)-Math.sin(phi1)*Math.sin(phi3))
    
    var lambda3 = lambda1 + deltaLambda13
    
    var intersectionPoint = [rad2deg(phi3), rad2deg(lambda3)%180]
    if(intersectionPoint[0] < 0) intersectionPoint[0] = intersectionPoint[0] * (-1)
    if(intersectionPoint[1] < 0) intersectionPoint[1] = intersectionPoint[1] * (-1)

    return intersectionPoint
}

/**
 * @function isPointInPoly - Checks out whether a point is located inside of a polygon
 * @param {[[double,double],[double,double],...,[double,double]]} plgn - Represents a 
 * list of coordinates, which build up a polygon
 * @param {[double,double]} pnt - Represents one coordinate
 * @returns inside - That is a boolean, that says whether the point lay inside or not
 */
function isPointInPoly(plgn, pnt)
{
    var x = pnt[0], y = pnt[1]
    
    var inside = false
    for (var i = 0, j = plgn.length - 1; i < plgn.length; j = i++) {
        var xi = plgn[i][0], yi = plgn[i][1]
        var xj = plgn[j][0], yj = plgn[j][1]
        
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside;
    }
    
    return inside;
}

/**
 * @function getBorderOfSubsection - Function that calculates the point, where a sequence crosses the polygon
 * @param {JSONConstructor} polygon - Represents the polygon we are working with
 * @param {JSONConstructor} route - Represents the route we are checking out
 * @param {int} counter - The counter counts the amount of coordinates which were added to the array of subsequences 
 * @param {[[double,double],[double,double],...,[double,dousble]]} subsection - Represents a subsection which lays 
 * either inside the polygon or outside
 * @param {int} i - This iterator is needed to keep in memory for the position in the route
 * @returns counter - The counter value gets changed in this function so it gets returned
 */
 function getBorderOfSubsection(polygon, route, i){ 
    var crossPointDist = new Array() // will contain all distances from the last point outside the polygon to all segments of the polygon
    for(var j=0; j<polygon.length-1; j++){
        crossPointDist[j] = intersect([route.features[0].geometry.coordinates[0][i-1], route.features[0].geometry.coordinates[0][i]],
                                      [polygon[j], polygon[j+1]]) //corrected
    }
    crossPointDist[polygon.length] = intersect([route.features[0].geometry.coordinates[0][i-1], route.features[0].geometry.coordinates[0][i]], [polygon[polygon.length-1],polygon[0]])
    for(j=0; j<crossPointDist.length; j++){
        if(crossPointDist[j]!= null) {
            crossPointDist[j] = [crossPointDist[j],calculateDistance(crossPointDist[j],route.features[0].geometry.coordinates[0][i-1])]
        }
        else crossPointDist[j] = [crossPointDist[j],999999999]
    }
    crossPointDist.sort(function([a,b],[c,d]){ return b-d }) // sort the array to get rthe nearest intersection
    
    var marker = new L.marker([crossPointDist[0][0][1], crossPointDist[0][0][0]]).addTo(map)
    return crossPointDist[0][0] // adds the nearest intersection-point to the subsection-array   
}  
/**
 * 
 */
 function turnAroundCoords(coords){
    var result  = []
    result[0] = coords[1]
    result[1] = coords[0]
    return result
}

var polygon 
/**
 * Transform rectangle from JSON to array
 * @param {JSON} rectangle 
 */
function rectangleToPolygon(rectangle){
    polygon = []
    for(var i=0; i<rectangle[0].length; i++){
        polygon[i] = [rectangle[0][i].lng, rectangle[0][i].lat]
    }
}

// some arrays, which are needed for the following calculation 
let pointsInsideOfPoly
let pointsOutsideOfPoly
var route
/**
 * @function mainCalculation - Recognizes all points from route which are inside of the polygon and those, 
 * which are laying outside. Then also calculates the point where the line crosses the polygon
 * @param {JSON} route - Enter an LineString-(Geo)JSON
 */
function mainCalculation(route){
    // some variables, which are needed for the following calculation  
    pointsInsideOfPoly = new Array()
    pointsOutsideOfPoly = new Array() 
    let pointsOutsideOfPolyLength = 0
    let pointsInsideOfPolyLength = 0
    let counter = 0

    rectangleToPolygon(rectangle)

    for(var i=0; i<route.features[0].geometry.coordinates[0].length-1; i++){

        if(isPointInPoly(polygon, route.features[0].geometry.coordinates[0][i]) == false){  // changed 
            var subsection = new Array()
            counter = 0
            // Checks whether the coordinate is the first in the given array.
            // If it would be, the "getBorderOfSubsection"-algorithm would not work
            if(i!=0){
                // Calculates the intersection
                subsection[counter] = getBorderOfSubsection(polygon, route, i)
                counter++
            }
            subsection[counter] = route.features[0].geometry.coordinates[0][i]
            i++
            counter++
            while(isPointInPoly(polygon, route.features[0].geometry.coordinates[0][i]) == false){
                subsection[counter] = route.features[0].geometry.coordinates[0][i]
                if(i<route.features[0].geometry.coordinates[0].length-1) i++
                else break
                counter++
            }
            // Calculates the intersection
            subsection[counter] = getBorderOfSubsection(polygon, route, i)
            counter++
            if(i>=route.features[0].geometry.coordinates[0].length) break
            pointsOutsideOfPoly[pointsOutsideOfPolyLength] = subsection
            pointsOutsideOfPolyLength+
            i--
        } else { // points inside of polygon: isPointInPoly(polygon, route.coordinates[i]) == true)
            var subsection = new Array()
            counter = 0
            // Checks whether the coordinate is the first in the given array.
            // If it would be, the "getBorderOfSubsection"-algorithm would not work       
            if(i!=0){
                subsection[counter] = getBorderOfSubsection(polygon, route, i)
                counter++
            }
            subsection[counter] = route.features[0].geometry.coordinates[0][i] // correct coordinate    
            i++
            counter++
            while(isPointInPoly(polygon, route.features[0].geometry.coordinates[0][i]) == true){ // correct
                subsection[counter] = route.features[0].geometry.coordinates[0][i] // correct
                if(i<route.features[0].geometry.coordinates[0].length-1) i++
                else break
                counter++
            }
            // Calculates the intersection
            subsection[counter] = getBorderOfSubsection(polygon, route, i)
            counter++
            if(i>=route.features[0].geometry.coordinates[0].length) break
            pointsInsideOfPoly[pointsInsideOfPolyLength] = subsection
            pointsInsideOfPolyLength++
            i--
        }
    } 
}

// Set map 
var map = L.map('map').setView([51.975, 7.61], 13) 

// add an OpenStreetMap tile layer and keep reference in variable
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map)

var geodata = L.geoJson(routeJson)

geodata.bindPopup(routeJson.features[0].properties.name).addTo(map)

var drawnItems = new L.FeatureGroup()
map.addLayer(drawnItems)

var drawControl = new L.Control.Draw({
    draw:{
        marker: true,
        polyline: false,
        circle: false,
        circlemarker: false,
        polygon: false,
        rectangle: {
            showArea: true,
            metric: true,
            drawError: 'orange'
        }
    },
    edit: {
        featureGroup: drawnItems
    }
})

map.addControl(drawControl)

// Show the drawn rectangle on the map and save the coordinates of the rectagle as variable 'rectangle'
let rectangle
map.on('draw:created', function (e){
    var type = e.layerType, layer = e.layer
    if(type === 'marker'){
        layer.bindPopup('A popup!')
    }
    rectangle = layer.getLatLngs()
    drawnItems.addLayer(layer)
    console.log(rectangle)
    mainCalculation(routeJson)
})

var popup = L.popup();

