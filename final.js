var mongoose = require('mongoose');
var prompt = require('prompt');
var mongodb = require('mongodb');
var _ = require('lodash');
var stats = require("stats-lite");
require('console.table');
var tools = require('./sum');

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
	date_time :String ,
	__v:String 
});

var User = mongoose.model('contacts', userSchema);
/*
User.find().distinct("device_id",function(err,deviceids){
        if (err) throw err;
         _.forEach(deviceids, function(value) {
            console.log(value);

                User.find({"device_id":"value"}, function(err, users) {
                    if (err) throw err;

                    // object of all the users
                    console.log("yo");
                    console.log(users.length);

                    });


        });
         console.log("choose one")
})

*/
User.find().distinct("device_id",function(err,deviceids){
        if (err) throw err;
       //console.log(deviceids);
       //console.log(deviceids.length)
        _.forEach(deviceids, function(value) {
           // console.log(value);

                User.find({"device_id":value}, function(err, users) {
                    if (err) throw err;

                    // object of all the users
                   // console.log("yo");
                    console.log(value+" "+users.length);

                    });


        });
        console.log("choose one")
        //console.log(deviceids[3])
})





prompt.start();
 prompt.get(['device_id'], function (err, result) {
      
        console.log(result.device_id+" is your choice")

        User.find({"device_id":result.device_id},function(err,dat){
            if(err) throw err;

                var pdat = JSON.parse(JSON.stringify(dat))
                var e1 = 0,
                    e2=0,
                    e3=0,i=0,e4=0,e5=0
                _.forEach(pdat,function(jdat){
                    
                        e1 = e1 + parseInt(jdat.e1,0)
                        e2 = e2 + parseInt(jdat.e2,0)
                        e3 = e3 + parseInt(jdat.e3,0)
                        e4 = e4 + parseInt(jdat.e4,0)
                        e5 = e5 + parseInt(jdat.e5,0)
                        i =i+1
                })
                console.log("no.of devices with selected id are "+i)
               
                var sumArray = []
                sumArray.push('sum',e1,e2,e3,e4,e5)
                
                var av1 = _.divide(e1, i);
                var av2 = _.divide(e2, i);
                var av3 = _.divide(e3, i);
                var av4 = _.divide(e4, i);
                var av5 = _.divide(e5, i);
                
                var avArray=[]
                avArray.push('avg',av1,av2,av3,av4,av5)
                
                var arrOfVals1 = [];
                var arrOfVals3 = [];
                var arrOfVals4 = [];
                var arrOfVals5 = [];
                var arrOfVals2 = [];
                
                 _.forEach(pdat,function(jdat){
                   
                        e1 =  parseInt(jdat.e1,0)
                        arrOfVals1.push( jdat.e1 );

                        e2 =  parseInt(jdat.e2,0)
                        arrOfVals2.push( jdat.e2 );

                        e3 =  parseInt(jdat.e3,0)
                        arrOfVals3.push( jdat.e3 );

                        e4 =  parseInt(jdat.e4,0)
                        arrOfVals4.push( jdat.e4 );

                        e5 =  parseInt(jdat.e5,0)
                        arrOfVals5.push( jdat.e5 );
                   
                })
               
            //MAX
                var maxe1 =  _.max(arrOfVals1);
                var maxe3 =  _.max(arrOfVals3);
                var maxe2 =  _.max(arrOfVals2);
                var maxe4 =  _.max(arrOfVals4);
                var maxe5 =  _.max(arrOfVals5);
              

                var maxArray =[]
                maxArray.push('max',maxe1,maxe2,maxe3,maxe4,maxe5)

            //MIN
                var mine1 =  _.min(arrOfVals1);
                var mine2 =  _.min(arrOfVals2);
                var mine3 =  _.min(arrOfVals3);
                var mine4 =  _.min(arrOfVals4);
                var mine5 =  _.min(arrOfVals5);
                var minArray = []
                minArray.push('min',mine1,mine2,mine3,mine4,mine5)

            // MEDIAN
                var med1 =   stats.median(arrOfVals1)
                var med2 =   stats.median(arrOfVals2)
                var med3 =   stats.median(arrOfVals3)
                var med4 =   stats.median(arrOfVals4)
                var med5 =   stats.median(arrOfVals5)

                var medArray=[]
                medArray.push('med',med1,med2,med3,med4,med5)
               
            //MODE
                var mode1 = stats.mode(arrOfVals1)
                var mode2 = stats.mode(arrOfVals2)
                var mode3 = stats.mode(arrOfVals3)
                var mode4 = stats.mode(arrOfVals4)
                var mode5 = stats.mode(arrOfVals5)

                var modeArray =[]
                modeArray.push('mode',mode1,mode2,mode3,mode4,mode5)
               
            var values = [
                sumArray,avArray,maxArray,minArray,medArray,modeArray
            ];
            console.table(['fn', 'e1','e2','e3','e4','e5'], values);

            
    });
});

module.exports = User;