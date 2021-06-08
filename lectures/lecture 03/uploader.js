'use strict'

let uploaddiv = document.getElementById("uploadform")
let picturesdiv = document.getElementById("pictures")
let uploadfield = document.getElementById("uploadfield")

/**
 * 
 * Event listener for the uploadfield element that is used to help users upload new files
 * @param {string} type - the type of event listened to
 * @param {EventListener} listener - the function to call when the event is triggered
 * 
 */
uploadfield.addEventListener('change', function(){

    // if a file was selected
    if (uploadfield.files.length > 0) 
    {
    var reader = new FileReader() // File reader to read the file 

    reader.readAsText(uploadfield.files[0]); // read the uploaded file
    
    // event listener, if the reader has read the file
    reader.addEventListener('load', function() {
        
        var result = JSON.parse(reader.result) // parse the result into a JSON object (no error checking at this point) 
        
        let n = countPictures(result)
        console.log(`The number of pictures is ${n}`)

        showPictures(result)

    })
    }  

})


/**
 * 
 * @param {JSON} result - the json object containing information about pictures to display 
 * 
 */
function showPictures(result)
{
   // update the visibility of divs
    uploaddiv.style.display = "none"
    picturesdiv.style.display = "block"
    let pictures = result.features
    let i = 0
    for (const element of pictures)  // for ... of
    {
        console.log(element)
        i++    
        let key = `pic${i}`
       // console.log(key)
        // dom manipulation
        document.getElementById(key).innerText = `${element.properties.poiname}, ${element.properties.cityname}`
        document.getElementById(key).href = element.properties.link
    }

}


/**
 * 
 * @param {JSON} result - the list of results to count 
 * @returns {number} - the number of pictures (as the length of the array)
 */
function countPictures(result)
{
    return result.features.length
}