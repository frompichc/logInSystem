const express = require('express')
const mongoose = require('mongoose')
var bodyParser=require("body-parser");
const app=express()
const userRouter = require('./controllers/userController')
//const loginRouter = require('./controllers/loginController')

//Allows read requeste body
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static('views'));
app.use(express.static('public'));

app.use('/register-user', userRouter);

app.get('/', (req,res)=>{
    res.sendFile(__dirname + 'views/index.html')
})

//Starts the server on port 3000
const port=3000
app.listen(port, () => {
    console.info(`Server running on port: ${port}`)
}) 

mongoose.connect(
"mongodb+srv://fredyrompich:Guatemala1.@hablemos.whodozj.mongodb.net/?retryWrites=true&w=majority&appName=hablemos")
.then(() => {
    console.info("DB Connected")
})
.catch(error => {
    console.info("Error connecting to MongoDB", error)
})