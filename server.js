const express =require("express");
const ejs =require("ejs");
const expresslayout=require("express-ejs-layouts");
const app=express();
const path=require("path");
const PORT=process.env.PORT || 3000;
app.set("views",path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.use(expresslayout);
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.render('home');
})
app.get("/cart",(req,res)=>{
    res.render('customer/cart');
})
app.get("/login",(req,res)=>{
    res.render('auth/login');
})
app.get("/register",(req,res)=>{
    res.render('auth/register');
})
app.listen(PORT,()=>{
    console.log("app is running at port "+PORT)
});   