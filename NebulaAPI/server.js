const express = require('express');
const hbs=require('hbs'); //Template engine used
const bodyParser = require('body-parser');
const _ = require('lodash');
var data = require('./mock');
const token = require('./token');
const request = require('request');
const uuid = require('uuid');
const crypto = require('crypto');
function generateParameter(parameters){
    let ordered = {};
    Object.keys(parameters).sort().forEach(function(key) {
        ordered[key] = parameters[key];
    });
    let encodedParameters = '';
    for (k in ordered) {
    const encodedValue = escape(ordered[k]);
    const encodedKey = encodeURIComponent(k);
    if(k==='q'){
        encodedParameters += "&q="+encodedValue;
    }
    else if(encodedParameters === ''){
        encodedParameters +=     encodeURIComponent(`${encodedKey}`)+"="+encodeURIComponent(`${encodedValue}`);
    }
    else{
    encodedParameters += "&"+encodeURIComponent(`${encodedKey}`)+"="+encodeURIComponent(`${encodedValue}`);
    }
    }
    return encodedParameters;
}
function generateSigningKey(){
    return encodeURIComponent(token.oauth_consumer_secret)+"&"+encodeURIComponent(token.oauth_token_secret);
}
function generateSignature(parameters){
    var parameterString = generateParameter(parameters);
    var baseUrl = 'https://api.twitter.com/1.1/search/tweets.json';
    var DST = "GET&";
    DST += encodeURIComponent(baseUrl)+"&";
    DST += encodeURIComponent(parameterString);
    var sign_key = generateSigningKey();
    return crypto.createHmac("sha1", sign_key).update(DST).digest().toString('base64');;
}
function generate(parameters){
    let ordered = {};
    Object.keys(parameters).sort().forEach(function(key) {
        ordered[key] = parameters[key];
    });
    let encodedParameters = '';
    for (k in ordered) {
    const encodedValue = escape(ordered[k]);
    const encodedKey = encodeURIComponent(k);
    if(k==='q'|| k==='oauth_signature'){
        encodedParameters += ", "+k+"="+'"'+encodedValue+'"';
    }
    else if(encodedParameters === ''){
        encodedParameters +=     encodeURIComponent(`${encodedKey}`)+"="+'"'+encodeURIComponent(`${encodedValue}`)+'"';
    }
    else{
    encodedParameters += ", "+encodeURIComponent(`${encodedKey}`)+"="+'"'+encodeURIComponent(`${encodedValue}`)+'"';
    }
    }
    return "OAuth "+encodedParameters;
}
var port=3000;
var app=express();
app.use(bodyParser.json()); //don't do JSON.stringify in frontend
app.use( express.static(__dirname + '/../NebulaUI/dist/NebulaUI' ) );
app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname + '/../NebulaUI/dist/NebulaUI/index.html');
});

app.post('/api/search',(req,res)=>{
    var queryParameters = {
        q: req.body.query
    }
    var oauth_timestamp = Math.floor(Date.now() / 1000);
    var oauth_nonce = uuid.v1(); 
    var parameters = {
        ...queryParameters,
        oauth_consumer_key:token.oauth_consumer_key,
        oauth_token : token.oauth_token,
        oauth_signature_method:"HMAC-SHA1",
        oauth_timestamp: oauth_timestamp,
        oauth_nonce: oauth_nonce,
        oauth_version:"1.0"
    }
    var oauth_signature = generateSignature(parameters);
    var parameters2 = {
        ...parameters,
        oauth_signature : oauth_signature
    }
    var auth = generate(parameters2);
    console.log('GET '+'https://api.twitter.com/1.1/search/tweets.json?q='+req.body.query);
    request({url:'https://api.twitter.com/1.1/search/tweets.json?q='+req.body.query,headers:{
        "Authorization": auth
    }},(error,response,body)=>{
        // console.log(error);
        // console.log(response);
        // console.log(body);
        console.log('fetched');
        console.log(response.statusCode,oauth_timestamp);
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            var resultSet=info.statuses.map((data)=>{
                return {
                    "heading":"",
                    "content":data.text,
                    "user":{
                        "name":data.user.name,
                        "screen_name":data.user.screen_name
                    }
                }
            });
            var returnData = {
                "results":resultSet,
                "metadata":info.search_metadata
            }
            res.send(returnData),(e)=>{
                res.status(400).send(e);
            }
          }
    });
});
app.listen(port,()=>{
    console.log(`Server running on PORT ${port}`);
});