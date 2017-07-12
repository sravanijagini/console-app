var mongoose = require('mongoose');
var prompt = require('prompt');
var mongodb = require('mongodb');
var _ = require('lodash');
var stats = require("stats-lite");
require('console.table');
//var tools = require('./sum');
var async = require('async')
var plotly= require('plotly')('sravanij', '2q5Ry7MrnR8zkcE18sGM');


mongoose.connect('mongodb://localhost/users');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   	command : String,
	device_id : String,
	voltage : String ,
	e1 : String,
	e2 : String,
	e3 : String,
	e4 : String,
	e5 : String,
	date_time :Date ,
	__v:Date 
});

var User = mongoose.model('contacts', userSchema);


User.find().distinct("device_id",function(err,deviceids){
        if (err) throw err;
        _.forEach(deviceids, function(value) {
                User.find({"device_id":value}, function(err, users) {
                    if (err) throw err;
                    console.log(value+" "+users.length);
                    });
        });
})

// User.find().distinct("date_time",function(err,deviceids){
//         if (err) throw err;
//         var dateArray =[]
//        _.forEach(deviceids, function(value) {
//           var p = new Date(value).toISOString().replace(/\T.+/, '')    
//           dateArray.push(p)
//         });
//         var udateArray = _.uniq(dateArray);
//         console.log(udateArray)
// })

console.log("choose a device id and date")
console.log("give a date of format yyyy-mm-dd")


prompt.start();
 prompt.get(['device_id','date_time'], function (err, result) {
      
        console.log(result.device_id+" "+result.date_time+" is your choice")
        User.find({"device_id":result.device_id},function(err,dat){
            if(err) throw err;
                var kdat = JSON.parse(JSON.stringify(dat))
                var e1 = 0,
                    e2=0,
                    e3=0,i=0,e4=0,e5=0
                var e1Array=[]
                var e2Array=[]
                var e3Array =[]
                var e4Array=[] 
                var e5Array=[]
                var tdat = []
                var pdat
                _.forEach(kdat,function(pdat){
                    var date = pdat.date_time
                    var p = new Date(date).toISOString().replace(/\T.+/, '') 
                    if(p === result.date_time){
                                 tdat.push(pdat)
                            }
               })
                  // console.log(tdat)

                _.forEach(tdat,function(jdat){
                    
                        e1 = parseInt(jdat.e1,0)
                        e2 = parseInt(jdat.e2,0)
                        e3 = parseInt(jdat.e3,0)
                        e4 = parseInt(jdat.e4,0)
                        e5 = parseInt(jdat.e5,0)
                        e1Array.push(e1)
                        e2Array.push(e2)
                        e3Array.push(e3)
                        e4Array.push(e4)
                        e5Array.push(e5)
                        i=i+1
                        
                })

                var j 
                var e1ma =[]
                var e2ma =[]
                var e3ma =[]
                var e4ma =[]
                var e5ma =[]
                
               // console.log(i)
                // console.log(e1Array)
                // console.log(e2Array)
                // console.log(e3Array)
                // console.log(e4Array)
                // console.log(e5Array)
                
                for(j=0;j<i-1;j++){
                    var k1 = (e1Array[j]+e1Array[j+1])/2
                    e1ma.push(k1)
                    var k2 = (e2Array[j]+e2Array[j+1])/2
                    e2ma.push(k2)
                    var k3 = (e3Array[j]+e3Array[j+1])/2
                    e3ma.push(k3)
                    var k4 = (e4Array[j]+e4Array[j+1])/2
                    e4ma.push(k4)
                    var k5 = (e5Array[j]+e5Array[j+1])/2
                    e5ma.push(k5)
                 }
                //  console.log(e1ma)
                //  console.log(e2ma)
                //  console.log(e3ma)
                //  console.log(e4ma)
                //  console.log(e5ma)
            
            var data = [
            {
                 y: e1ma,
                type: "scatter"
            }
            ];
            var graphOptions = {filename: "e1ma", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
            });

             var data = [
            {
                 y: e2ma,
                type: "scatter"
            }
            ];
            var graphOptions = {filename: "e2ma", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
            });

             var data = [
            {
                 y: e3ma,
                type: "scatter"
            }
            ];
            var graphOptions = {filename: "e3ma", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
            });

             var data = [
            {
                 y: e4ma,
                type: "scatter"
            }
            ];
            var graphOptions = {filename: "e4ma", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
            });

             var data = [
            {
                 y: e5ma,
                type: "scatter"
            }
            ];
            var graphOptions = {filename: "e5ma", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
            });

            // if you want all values in one graph use below code

            // var trace1 = {
            //     y: e1ma,
            //     type: "scatter"
            // };
            // var trace2 = {
            //     y: e2ma,
            //     type: "scatter"
            // };
            // var trace3 = {
            //     y: e3ma,
            //     type: "scatter"
            // };
            // var trace4 = {
            //     y: e4ma,
            //     type: "scatter"
            // };
            // var trace5 = {
            //     y: e5ma,
            //     type: "scatter"
            // };
            // var data = [trace1, trace2,trace3,trace4,trace5];
            // var graphOptions = {filename: "basic-line", fileopt: "overwrite"};
            
            // plotly.plot(data, graphOptions, function (err, msg) {
            // console.log(msg);
            // });




        })


});

module.exports = User;
