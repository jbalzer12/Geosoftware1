const express = require('express')
//const path = require('path')

const app = express()
const port = 3000

app.get('/', (req, res) => 
{
  res.send('Hello World!')
})

app.use(express.static('public'))
//app.use('/static', express.static('public'))
//app.use('/static', express.static(path.join(__dirname, 'public')))


app.listen(port, () => 
{
  console.log(`App listening at http://localhost:${port}`)
})

