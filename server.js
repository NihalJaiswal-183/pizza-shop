const express =require("express");
const ejs =require("ejs");
// const expresslayouts=require("express-ejs-layouts");
const app=express();
const path=require("path");
const PORT=process.env.PORT || 3000;
app.set("views",path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.render('home');
})
app.listen(PORT,()=>{
    console.log("app is running at port "+PORT)
});   
