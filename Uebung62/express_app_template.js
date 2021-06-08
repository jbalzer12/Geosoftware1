const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) =>
{
    res.send('Hello World')
})

app.use(express.static('web'))

app.listen(port, () =>
{
    console.log(`App listening at http://localhost${port}`)
})