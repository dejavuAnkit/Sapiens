const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const config = require('./app.config');
const app = new express();
const routes = require('./routes');

const uploadModel = require("./model/upload");
const port = config.PORT;
const DB_URL = config.DB_URL;


// Settings CORS FILTERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});




const DIR = path.join(__dirname,'./public/');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post('/api/v1/upload', upload.single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const prdImage = url + '/images/' + req.file.filename;
  var uploadStruct = new uploadModel({
    email: req.body.author || '',
    postid: req.body.id || '',
    path: prdImage
  })
  uploadStruct.save((err, dbRes)=>{
    if(err){
      return res.json({error: 'There was some error uploading the file'})
    }
    return  res.json({message:'uploaded', path: prdImage}); 
  })
 
})



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Prefilghted requests
app.use((req, res, next)=>{
    if(req.method==='OPTIONS')
    return res.send();
    next();
})

// Routes


app.use('/api', routes)
app.use('/images',express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname, "dist")));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'),               function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(port, ()=> {
    console.log(`Server is started at port no ${port}`);
    console.log('Attempting to connect to database....', DB_URL);

    mongoose.connect(DB_URL, {useNewUrlParser: true}, (err)=>{
        if(err){
            console.log('Error connecting to database', err);
            return;
        }
        console.log('Connected to the Assignment database');
    })

})