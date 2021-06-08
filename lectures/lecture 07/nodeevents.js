/*
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {} // new class inherits from EventEmittler

const myEmitter = new MyEmitter() // create a new instance of MyEmitter

myEmitter.on('event', () => { // what happens when the event is fired
  console.log('an event occurred!')
})

myEmitter.emit('event') // fire the event
*/

// extra lines to illustrate the use of modules in Node.js
let mod = require('./moduleExample.js') // import the module
console.log(mod.Sum(1, 2)) // use a named function from the module
console.log(mod.firstName) // use a property from the module
mod.specialLog("Helloo") // use another named function from the module
//console.log(mod (1, 3)) // use an anonymous function from the module
console.log(mod.test(2, 3))