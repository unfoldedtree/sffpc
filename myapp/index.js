const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
});

const caseSchema = new mongoose.Schema({
  
  seller: String,
  caseName: String,
  image: String,
  style: String,
  caseLength: String,
  caseWidth: String,
  caseHeight: String,
  caseVolume: String,
  cpuCooler: String,
  aio: String,
  gpuRiser: String,
  gpuLength: String, 
  gpuWidth: String, 
  pcieSlot:   String,
  lpPcieSlot:  String,
  motherboard:  String,
  psu:  String,
  ssdDrive:  String,
  hddDrive:  String,
  diskDrive:  String,
  usb2:  String,
  usb3:  String,
  usbC:  String,
  usbType:  String,
  audioJack:  String,
  priceCNY:  String,
  priceUSD:  String

});

const testSchema = new mongoose.Schema({});

mongoose.connect('mongodb://localhost/cases', {useNewUrlParser: true, useUnifiedTopology: true});
const Case = mongoose.model('Case', testSchema, 'Case');

app.get('/', function (req, res) {
  Case.find({}, function(err,collection){ 
    if (err) {
      console.log(err)
    }
    else {
      //console.log(collection)
    //var result = collection['0']['_doc'];
    res.send("Welcome to the SFF Case API!")
    }
  });

 
});

//Select All
app.get('/all', function (req, res) {
  Case.find({},'_id seller caseName caseVolume cpuCooler gpuLength', function(err,collection){ 
    if (err) {
      console.log(err)
    }
    else if (collection.length === 0) {
      res.send("NO RESULTS FOUND")
    }
    else {
      //console.log(collection)
    //var result = collection['0']['_doc'];
    res.send(collection)
    }
  });
})

// Select based off of id
app.get('/id/:id', function (req, res) {
  Case.find({_id: req.params.id}, function(err,collection){ 
    if (err) {
      console.log(err)
    }
    else if (collection.length === 0) {
      res.send("NO RESULTS FOUND")
    }
    else {
    //console.log(collection)
    res.send(collection)
    }
  });
})

// Select based off of seller
app.get('/seller/:seller', function (req, res) {
  Case.find({seller: { "$regex": req.params.seller, "$options": "i" }}
  ,'_id seller caseName caseVolume cpuCooler gpuLength', function(err,collection){ 
    if (err) {
      console.log(err)
    }
    else if (collection.length === 0) {
      res.send("NO RESULTS FOUND")
    }
    else {
    //console.log(collection)
    res.send(collection)
    }
  });
})

// Select based off of case name
app.get('/case/:caseName', function (req, res) {
    Case.find({caseName: { "$regex": req.params.caseName, "$options": "i" }}
    ,'_id seller caseName caseVolume cpuCooler gpuLength', function(err,collection){ 
      if (err) {
        res.send(err)
      }
      else if (collection.length === 0) {
        res.send("NO RESULTS FOUND")
      }
      else {
      //console.log(collection)
      // var result = collection['0']['_doc'];
      res.send(collection);
      }
    });  
  })

  app.get('/:seller/:caseName', function (req, res) {
    Case.find({seller: { "$regex": req.params.seller, "$options": "i" },caseName: { "$regex": req.params.caseName, "$options": "i" }}
    ,'_id seller caseName caseVolume cpuCooler gpuLength', function(err,collection){ 
      if (err) {
        console.log(err)
      }
      else if (collection.length === 0) {
        res.send("NO RESULTS FOUND")
      }
      else {
      //console.log(collection)
      res.send(collection)
      }
    });
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))