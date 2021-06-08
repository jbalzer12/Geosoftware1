import Picture from "./photo.js"

// import class from the photo module, and create pictures using that class
const pic1 = new Picture("Prinzipalmarkt", "Münster", "https://flic.kr/p/4kbwjN")
const pic2 = new Picture("GEO1", "Münster", "http://geomundus.org/2014/images/geo2.jpg")
const pic3 = new Picture("Fürstbischöfliches Schloss", "Münster", "https://flic.kr/p/2jaqZrE")
const pic4 = new Picture("Dresden", "Dresden", " https://flic.kr/p/xFLCa1")
const pic5 = new Picture("Hamburger Hafen", "Hamburg", "https://flic.kr/p/ugwtqM")
const pic6 = new Picture("Neues Rathaus", "Hannover", "https://flic.kr/p/Lewsk8")
const pic7 = new Picture("Brandenburger Tor", "Berlin", "https://flic.kr/p/Fx7s3D")
const pic8 = new Picture("Düsseldorf", "Düsseldorf", " https://flic.kr/p/7nTYJg")
const pic9 = new Picture("Frankfurt Altstadt", "Frankfurt am Main", "https://flic.kr/p/2izHsWG")
const pic10 = new Picture("Antiquarium", "München", "https://flic.kr/p/2axWda3")

// create a Map object to store (key, value) pairs
let pictures = new Map()
pictures.set("pic1", pic1)
pictures.set("pic2", pic2)
pictures.set("pic3", pic3)
pictures.set("pic4", pic4)
pictures.set("pic5", pic5)
pictures.set("pic6", pic6)
pictures.set("pic7", pic7)
pictures.set("pic8", pic8)
pictures.set("pic9", pic9)
pictures.set("pic10", pic10)

// iterate over the different pictures
pictures.forEach ((value, key) => {
    // show some information in the console using string substitution
    // You need for that a placeholder (here %o, and then one or more arguments that will "fill", the placeholder)
    // See also https://www.freecodecamp.org/news/how-to-get-the-most-out-of-the-javascript-console-b57ca9db3e6d/ for a nice explanation
    console.log("%o", key, value)

    // dom manipulation
    document.getElementById(key).innerText = `${value.poi}, ${value.city}`
    document.getElementById(key).href = value.link
})
