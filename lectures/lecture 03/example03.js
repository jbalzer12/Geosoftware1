"use strict"
// list of snippets incorporated in the podcast for the lecture
// to test yourself, copy paste from here or the slides

/*
//let a = 5, b = 10

//console.log(anonymousFunction(a,b)) 
console.log(namedFunction(a))  
//console.log(namedF(a, b))

let anonymousFunction = function(a, b)
{
    return a + b
}

let anonymousFunction2 = (a, b) => a + b

let namedF = function namedFunction (a)
{
    return a * 10
}

let namedF2 = a => a * 10

function namedFunction()
{
    console.log("I am a traditional named function")
}


let namedFunction2 = () => "I am now an arrow function"


console.log(anonymousFunction2(a,b))
console.log(namedFunction2())
console.log(namedF(a))
*/

let pod = function (examplefunction)
{
    console.log(examplefunction)
    examplefunction()
}

let cast = function ()
{
    console.log("End of the podcast") 
}
pod(cast)
/*
var executeSomething = function ()  // var/let functionExpressionName 
{
    console.log("function expression") // statements
}

// Funktionsausdrücke ohne Name
var executeSomething2 = function namedFunction()
{
    console.log("function expression with name")
}


console.dir(executeSomething)
console.dir(executeSomething2)

executeSomething2()
*/
setTimeout(pod(cast), 5000)


/*
// Funktionsdeklaration
function doSomething()  // function FunctionName()
{
    console.log("function declaration") // statements
}

// Funktionsausdrücke
var executeSomething = function ()  // var/let functionExpressionName 
{
    console.log("function expression") // statements
}

// Funktionsausdrücke ohne Name
var executeSomething = function ()
{
    console.log("function expression") 
    console.log("function expression without name")
    console.log("I am also called an anonymous function")

}

// Funktionsausdrücke mit Name
var executeSomething2 = function namedFunction()
{
    console.log("function expression with name")
}


// function declaration
function Sum (a, b)
{
    return a + b
}
//Sum(a, b) // function call

/* let c = Sum (a, b)
console.log(c)
console.log(Sum (a,b))


// functions as parameters
function a()
{
    console.log("foo")
}

function b(f)
{
    f()
}
  
b(a) // b runs function a [synchronous callback]
b(() => console.log("bar")) // b runs anonymous arrow
  
// asynchronous callback
function cb()
{
    console.log("cb was called back")
}

setTimeout(cb, 5000) // cb, not cb()


// spread
let array1 = [1, 2, 3, 4]
let array2 = [5, 6, 7, 8]
let combined = array1.concat(array2)
//let combined = [...array1, ...array2] // spread operator [ 1, 2, 3, 5, 6, 7 ]

function Sum(num1, num2, num3, num4)
{
    console.log("##"+ num4)
    return num1 + num2 + num3 + num4
}
Sum (...array1) // Sum (1, 2, 3, 4) = 10
console.log(Sum (...array1))
console.log(Sum(1,2,3)) // NaN
console.log(Sum(1,2,3,4,5)) // 10

var icombined = array2.concat(array1)

// rest parameters
function sumFlexible ()
{
    let input = Array.from(arguments)
    return input.reduce((a, b) => a + b, 0)
}

    // is equivalent to 

function sumFlexible2(...args)
{
    return args.reduce((a, b) => a + b, 0)

}
console.log(sumFlexible2(1, 2, 3, 4, 5, 6, 7)) // 28

sumFlexible(1, 2) // console.log(sumFlexible(1, 2))
sumFlexible(1, 2, 3) // console.log(sumFlexible(1, 2, 3))
sumFlexible(...array1) // console.log(sumFlexible(...array1))

// JSON functions parse and stringify
//let pictureString = '{"poiname": "Antiquarium", "cityname": "München",  "link": "https://flic.kr/p/2axWda3"}'

//picture = JSON.parse(pictureString)

//console.log(picture.poiname) // Antiquarium
//console.log(picture.cityname) // München
//console.log(picture.link) // https://flic.kr/p/2axWda3

let picture = {
    poiname: 'Antiquarium',
    cityname: 'München',
    link: 'https://flic.kr/p/2axWda3'
  }

let pictureString = JSON.stringify(picture)
console.log(pictureString)
// {"poiname":"Antiquarium","cityname":"München","link":"https://flic.kr/p/2axWda3"}
console.log(pictureString.length) // 81

var str = '{"poiname":"Antiquarium","cityname":"München",   "link":"https://flic.kr/p/2axWda3"}'
console.log(str.length)
 */


/* Event listener traditional and new
let element = document.getElementById("testparagraph")

element.onclick = function()
{
    alert ("I have been clicked upon")
}

element.onclick = function()
{
    alert ("Second event handler")
}

element.addEventListener("click", function()
{
    alert ("I have been clicked upon")
})

element.addEventListener("click", function()
{
    alert ("Second event handler")
})

*/