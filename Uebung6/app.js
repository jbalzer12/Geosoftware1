const express = require('express')
const path = require('path')
var searchRouter = require('./routes/search.js'); //require search router

const app = express()

const port = 3000

app.use('/search', searchRouter);
app.use(express.static('web'))
//app.use('/static', express.static(path.join(__dirname, 'index.html')))
//app.use('/static', express.static('web/index.html'))
app.use('/map', express.static(path.join(__dirname, './web/Uebung 4/index.html')))
app.use('/table', express.static(path.join(__dirname, './web/Uebung 2/index.html'))) // WENN ICH DAS HIER EINGEBE (ALSO localhost:3000/table) DANN FUNKTIONERT DIE SEITE NICHT MEHR
app.use('/', express.static(path.join(__dirname, 'Uebung 2/index.html')))

//app.use(express.static('lib'))
app.use('jquery', express.static('lib/jquery-3.6.0.min.js'))
app.use('/leafletCSS', express.static('lib/leaflet/leaflet.css'))
app.use('/leafletJS', express.static('lib/leaflet/leaflet.js'))
app.use('/leafletDrawJS', express.static('lib/leaflet-draw/dist/images/leaflet.draw.js'))
app.use('/leafletDrawCSS', express.static('lib/leaflet-draw/dist/images/leaflet.draw.css'))


app.listen(port, () =>
{

    console.log(`App listening at http://localhost:${port}`)
    //onsole.log(`Since we have only one route, named /static/, use /static/filename to show a file from the public folder`)
    //console.log(`E.g. /static/index.html will render index.html file`)
    //console.log(`You can also change /static/ to / into the route definition (line 9). Things will be more convenient then :)`)

})