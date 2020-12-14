const express = require("express");
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended:true}));


app.use('/api/sign', require('./routes/signRoutes'));
app.use('/api/todo', require('./routes/todoRoutes'));

const PORT = config.get('port') || 5000;

async function start(){
    try{
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });
        app.listen(PORT, () =>{
            console.log(`server has been started on ${PORT}`);
        })
    }
    catch(err){
        console.log(err);
    }
}

start();


