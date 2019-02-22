var express=require("express");
var fs=require('fs');
var app=express();
var cors=require("cors");
var bodyparser=require("body-parser");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});
app.post('/saveModel',function(req,res){
    fs.writeFile('./model.json',JSON.stringify(req.body),function(err){
        if(err){
            console.log("File Writing Failed");
            return;
        }
        res.send("success");
    })
}); 
app.listen(3000,function(req,res){
    console.log("Server running in the port 3000");
})