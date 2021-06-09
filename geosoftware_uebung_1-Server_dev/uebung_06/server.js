
const express = require('express'); //requere for express
const app = express(); //create express app
const port = 3000;

var searchRouter = require('./routes/search.js'); //require search router
var addRouter = require('./routes/add.js'); //require add router

//folders
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//routers
app.use('/search', searchRouter);
app.use('/add', addRouter);
app.use('/index', express.static(__dirname + '/index.html'));
app.use('/table', express.static(__dirname + '/uebung_2.html'));

app.get("/index", (req, res) => { res.sendFile(__dirname + "/public/index.html"); });

//app.get('/:name', (req, res) => {
//    res.send('Your name is ' + req.params.name + '\n');
//});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
    }
);
