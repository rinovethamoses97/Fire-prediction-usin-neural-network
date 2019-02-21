var express=require("express");
var app=express();
var cors=require("cors");
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});
app.listen(3000,function(req,res){
    console.log("Server running in the port 3000");
})