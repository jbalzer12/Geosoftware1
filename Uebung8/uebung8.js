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
        message: 'Overall distance: ' + Math.round(finalSum * 100) / 100 + ' km'
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

var routeShow = new Vue({
    el: '#routeShow',
    data: { message: JSON.stringify(route) },
    methods: {
        useStandard: function(){
            linestring = route
        }
    }
})

Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

new Vue({ el: '#components-demo' })

Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
})

new Vue({ el: '#searchTextTest' })
var file

new Vue({ 
    el: '#fileTest',
    methods: {
        previewFiles(event) {
           console.log(event.target.files);
           file = event
        }
     }
})

//doesnt work ....

var reader

var test = new Vue({ 
    el: '#uploadContainer',
    data: { errorMessage: '' },
    methods: {
        readFile(event) {
            console.log(event.target.files);
            var upload = document.getElementById("uploadField")
            if(upload.isDefaultNamespace.length > 0){
                reader = new FileReader()
                reader.readAsText(upload.files[0])
            }
            if(isValid(reader.result) == true){ // Checks whether the input is valid
                var parsed = JSON.parse(reader.result)
                setTimeout(console.log('We wait'), 10000)
                if(parsed.type != "LineString"){
                    this.errorMessage = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'
                } else{
                    linestring = JSON.parse(reader.result)
                    main(linestring)
                }
            } else { // Throws an error if not
                this.errorMessage = "ERROR: This is not a valid GeoJSON"
            }
        }
     }
})


/*Vue.component('fileUpload', {
    template: `
        <input 
            type="file" 
            v-on:input="$emit('input', $)
    `

})*/

/*

//var reader
var uploadContainer = new Vue({
    el: '#uploadContainer',
    data: { message: 'Test' }/*,
    methods: {
        onChange: function(){
            return 0
        },

        getFile: function(){
            return 0
        }
    }
})
*/ 
/*
let uploadField = document.getElementById("uploadfield")
var reader
// When the user chooses the option to upload a .json file it gets read by the following code-lines
uploadField.addEventListener('change', function(){
    if(uploadfield.isDefaultNamespace.length > 0){
        reader = new FileReader()
        reader.readAsText(uploadfield.files[0])
    }
})

function getFile(){
    document.getElementById("errorMessage2").innerHTML = ""
    if(isValid(reader.result) == true){ // Checks whether the input is valid
        if((JSON.parse(reader.result)).type != "LineString"){
            document.getElementById("errorMessage2").innerHTML = 'ERROR: This is not a LineString. Expected pattern: {"type":"LineString","coordinates":[...]}'
        } else{
            linestring = JSON.parse(reader.result)
            main(linestring)
        }
    } else { // Throws an error if not
        document.getElementById("errorMessage2").innerHTML = "ERROR: This is not a valid GeoJSON"
    }
}
*/