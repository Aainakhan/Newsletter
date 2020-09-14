const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("requests");
const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){

 res.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req , res){
var fname = req.body.fname;
var lname = req.body.lname;
var email = req.body.email;

const data = {
 members : 
 [
   {
     email_address : email,
     status : "subscribed",
     merge_fields :
     {
      FNAME : fname,
      LNAME : lname
     }
   }
 ]
};

const url = "https://us2.api.mailchimp.com/3.0/lists/2999fd92f4"
const jsonData =  JSON.stringify(data);

const options = {
 method : "POST",
 auth : "aaina:434331fc7eb3884420c0d938510cc92e-us2"
}

const request = https.request(url,options,function(response){

 if(response.statusCode === 200)
 {
  res.sendFile(__dirname+"/success.html")
 }
 else
 {
  res.sendFile(__dirname+"/failure.html")
 }
response.on("data",function(data){
console.log(JSON.parse(data));
})

})

//request.write(jsonData);
request.end();
})

app.post("/failure",function(req,res){
 res.redirect("/");
})


app.listen("3000",function(){
 console.log("Server is running at port 3000");
})


//434331fc7eb3884420c0d938510cc92e-us2
//2999fd92f4