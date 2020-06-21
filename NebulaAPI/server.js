const express = require('express');
const hbs=require('hbs'); //Template engine used
const bodyParser = require('body-parser');
const _ = require('lodash');
var data = require('./mock');

var port=3000;
var app=express();
app.use(bodyParser.json()); //don't do JSON.stringify in frontend
console.log(__dirname);
app.use( express.static(__dirname + '/../NebulaUI/dist/NebulaUI' ) );
app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname + '/../NebulaUI/dist/NebulaUI/index.html');
});
app.post('/api/search',(req,res)=>{
    console.log(req.body);
    //do something with request
    var returnData = data.RESULTS;//set returnData
    res.send(returnData),(e)=>{
        res.status(400).send(e);
    }
});
app.listen(port,()=>{
    console.log(`Server running on PORT ${port}`);
});