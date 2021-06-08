// basic http server to illustrate requests and response
const http = require('http')
const port = 3000

console.clear()

const server = http.createServer(function (req, res)
{
    //console.log(req.method)
    //console.log(req.headers)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write("Hello Node")
    res.end()
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