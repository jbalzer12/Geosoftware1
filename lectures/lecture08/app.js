const express = require('express')
const path = require('path')

const app = express()
const port = 3000


// rendering static files, e.g. brandenburg_gate
app.use('/static', express.static(path.join(__dirname, 'public')))


app.listen(port, () => 
{
  console.log(`App listening at http://localhost:${port}`)
  console.log(`Since we have only one route, named /static/, use /static/filename to show a file from the public folder`)
  console.log(`E.g. /static/index.html will render index.html file`)
  console.log(`You can also change /static/ to / into the route definition (line 9). Things will be more convenient then :)`)
})

