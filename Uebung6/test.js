let http = require('http') // use an existing module from node
let host = "localhost"
let port = 5000

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write ("Helloooooo")
    res.end()
}).listen(port, host)

console.log(`Server is running on ${host}:${port}`)
