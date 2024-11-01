const express= require('express')
const mongoose=require('mongoose')
const path= require('path')
const app= express()
const multer=require('multer')
const upload=multer()
//
const port=process.env.port||3000
//
let tasks
const uri = "mongodb+srv://filexmbogo:filexmbogo.691@cluster0.rff4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create Mongoose connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const taskmodel=require('./src/models/tasks')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'src/public')))
app.set('views','./views')
app.set('view engine','ejs')
//

app.get('/',(req,res)=>{
    res.render('index',{tasks})
})
app.get('/tasks',async (req,res)=>{ 
    let tasks=await taskmodel.find()
    
console.log(tasks)
    res.json(tasks)
})
app.post('/tasks',upload.none(), async (req,res)=>{
    const new_task=new taskmodel()
    const date =new Date()
    const{name,description,hours,minutes,duration,priority,period}=req.body
    new_task.taskname=name
    new_task.description=description
    new_task.start_time_hour=hours
    new_task.start_time_min=minutes
    new_task.taskdate=Date.now()
    new_task.duration=duration
    new_task.priority=priority
    new_task.period=period
    await new_task.save()
    console.log(period);

    res.sendStatus(200)
})

app.listen(port,()=>{console.log(`server listening on port ${port}`);
})