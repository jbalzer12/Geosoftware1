const express = require('express')
const path = require('path')
var searchRouter = require('./routes/search.js'); //require search router

const app = express()
const port = 3000

app.use('/search', searchRouter);
app.use(express.static('web'))
//app.use('/static', express.static(path.join(__dirname, 'index.html')))
//app.use('/static', express.static('web/index.html'))
app.use('/map', express.static('web/Uebung 4/index.html'));

app.use(express.static('jquery'))
app.use('/jquery', express.static('lib/jquery-3.6.0.min.js'))

app.use(express.static('leaflet'))
app.use('/leafletCSS', express.static('lib/lealet/leaflet.css'))
app.use('/leafletJS', express.static('lib/lealet/leaflet.js'))
app.use('/leafletCSS', express.static('lib/lealet/leaflet.css'))


app.listen(port, () =>
{
    console.log(`App listening at http://localhost:${port}`)
    console.log(`Since we have only one route, named /static/, use /static/filename to show a file from the public folder`)
    console.log(`E.g. /static/index.html will render index.html file`)
    //console.log(`You can also change /static/ to / into the route definition (line 9). Things will be more convenient then :)`)

})