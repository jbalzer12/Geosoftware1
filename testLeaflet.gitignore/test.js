var map = L.map('map').setView([51.505, -0.09], 13);
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map)


var marker = L.marker([51.5, -0.09]).addTo(map);
