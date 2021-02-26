import express from 'express';
import cors from 'cors';
import Mongo from 'mongodb';
import bodyParser from 'body-parser';
const MongoClient = Mongo.MongoClient;
const port = 8900;
const app = express();
let mongourl = "mongodb://localhost:27017";
var db;
var ObjectId = Mongo.ObjectId;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(mongourl, (err, client) => {
    if (err) throw err;
    db = client.db("dbms");
    app.listen(port, (err) => {
        if (err) console.log(err);
        console.log(`Server running on port ${port}`);
    });
});

const val = "Welcome to NYC";
app.get('/', (req, res) => {
    res.send(val);
});

app.get('/welcome', (req, res) => {
    db.collection("user").find({ name: req.query.name }).toArray(function (err, result) {
        if (err) console.log(err);
        res.send(result);
    });
});

app.post('/addUser', (req, res) => {
    var userData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "address": req.body.address
    }
    db.collection('user').insertOne(userData, (err, result) => {
        if (err) throw err;
        res.send("document inserted");
    });
});
app.get('/showUser', (req, res) => {
    db.collection('user').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//delete user based on id
app.delete('/deleteUser', (req, res) => {
    console.log(req.query._id)
    db.collection('user').deleteOne({_id: ObjectId(req.query._id)}, (err, result) => {
        
        if (err) throw err;
        res.send("deleted");
    });
});
//update user based on names
app.put('/:id/updateUser', (req, res) => {
    db.collection('user').updateOne({ _id : ObjectId(req.params.id)},
        {
            $set: {
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address
            }
        }, (err, result) => {
            if (err) throw err;
            res.send("updated");
        });
});
//get data based on id
// app.get('/:id/getUser',(req,res)=>{
//     db.collection('user').find({ _id : ObjectId(req.params.id)}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })
