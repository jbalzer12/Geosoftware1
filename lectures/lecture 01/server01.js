// http server to illustrate the rendering of html files
// (Note: if modules are used, an express server would be more appropriate)
const http = require('http')
const fs = require ('fs')
const port = 3000

console.clear()

const server = http.createServer(function (req, res)
{
  
    // return a file as a response
    fs.readFile('./example01.html', function(err, data) 
    {

        if (err) 
        { 
            res.writeHead(404)
            res.writeHead("Error: file not found", err)
            console.log("Something went wrong", err)
        }
        else
        {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
        }
        res.end()
    })

    /*
    // return some text as a response
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write("Hello World - This is my first message")
    res.end()
    */

})


server.listen(port, function(error)
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