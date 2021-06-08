// define a class Picture with its constructor
// make the current file a module
/**
 * @class 
 */
export default class Picture {

    /**
     * 
     * @param {string} poiname - the name of the point of interest
     * @param {string} cityname - the city shown on the picture
     * @param {string} link - the url showing to the picture
     */
    constructor (poiname, cityname, link)   
    {
     this.poiname = poiname
     this.cityname = cityname
     this.link = link
    }

}