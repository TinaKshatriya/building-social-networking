const express=require('express');
const mongoose=require('mongoose');
const expressValidator = require('express-validator');
const app =express();
var cookieParser = require('cookie-parser')
const dotenv=require('dotenv');
const morgan=require('morgan');
const cors=require("cors");
const fs=require("fs");
const bodyParser=require('body-parser');


dotenv.config();
 
//db connection
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useCreateIndex: true }).then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', error => {
  console.log(`DB connection error: ${error.message}`)
})

//bring in route

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// apiDocs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"unauthorized"});
  }
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log(`A node js is listening on port:${port}`);
});
