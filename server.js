require("dotenv").config();
const passport=require('passport');
const express = require("express");
const ejs = require("ejs");
const expresslayout = require("express-ejs-layouts");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.use(expresslayout);
app.use(express.static("public"));
app.use(express.json());
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
// database config
const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
const Connection = async () => {
  const URL = `mongodb://nihaljaiswal2:codeforinterview@blog-web-shard-00-00.z7lfc.mongodb.net:27017,blog-web-shard-00-01.z7lfc.mongodb.net:27017,blog-web-shard-00-02.z7lfc.mongodb.net:27017/BLOG-WEBSITE?ssl=true&replicaSet=atlas-z8ysjx-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};
Connection();



const MongoDbStore = require("connect-mongo");
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    store: MongoDbStore.create({
      mongoUrl:
        "mongodb://nihaljaiswal2:codeforinterview@blog-web-shard-00-00.z7lfc.mongodb.net:27017,blog-web-shard-00-01.z7lfc.mongodb.net:27017,blog-web-shard-00-02.z7lfc.mongodb.net:27017/BLOG-WEBSITE?ssl=true&replicaSet=atlas-z8ysjx-shard-0&authSource=admin&retryWrites=true&w=majority",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
//global declration
app.use((req,res,next)=>{
    console.log(req.session);
res.locals.session=req.session
res.locals.user=req.user
next();
})

require("./routes/web")(app);
app.use(flash());

app.listen(PORT, () => {
  console.log("app is running at port " + PORT);
});
