var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var connection=require('./model/database.js');
var connection=require('./model/database');

app.use(bodyParser.urlencoded({exteded:false}));
app.use(express.static(__dirname));

app.use('/signup',function(req,res){
    console.log('Signup Page');
    res.sendFile(__dirname+'/views/signup.html');
})

app.post('/check',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var add1=req.body.add1;
    var add2=req.body.add2;
    var city=req.body.city;
    var state=req.body.state;
    var zip=req.body.zip;
    var country=req.body.country;
    var radio=req.body.radio;
    if(add1===add2){
    connection.query('insert into Contact_Information values(?,?,?,?,?,?,?,?)',[fname,lname,add1,city,state,zip,country,radio],(err,results)=>{
        if(err){
            res.sendFile(__dirname+'/views/signup.html');
            throw err;
        }
        if(results){
            console.log("Values Inserted");
            res.send(
                `
                <h1>
                Hello ${fname}
                Your details,<br>
                ${lname}<br>
                ${add1}<br>
                are successfully inserted to our database.
                </h1>    
                `
            )
        }
    })
}
else{
    res.sendFile(__dirname+'/views/signup.html');
}
})

app.listen(1000,()=>{
    console.log("Server is running at the port 1000");
})
