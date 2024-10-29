const {Schema}= require('mongoose')
const mongoose=require('mongoose')
const taskshema= new Schema({
    taskname:{type:String,required:true},
    description:String,
    start_time_hour:String,
    start_time_min:String,
    priority:String,
    taskdate:Date,
    duration:String,
    period:String
})
 module.exports=mongoose.model('task',taskshema)
