"use strict"

/*
// geojson file about the pictures
let geojson =

{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [7.628056, 51.962222] },
            "properties": {
                "poiname": "Prinzipalmarkt",
                "cityname": "Münster",
                "link": "https://flic.kr/p/4kbwjN",
                "link2": "https://live.staticflickr.com/2288/2186136858_214f8685f2_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [7.596000123049237, 51.96910828669141] },
            "properties": {
                "poiname": "GEO1",
                "cityname": "Münster",
                "link": "http://geomundus.org/2014/images/geo2.jpg",
                "link2": "http://geomundus.org/2014/images/geo2.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [7.6131, 51.9637] },
            "properties": {
                "poiname": "Fürstbischöfliches Schloss",
                "cityname": "Münster",
                "link": "https://flic.kr/p/2jaqZrE",
                "link2": "https://live.staticflickr.com/65535/49989838756_4f282a4874_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [13.74, 51.05] },
            "properties": {
                "poiname": "Dresden",
                "cityname": "Dresden",
                "link": "https://flic.kr/p/xFLCa1",
                "link2": "https://live.staticflickr.com/5784/20797109706_4926e40352_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [9.966111, 53.546111] },
            "properties": {
                "poiname": "Hamburger Hafen",
                "cityname": "Hamburg",
                "link": "https://flic.kr/p/ugwtqM",
                "link2": "https://live.staticflickr.com/520/18553682569_e69b6bae80_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [9.7375, 52.367222] },
            "properties": {
                "poiname": "Neues Rathaus",
                "cityname": "Hannover",
                "link": "https://flic.kr/p/Lewsk8",
                "link2": "https://live.staticflickr.com/8195/29032754173_b6cc777166_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [13.377722, 52.516272] },
            "properties": {
                "poiname": "Brandenburger Tor",
                "cityname": "Berlin",
                "link": "https://flic.kr/p/Fx7s3D",
                "link2": "https://live.staticflickr.com/811/25949983617_3e2959a8e9_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [6.783333, 51.233333] },
            "properties": {
                "poiname": "Düsseldorf",
                "cityname": "Düsseldorf",
                "link": "https://flic.kr/p/7nTYJg",
                "link2": "https://live.staticflickr.com/2687/4185928571_946dee0f20_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [8.684444, 50.113611] },
            "properties": {
                "poiname": "Frankfurt Altstadt",
                "cityname": "Frankfurt am Main",
                "link": "https://flic.kr/p/2izHsWG",
                "link2": "https://live.staticflickr.com/65535/49608292196_e66a29859a_n.jpg"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [11.578947, 48.14065] },
            "properties": {
                "poiname": "Antiquarium",
                "cityname": "München",
                "link": "https://flic.kr/p/2axWda3",
                "link2": "https://live.staticflickr.com/65535/44337291772_f78486053b_n.jpg"
            }
        }
    ]
}
*/
console.log(geojson)

// create a variable for the map
let mymap

// retrieve the pictures
let pictures = geojson
//console.log(pictures)

// retrieve the poinames
let poinames = pictures.map(function (el) {
    return el.properties.poiname
})
//console.log(poinames)

// autocomplete
$("#pictures").autocomplete
    ({
        minLength: 1, // start after 1 character
        source: poinames, // take the poinames as source
        select: function (event, ui) {
            this.value = ui.item.value // update the value of the current field with the value of the selected element

            let details = pictures.filter(function (el) {
                // return the only object for which the poiname matches the selection
                return el.properties.poiname === ui.item.value
            })


            // show the details as a bootstrap card
            showDetailsAsCard(details)

            // show the details on a leaflet map 
            showDetailsOnMap(details)

            return false // see https://css-tricks.com/return-false-and-prevent-default/
        }
    })


function showDetailsAsCard(details) {
    let text = `The current selection is: <br> <br> POI Name: ${details[0].properties.poiname}, City Name:  ${details[0].properties.cityname}, Link:  <a href=" ${details[0].properties.link}"> ${details[0].properties.link}</a> `
    //  console.log(details[0].properties)

    // create a card element and fill it with information from the current poi
    let cardbody = document.getElementById("information").children[0]
    console.dir(cardbody)
    // Title
    cardbody.children[0].innerHTML = details[0].properties.poiname
    // subtitle
    cardbody.children[1].innerHTML = details[0].properties.cityname
    //content
    nearbyPlaces(details[0]).then(result => {
        cardbody.children[2].innerHTML = result
        console.trace("I am doing a test")
    })
    // link
    cardbody.children[3].href = details[0].properties.link
    cardbody.children[3].innerHTML = details[0].properties.link


}
/*
async function nearbyPlaces(currentpoi) {
    //console.log(currentpoi.geometry.coordinates)
    let [long, lat] = currentpoi.geometry.coordinates

    let dataurl = `https://places.ls.hereapi.com/places/v1/discover/explore?at=${lat}%2C${long}&cat=sights-museums&apiKey=${myHereAPIKey}`

    let res = await fetch(dataurl)
    let data = await res.json()
    // console.log(data) 

    // if some nearby places
    if (data.results.items.length != 0) {
        let text = "<i>Nearby places</i> <br>"
        for (const element of data.results.items) {
            text = text + element.title + ", " + element.distance + " meters <br>"
        }
        return text
    }
    else {
        return "No text to display"
    }

}

function showDetailsOnMap(details) {
    // get the current poi
    let currentpoi = details[0]

    // geojson uses long/lat as ordering
    let [long, lat] = currentpoi.geometry.coordinates

    if (mymap != undefined || mymap != null) { mymap.remove() }

    // initialize the map
    mymap = L.map('myfirstmap').setView([lat, long], 13) // leaflet uses lat/long

    // add the base map
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${myMapBoxKey}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: myMapBoxKey
    }).addTo(mymap)

    // add a marker
    var marker = L.marker([lat, long]).addTo(mymap)
    let text = `<a href="${currentpoi.properties.link}"><img src="${currentpoi.properties.link2}" width="320" height="175"></a>`

    // add the picture to the current popup
    console.log(text)
    marker.bindPopup(text).openPopup()

}*/