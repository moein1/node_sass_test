const express = require('express');
const path = require('path');
const testFunction = require('./function/test');

var app = express();
app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
    testFunction();
    res.sendFile(path.join(__dirname,'views/index.html'));
})

const port = 5000;

app.listen(5000,()=>{
    console.log('we are listening on port : ',port);
})