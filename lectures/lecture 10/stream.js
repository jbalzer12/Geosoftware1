let http = require("http")
let fs = require("fs")

let host = "localhost"
let port = "5000"

console.log(process.argv)
console.log(process.env)
alert("Hello, I am a popup")

http.createServer(function (req, res){

 
    fs.readFile('Wildlife_final.mp4', function (err, data) 
   {
      if (err) return console.error(err)
      console.log("Successful reading of my video file")
      res.writeHead(200, {'Content-Type':'video/mp4'})
      res.write(data)
      res.end()

    })
   /* */
   /*
   // steam: see the progression of the data
   fs.stat ('Wildlife_final.mp4', (err, stat) => {

      res.writeHead(200, {'Content-Type':'text/plain'}) 
      var totalfilesize = stat.size
      console.log (`The totalfilesize is: ${totalfilesize} bytes`)
      var progress = 0

      var rStream = fs.createReadStream('Wildlife_final.mp4')
      rStream.on('data', (chunk) => {

      progress = progress + chunk.length 
      
      console.log(`Already completed: ${Math.round (100* progress/totalfilesize)}%`)

      })

   })

 

  
    // create a readable stream final example
    let rStream = fs.createReadStream('Wildlife_final.mp4')
    rStream.on('data', (chunk) => {
        
       console.log(`Received ${chunk.length} bytes of data.`)
     })
   
   res.writeHead(200, {'Content-Type':'video/mp4'})
   rStream.pipe(res)  
  */


}).listen(port, host)

console.log(`Server is running on ${host}:${port}`)

   




 
 /*

   --- E0

     console.log("----")
     console.log("The request: "+req.url);
     console.log ("The method is: "+ req.method); 
     console.log("----")




  --- E1

    var fs = require("fs");
    fs.readFile('videoexample.avi', function (err, data) {
      if (err) return console.error(err);
       console.log("Successful reading of my video file");
    });

    // Create a readable stream - chrome example

     var readerStream = fs.createReadStream('videoexample.avi');
     readerStream.pipe(res);

    // Create a readable stream - read chunk by chunk
     var rStream = fs.createReadStream('videoexample.avi');
     rStream.on('data', (chunk) => {
        
        console.log(`Received ${chunk.length} bytes of data.`);
     });


    // create a readable stream - progress
     fs.stat ('videoexample.avi', (err, stat) => {

        res.writeHead(200, {'Content-Type':'text/plain'}); 
        var totalfilesize = stat.size; 
        console.log ("The totalfilesize is: "+totalfilesize+" bytes");
        var progress = 0; 

        var rStream = fs.createReadStream('videoexample.avi');
        rStream.on('data', (chunk) => {

        progress = progress + chunk.length;  
        
        console.log("Already completed:"+ Math.round (100* progress/totalfilesize)+"%");  

        });

     });

    // create a readable stream final example
     var rStream = fs.createReadStream('Wildlife_final.mp4');
     rStream.pipe(res);
     res.writeHead(200, {'Content-Type':'video/mp4'}); 

    // http://www.binaryhexconverter.com/hex-to-decimal-converter
*/
