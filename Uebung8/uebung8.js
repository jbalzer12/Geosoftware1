//Title vue
var title = new Vue({
    el: '#title',
    data: {
        message: 'Geosoftware 1, 2021 - Task 8'
    }
})

//Subtitle vue
var subtitle = new Vue({
    el: '#subtitle',
    data: {
        message: 'Submission of: J. Balzer & A. Pilz'
    }
})

//Table vue
var table = new Vue({
    el:'#table',
    data:{
        distances: distances
    },
})

//final Sum vue
var finalSumValue = new Vue({
    el:'#finalSumValue',
    data:{
        message: 'Overall distance: ' + Math.round(finalSum * 100) / 100 + ' km'
    }
})

//Polygon as String vue
var polygonArea = new Vue({
    el: "#polygonArea",
    data: { 
        message: JSON.stringify(polygon)
    }
})

var linestring = ""; //initialize lineString

//Input for Route vue
var inputValue = new Vue({
    el: "#input",
    data: { 
        message: '',
        errorMes: ''   
    },
    methods: {
        //This function reads the user input in the input field and makes the calculations with it
        getInputValue: function(){
            this.errorMes = ''
            if(isValid(this.message) == true){
                if((JSON.parse(this.message)).type != "LineString"){
                    //errormessage is shown if the input does not conform to the lineString pattern
                    this.errorMes = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'                    
                } else{
                    //if the Route is valid it is parsed and interpreted
                    linestring = JSON.parse(this.message)
                    main(linestring)
                }
            } else { 
                //if the Route is not 
                this.errorMes = "ERROR: This is not a valid GeoJSON"
            }        
        }
    }
})

//Route container vue
var routeShow = new Vue({
    el: '#routeShow',
    data: { message: JSON.stringify(route) }, //stringified route as content
    methods: {
        // Sets the standard route as used route
        useStandard: function(){
            linestring = route
        }
    }
})