
function multiply (a, b)
{
    return a * b
}

function fivetimes (a, b)
{
    return 5 * multiply (a, b)
}

// export multiple functions
module.exports =
{
    Sum: function (a, b)
    {
        return a + b
    },
    specialLog: function (msg) 
    {
        console.log(`Logging via the module. The message is: ${msg}`)
    }, 
    test: fivetimes,
    // export properties
    firstName: 'Max',
    lastName: 'Mustermann'
}

/*
// export a named function
module.exports.Sum = function (a, b)
{
        return a + b
}


// export an anonymous function
module.exports = function (a, b)
{
        return a + b
}
*/

var fs = require("fs")

var path = __dirname

console.log(path)
