"use strict"

class Multimedia 
{ 
    constructor(name, extension)
    {
        this.name = name
        this.extension = extension
    }

    getMultimediaType (){
        console.log(`The type of this file is ${this.extension}`)
    }   
}

class Picture extends Multimedia
{
    constructor (name, extension, link)
    {
        super(name, extension)
        this.link = link
    }

    getMultimediaType (){
        console.log(`Overriding a function: the type of this file is ${this.extension}`)
    }  

    show ()
    {
        console.log(`Showing the picture ${this.link}`)
    }
}

class Video extends Multimedia
{
    constructor (name, extension)
    {
        super(name, extension)
    }

    play()
    {
        console.log(`The video is playing...`)
    }
}

let picture1 = new Picture("pic1", ".svg", "https://flic.kr/p/4kbwjN")
picture1.getMultimediaType()
picture1.show()


let video1 = new Video("vid1", ".mp4")
video1.getMultimediaType()
video1.play()
//video1.show()


//console.dir(window)

let pic  = {
    poiname: "Prinzipalmarkt",
    cityname: "Münster",
    url: "https://flic.kr/p/4kbwjN",
    show: function ()
    {
        console.log(this)
        console.log(`Showing the picture ${this.poiname}`)
    }
}
pic.show()
// Showing the picture Prinzipalmarkt



let pic2  = {
    poiname: "Prinzipalmarkt",
    cityname: "Münster",
    url: "https://flic.kr/p/4kbwjN",
    show: () =>  
    {
        console.log(this) //Window {window: Window, self: Window}
        console.log(`Showing the picture ${this.poiname}`)
    }
}

pic2.show()

// class
class Picture {

    constructor (poiname, cityname, link)   
    {
     this.poiname = poiname
     this.cityname = cityname
     this.link = link
    }

    show ()
    {
        console.log(`Showing the picture ${this.poiname}`)
    }

    static hello()
    {
        console.log("Hello") // Hello
    }
}

Picture.hello()

// instance
const pic1 = new Picture1("Prinzipalmarkt", "Münster", "https://flic.kr/p/4kbwjN")
pic1.show()

let pod = function (examplefunction)
{
    console.log(examplefunction)
    return examplefunction
}

let cast = function ()
{
    console.log("End of the podcast") 
}
pod(cast)
setInterval(pod(cast), 5000)

setTimeout(pod(cast), 5000)

const test = async () => {


    const data = await random()
    console.log(data) 
}

var array = "End of podcast"

for (let e in array) // for...in
{
    process.stdout.write(array[e]+ " ")
}
process.stdout.write("\n")


/*
console.dir(window.navigator);

console.log(window.screenX + ", " + window.screenY);
console.log(window.innerWidth + ", " + window.innerHeight);

console.dir(window.history);

window.history.back(); // haha
*/