const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;

const connectionString = "mongodb+srv://testapp:testapp@cluster0-phjwt.gcp.mongodb.net/test";
const databaseName = "admin";
var app = Express();
app.use(BodyParser.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
var database;

const mongo = require('mongodb');


const port = 3000;
//localhost URL
const mongo_uri = 'mongodb://localhost:27017/';
//online URL
 //const mongo_uri = 'mongodb+srv://testapp:testapp@cluster0-phjwt.gcp.mongodb.net/test';

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/', (req, res) => {
   var token = req.body.token;
  jwt.verify(token, 'supersecret', function (err, decoded) {
    if (!err) {
      MongoClient.connect(mongo_uri, { useNewUrlParser: true })
      .then(client => {
        const db = client.db('bytesclub');
        collection = db.collection('admin');
        collection.find({}).toArray().then(response => res.json({ token: token, status: 200 })).catch(error => console.error(error));        
      });    

    } else {
      res.status(500).json({ error: err.message, status: 204 })
    }

});
});

app.post ('/viewevent',(req,res)=>{
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.find({ _id:  ObjectID(req.body.id )}).toArray().then(function (response) {
        if (response[0]) {    
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ response }));     
        } else {          
        }
      }).catch(error => console.error(error));
    });

});

app.post ('/viewcategory',(req,res)=>{
  var req;
  var res;
  var category= req.body.id;
  //var token = req.body.token;
  // jwt.verify(token, 'supersecret', function (err, decoded) {
  //   if (!err) {
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.find({ key: 'event', category: category  }).toArray().then(function (response) {
        if (response[0]) {    
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ response, status: 200 }));     
        } else {          
        }
      }).catch(error => console.error(error));
    
    // });
  // }
  // else {
  //   res.status(204).json({ error: err.message, status: 204 })
  // }
    });

});

app.post ('/eventlist',(req,res)=>{
  var req;
  var res;
  //var token = req.body.token;
  // jwt.verify(token, 'supersecret', function (err, decoded) {
  //   if (!err) {
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.find({ key: 'event' }).toArray().then(function (response) {
        if (response[0]) {    
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ response, status: 200 }));     
        } else {          
        }
      }).catch(error => console.error(error));
    
    // });
  // }
  // else {
  //   res.status(204).json({ error: err.message, status: 204 })
  // }
    });

});

app.post ('/filterevent',(req,res)=>{
  var req;
  var res;
  var category= req.body.category;
  var token = req.body.token;
  // jwt.verify(token, 'supersecret', function (err, decoded) {
  //   if (!err) {
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.find({ key: 'event', category: category }).toArray().then(function (response) {
        if (response[0]) {    
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ response,token: token, status: 200 }));     
        } else {          
        }
      }).catch(error => console.error(error));
    
    // });
  // }
  // else {
  //   res.status(204).json({ error: err.message, status: 204 })
  // }
    });

});

app.post('/login', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.find({ key: 'login',"username":req.body.login.username,"password":req.body.login.password }).toArray().then(function (response) {
        if ( response[0] && response[0].username == req.body.login.username && response[0].password == req.body.login.password) {
          var token = jwt.sign({ username: req.body.login.username }, 'supersecret', { expiresIn: 10000 });          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ token: token, status: 200 })); 
        } else {
          res.json({ message: "Invalid credentials", status: 204 });
        }
      }).catch(error => console.error(error));
    });

});

app.post('/userlength', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub'); 
      const collection = db.collection('admin');
      collection.find({ key: 'login' }).toArray().then(function (response) {
        if (response) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ response }));   
        }
      }).catch(error => console.error(error));
    });
  
});
app.post('/register', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      const db = client.db('bytesclub'); 
      const collection = db.collection('admin');
      collection.insertOne({ key: 'login',username:req.body.login.username,password:req.body.login.password,userId:req.body.login.userId }).then(function (response) {
        if (true) {
          var token = jwt.sign({ username: req.body.login.username }, 'supersecret', { expiresIn: 10000 });
          res.json({ token: token, status: 200 });
        } else {
          res.json({ message: "Invalid credentials", status: 204 });
        }
      }).catch(error => console.error(error));
    });

});



app.post('/updateUser', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      var value = req.body.updateData.value;
      var field = req.body.updateData.field;
      var obj = { [field]: value };
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      var myquery = { '_id': ObjectID(req.body.updateData._id) };
      var newvalues = { $set: obj };
      collection.updateOne(myquery, newvalues).then(function (response) {
      }).catch(error => console.error(error));
    });

});

app.post('/update', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
      var value = req.body.updateData.value;
      var field = req.body.updateData.field;
      var index = req.body.updateData.rowIndex;
      var obj = { "monthData": { "amount": req.body.updateData.data.monthData[index].amount, "balance": req.body.updateData.data.monthData[index].balance, "date": req.body.updateData.data.monthData[index].date } };
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      var myquery = { '_id': ObjectID(req.body.updateData._id), 'monthData.date': req.body.updateData.data.date };
      var newvalues = { $set: { "monthData.$.balance": value } };
      collection.updateOne(myquery, newvalues).then(function (response) {
      }).catch(error => console.error(error));
    });

});

app.post('/newevent', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(function (client) {
      var data = req.body.addData;
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      collection.insertOne(data).then(function (response) {
        if (response) {
          res.json({  status: 200 });
        }
      }).catch(error => console.error(error));
    });
});

app.post('/addrent', (req, res) => {
  var req;
  var res;
  MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(function (client) {
      var data = req.body.addRentData;
      var value = 1000;
      var field = 'rent';
      var obj = { "monthData": { "amount": req.body.addRentData.monthData[0].amount, "balance": req.body.addRentData.monthData[0].balance, "date": req.body.addRentData.monthData[0].date, "amountreceiveddate": req.body.addRentData.monthData[0].amountreceiveddate, "ebamount": req.body.addRentData.monthData[0].ebamount } };
      const db = client.db('bytesclub');
      const collection = db.collection('admin');
      var myquery = { '_id': ObjectID(req.body.addRentData.username) };
      var newvalues = { $addToSet: Object(obj) };
      collection.update(myquery, newvalues).then(function (response) {
        res.status(200).json(response);
      }).catch(error => console.error(error));
    });
});

app.post('/admin', (req, res) => {
  var req;
  var res;
  var token = req.body.token;
  jwt.verify(token, 'supersecret', function (err, decoded) {
    if (!err) {

      MongoClient.connect(mongo_uri, { useNewUrlParser: true })
        .then(client => {
          const db = client.db('bytesclub');
          const collection = db.collection('admin');
          collection.find({ key: 'user' }).toArray().then(function (response) {
            if (response) {
              res.status(200).json(response);
            }
          }).catch(error => console.error(error));
        });

    } else {
      res.status(500).json({ error: err.message, status: 204 })
    }
  })
});


app.listen(port, () => console.info(`REST API running on port ${port}`));