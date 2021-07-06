
var title = new Vue({
    el: '#title',
    data: {
        message: 'Geosoftware 1, 2021 - Task 8'
    }
})

var subtitle = new Vue({
    el: '#subtitle',
    data: {
        message: 'Submission of: J. Balzer & A. Pilz'
    }
})

var table = new Vue({
    el:'#table',
    data:{
        distances: distances
    },
})

var finalSumValue = new Vue({
    el:'#finalSumValue',
    data:{
        message: 'Overall distance: ' + Math.round(finalSum * 100) / 100
    }
})

var polygonArea = new Vue({
    el: "#polygonArea",
    data: { 
        message: JSON.stringify(polygon)
    }
})

var linestring = "";

var inputValue = new Vue({
    el: "#input",
    data: { 
        message: '',
        errorMes: ''    
    },
    methods: {
        getInputValue: function(){
            this.errorMes = ''
            if(isValid(this.message) == true){
                if((JSON.parse(this.message)).type != "LineString"){
                    this.errorMes = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'                    
                } else{
                    linestring = JSON.parse(this.message)
                    main(linestring)
                }
            } else { // Throws an error if not
                this.errorMes = "ERROR: This is not a valid GeoJSON"
            }        
        }
    }
})

<<<<<<< Updated upstream
=======

/*var polygonField = new Vue({
    el: "#polygon",
    data: { 
        message: ''
    }
})*/


>>>>>>> Stashed changes
var routeField = new Vue({
    el: '#routeField',
    data: { message: 'Hallo' },
    methods: {
        
    }
})
