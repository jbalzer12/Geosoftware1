// basic http server to illustrate requests and response
const http = require('http')
let fs = require("fs")
const port = 3000


const server = http.createServer(function (req, res)
{

     // return a file as a response
     fs.readFile('./storage.html', function(err, data) 
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
             res.write("This is....")
             res.write(data)
         }
         res.end()
     })
 
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