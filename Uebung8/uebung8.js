
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
