"use strict"

const R = 6371 

function deg2rad(deg) 
{
    return deg * (Math.PI/180)
}

function rad2deg(rad)
{
    return rad * (180/Math.PI)
}

function convertToInitialBearing(theta)
{
    return (theta+360) % 360
}

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
    var d = R * c; // Distance in km
    return d;
}

function getBearing(coord1, coord2)
{
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

function crossTrackDistance(coord1, coord2, coord3) // calculates the distance between point (coord3) and line (coord1, coord2)
{
    var dstFstToThrd = calculateDistance(coord1, coord3)
    var brgFstToThrd = getBearing(coord1, coord3)
    var brgFstToSnd = getBearing(coord1, coord2)

    var sigma = dstFstToThrd / R
    var dist = Math.asin(Math.sin(sigma)*Math.sin(brgFstToThrd-brgFstToSnd)) * R
    if(dist<0) return dist * (-1)
    else return dist
}

function pointOnLine(line, pnt)
{
    if(crossTrackDistance(line[0], line[1], pnt) == 0) return true
    else return false
}

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
    
    var phi1 = deg2rad(lat11), lambda1 = deg2rad(lon11)
    var phi2 = deg2rad(lat21), lambda2 = deg2rad(lon21)
    var theta13 = deg2rad(getBearing(coord11,coord12)), theta23 = deg2rad(getBearing(coord21,coord22))
    var dphi = phi2-phi1, dlambda = lambda2-lambda1

    var gamma12 = 2 * Math.asin(Math.sqrt(Math.sin(dphi/2) * Math.sin(dphi/2)
        + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda/2) * Math.sin(dlambda/2)))
    if (Math.abs(gamma12) < Number.EPSILON) {
        console.log("Coincident points")
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

    if(Math.sin(alpha1) == 0 && Math.sin(alpha2) == 0) {
        console.log("infinite solutions") 
        return null
    }
    if(Math.sin(alpha1) * Math.sin(alpha2) < 0) {
        console.log("ambitious solutions") 
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

// checks out whether a point is located inside of a polygon
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

let pointsOutsideOfPoly = new Array()
let pointsOutsideOfPolyLength = 0
let counter 

// recognizes all points from route which are inside of the polygon
for(var i=0; i<route.length; i++){
    if(isPointInPoly(polygon, route[i]) == false){
        var subsection = new Array()
        counter = 0

        if(i!=0){
            counter = getBorderOfSubsection(polygon, route, counter, subsection)
        }

        subsection[counter] = route[i]
        i++
        counter++
        while(isPointInPoly(polygon, route[i]) == false){
            subsection[counter] = route[i]
            if(i<route.length-1) i++
            else break
            counter++
        }

        counter = getBorderOfSubsection(polygon, route, counter, subsection)

        if(i>=route.length) break
        pointsOutsideOfPoly[pointsOutsideOfPolyLength] = subsection
        pointsOutsideOfPolyLength++
    }
}

// site = left or right
function getBorderOfSubsection(polygon, route, counter, subsection){
    var crossPointDist = new Array() // will contain all distances from the last point outside the polygon to all segments of the polygon

    for(var j=0; j<polygon.length-1; j++){
    crossPointDist[j] = intersect([route[i-1],route[i]],[polygon[j],polygon[j+1]])
    }
    for(j=0; j<crossPointDist.length; j++){
        if(crossPointDist[j]!= null) {
            crossPointDist[j] = [crossPointDist[j],calculateDistance(crossPointDist[j],route[i-1])]
        }
        else crossPointDist[j] = [crossPointDist[j],999999999]
    }
    crossPointDist.sort(function([a,b],[c,d]){return b-d})
    subsection[counter] = crossPointDist[0][0]
    counter++
    return counter
}   


//builds up table from downside (adds rows on the top)
function addTable(length, lat, lon)
{
    var table = document.getElementById("table")
    var row = table.insertRow(0)
    var cellLength = row.insertCell(0)
    var cellLat = row.insertCell(1)
    var cellLon = row.insertCell(2)
    cellLength.innerHTML = length
    cellLat.innerHTML = lat
    cellLon.innerHTML = lon
}

let distances = new Array()
var dist
var points

for(var i=0; i<pointsOutsideOfPoly.length; i++){
    for(var j=0; j<pointsOutsideOfPoly[i].length-1; j++){
        points = [pointsOutsideOfPoly[i][j], pointsOutsideOfPoly[i][j+1]]
        dist = calculateDistance(points[0], points[1])
        
        distances[j] = [dist,points]
        console.log(distances[j])
    }
}

distances.sort(function([a,b],[c,d]){return a-c})

for(i=distances.length-1; i>=0; i--){
    addTable(distances[i][0],distances[i][1][0],distances[i][1][1])
}

