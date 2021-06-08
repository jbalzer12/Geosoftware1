// a simple express server
const express = require('express')
const port = 4000
const app = express()

console.clear()

app.use(express.static("public"))

app.listen(port, function(error)
{
    if(error)
    {
        console.log("Something went wrong", error)
    }
    else
    {
        console.log ("Server is listening on port", port)
    }
})