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
 * @param {double} coord1 - is the first coordinate
 * @param {double} coord2 - is the second coordinate
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

var sum // this variable is needed to sum up values in the following function
/**
 * @function calculateDistanceLongDistance - Calculates to distances between the 
 * individual coordinates and sums them up to one final sum
 * @param {[double]} list - is an array that contains doubles
 * @returns {double} sum - is the final sum of all subsequences
 */
function calculateDistanceLongDistance(list)
{
    sum = 0
    for(var i=0; i<list.length-1; i++){
        sum += calculateDistance(list[i], list[i+1])
    }
    return sum
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
function intersect(segment1, segment2)
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
    for (var i = 0, j = plgn.coordinates.length - 1; i < plgn.coordinates.length; j = i++) {
        var xi = plgn.coordinates[i][0], yi = plgn.coordinates[i][1]
        var xj = plgn.coordinates[j][0], yj = plgn.coordinates[j][1]
        
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

    for(var j=0; j<polygon.coordinates.length-1; j++){
    crossPointDist[j] = intersect([route.coordinates[i-1],route.coordinates[i]],[polygon.coordinates[j],polygon.coordinates[j+1]])
    }
    for(j=0; j<crossPointDist.length; j++){
        if(crossPointDist[j]!= null) {
            crossPointDist[j] = [crossPointDist[j],calculateDistance(crossPointDist[j],route.coordinates[i-1])]
        }
        else crossPointDist[j] = [crossPointDist[j],999999999]
    }
    crossPointDist.sort(function([a,b],[c,d]){return b-d}) // sort the array to get rthe nearest intersection
    return crossPointDist[0][0] 
}  

// some arrays, which are needed for the following calculation 
let pointsInsideOfPoly
let pointsOutsideOfPoly
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
    for(var i=0; i<route.coordinates.length-1; i++){

        if(isPointInPoly(polygon, route.coordinates[i]) == false){
            var subsection = new Array()
            counter = 0
            // Checks whether the coordinate is the first in the given array.
            // If it would be, the "getBorderOfSubsection"-algorithm would not work
            if(i!=0){
                // Calculates the intersection
                subsection[counter] = getBorderOfSubsection(polygon, route, i)
                counter++
            }
            subsection[counter] = route.coordinates[i]
            i++
            counter++
            while(isPointInPoly(polygon, route.coordinates[i]) == false){
                subsection[counter] = route.coordinates[i]
                if(i<route.coordinates.length-1) i++
                else break
                counter++
            }
            // Calculates the intersection
            subsection[counter] = getBorderOfSubsection(polygon, route, i)
            counter++
            if(i>=route.coordinates.length) break
            pointsOutsideOfPoly[pointsOutsideOfPolyLength] = subsection
            pointsOutsideOfPolyLength++
            
            i--
        } else { // points inside of polygon: isPointInPoly(polygon, route.coordinates[i]) == true)
            var subsection = new Array()
            counter = 0
            // Checks whether the coordinate is the first in the given array.
            // If it would be, the "getBorderOfSubsection"-algorithm would not work
           if(i!=0){
                // Calculates the intersection
                subsection[counter] = getBorderOfSubsection(polygon, route, i)
                counter++
            }
            subsection[counter] = route.coordinates[i]
            i++
            counter++
            while(isPointInPoly(polygon, route.coordinates[i]) == true){
                subsection[counter] = route.coordinates[i]
                if(i<route.coordinates.length-1) i++
                else break
                counter++
            }
            // Calculates the intersection
            subsection[counter] = getBorderOfSubsection(polygon, route, i)
            counter++
            if(i>=route.coordinates.length) break
            pointsInsideOfPoly[pointsInsideOfPolyLength] = subsection
            pointsInsideOfPolyLength++

            i--
        }
    } 
}

// needed array and variables for the following calculations
let distances // will contain all relevant data
var dist 
var startpoint
var endpoint
// The subsequence-array for the subsequences inside as well as outside of the polygon get merged
/**
 * @function compressData - The function compressed all data into the (now) relevant data.
 * That is the length of each subsequence, the start and the end coordinates
 * @param {[[double,double],[double,double],...,[double,double]]} list - Represents a list of sequences
 */
function compressData(list)
{
    distances = new Array()
    var counter = 0
    for(var i=0; i<list.length; i++){
        for(var j=0; j<list[i].length; j++){
            dist = calculateDistanceLongDistance(list[i][j])
            startpoint = list[i][j][0]
            endpoint = list[i][j][list[i][j].length-1]
            distances[counter] = [dist, startpoint, endpoint]
            counter++
        } 
    }
}

// ------------ Task 2 --------------

