const {Schema}= require('mongoose')
const mongoose=require('mongoose')
const uri = "mongodb+srv://filexmbogo:filexmbogo.691@cluster0.rff4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create Mongoose connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const taskshema= new Schema({
    taskname:{type:String,required:true},
    description:String,
    start_time_hour:String,
    start_time_min:String,
    period:String,
    priority:String,
    taskdate:Date,
    duration:String

})
 module.exports=mongoose.model('task',taskshema)