/**
 *Function checks whether the given string is a valid stringified JSON
 *@function {isvalid}
 *@param {string} str - stringified JSON
 *@throws Will throw an error if the entered string is not a stringified JSON
 */
 function isValid(str){
	try{
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/**
 * @function {clearTableWithoutHeading} - Clears table and deletes all rows except the head-row
 */
function clearTableWithoutHeading(){
    var t = document.getElementById("table")
    var childCounter = t.childElementCount

    for(var i=0; i<childCounter-1; i++){
        t.removeChild(t.lastChild)
    }
}
/**
 * @function {clearTable} - Clears table and deletes all rows except the head-row
 */
 function clearTable(){
    var t = document.getElementById("table") // saves the elements in this html element
    var childCounter = t.childElementCount

    for(var i=0; i<childCounter; i++){
        t.removeChild(t.lastChild) // removes children
    }
}

/**
 * Builds a JSON object 
 * @param {[[coordinates],[coordinates],..,[coordinates]]} array - Includes the array which gets tranformed
 * @param {string} type  - Includes the information about the object-type
 */
function JSONConstructor(array, type){
    this.type = type
    this.coordinates = array
}

// This variable is the place where the route which gets intersected with the polygon is saved
var linestring
/**
 * @function {getInputValue} - Reads the inpute from textarea and saves it as "linestring".
 * Then it the main-method gets called with the new route.
 */
function getInputValue(){
    document.getElementById("errorMessage").className = ""
    document.getElementById("errorMessage").innerHTML = ""

    if(isValid(document.getElementById("input").value) == true){ // Checks whether the input is valid
        if((JSON.parse(document.getElementById("input").value)).type != "LineString"){
            document.getElementById("errorMessage").className = "alert alert-warning"
            document.getElementById("errorMessage").innerHTML = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'
        } else{
            linestring = JSON.parse(document.getElementById("input").value)
            main(linestring)
        }
    } else { // Throws an error if not
        document.getElementById("errorMessage").className = "alert alert-warning"
        document.getElementById("errorMessage").innerHTML = "ERROR: This is not a valid GeoJSON"
    }
}

/**
 * @function {useStandard} - Uses the given route as route for the calculation. Useful for the case 
 * there was already entered a new LineaString but the user wants to replace it by the old route.
 */
function useStandard(){
    linestring = route
    main(linestring)
}
/**
 * @function Sleep - The function is a simpler expression for setTimeout. If it gets called the program stops and waits for the duration of milliseconds.
 * @param {Integer} milliseconds 
 */
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let uploadfield = document.getElementById("uploadfield")
var reader
// When the user chooses the option to upload a .json file it gets read by the following code-lines
uploadfield.addEventListener('change', async function(){
    if(uploadfield.isDefaultNamespace.length > 0){
        reader = new FileReader()
        reader.readAsText(uploadfield.files[0])
        await Sleep(500) // wait 0.5 seconds until the result is loaded
    } else return
    document.getElementById("errorMessage2").innerHTML = ""
    document.getElementById("errorMessage2").className = ""
    if(isValid(reader.result) == true){
        if((JSON.parse(reader.result)).type == "LineString"){
            document.getElementById("uploadButton").disabled = false
        }
        else {
            document.getElementById("errorMessage2").className = "alert alert-warning"
            document.getElementById("errorMessage2").innerHTML = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'
        }
    } else {
        document.getElementById("errorMessage2").className = "alert alert-warning"
        document.getElementById("errorMessage2").innerHTML = "ERROR: This is not a valid GeoJSON" // Throws an error if not
    }
})
/**
 * @function {getFile} - This functin gets calles in case a user wants to use his/her uploaded .json file.
 * Now the used linestring gets replaced by the read .json
 */
function getFile(){
    document.getElementById("errorMessage2").innerHTML = ""
    document.getElementById("errorMessage2").className = ""
    linestring = JSON.parse(reader.result)
    main(linestring)
}


// ------------ Task 2 --------------

// Transforms given arrays to JSONs by building up new objects
polygon = new JSONConstructor(polygon, "Polygon")
document.getElementById("polygon").innerHTML = JSON.stringify(polygon)
route = new JSONConstructor(route, "LineString")
document.getElementById("route").innerHTML = JSON.stringify(route)
linestring = route

var lists
function main(routeForCalc){
    // Recognizes all points from route which are inside of the polygon and those, 
    // which are laying outside. Then also calculates the point where the line crosses
    // the polygon
    mainCalculation(routeForCalc)

    lists = [pointsOutsideOfPoly, pointsInsideOfPoly] // connects both lists

    // Now the "copmressData"-Function gets used
    compressData(lists)

    // Now all the elements in the array with all the needed data gets sorted after the length of each section
    distances.sort(function([a,b],[c,d]){return a-c}) 

    // Clears the table before filling it (needed in case it is already filled up)
    clearTable()
    
    // some constants to build up a table for the HTML-webpage
    const table = document.getElementById("table")
    table.className = "table table-striped"
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")
    table.appendChild(thead)
    thead.appendChild(tr)

    var listCaptions = [" Distance (in km) ", " Start coordinate ", "End coordinate "]
    // Now the first line with the headings gets build up 
    for(let caption of listCaptions){
        const th = document.createElement("th")
        th.scope = "col"
        th.innerHTML = caption
        tr.appendChild(th)
    }

    const tbody = document.createElement("tbody")
    table.appendChild(tbody)

    // Now the table gets filled up with all the values from the relevant-data-array
    for(let distance of distances){
        const tr = document.createElement("tr")
        tbody.appendChild(tr)
        
        for(let elements of distance){
            const td = document.createElement("td")
            //const thtext = document.createTextNode(elements)
            td.innerHTML = elements
            tr.appendChild(td)
        } 
    }
    // And also the final lenght of the route gets calucalated.
    // But here the know coordinates (also the intersection-coordinates) get used
    // So the value might be a little bit different from the original length of the route
    var finalSum = 0
    for(let distance of distances){
        finalSum += distance[0]
    }

    document.getElementById("finalSum").innerHTML = "<b>Total length of the route: </b>"+finalSum+" km"
}
// For table-style
$(document).ready(function () {
    $('#table').DataTable({
        "scrollX": true,
        //"scrollY": 200,
    })
    $('.dataTables_length').addClass('bs-select')
})

// Main-method gets called
main(linestring)
