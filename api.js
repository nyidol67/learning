import express from 'express';
import cors from 'cors';
import Mongo from 'mongodb';
import bodyParser from 'body-parser';
//import {format } from 'date-fns';
const MongoClient = Mongo.MongoClient;
const port = 8900;
const app = express();
let mongourl = "mongodb://localhost:27017";
var db;
var ObjectId = Mongo.ObjectId;

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const config = { 'secret': 'supersecret' }

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true
}));

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
//creating a document in a collections as well as registering new user.
app.post('/addUser', (req, res) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var userData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "address": req.body.address,
        "mailid": req.body.mailid,
        "hobbies":req.body.hobbies,
        "password": hashedPassword,
        
    }
    db.collection('user').insertOne(userData, (err, result) => {
        if (err) res.status(500).send("There was a problem registering the user.");
        res.send("data created");
    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("you need to first log in");
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({
                    auth: false,
                    message: "you failed to authenticate"
                })
            } else {
                res.userId = decoded.id;
                next();
            }
        })
    }
}
app.get('/showUser', verifyJWT, (req, res) => {
    db.collection('user').find({ _id: ObjectId(res.userId) }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);

    });
});

app.put('/changePassword', verifyJWT, (req, res) => {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let newHashedPassword = bcrypt.hashSync(newPassword, 8);
    db.collection('user').find({ _id: ObjectId(res.userId) }).toArray((err, result) => {
        if (err) throw err;
        else {
            bcrypt.compare(oldPassword, result[0].password, (err, response) => {
                if (response) {
                    db.collection('user').updateOne({ _id: ObjectId(res.userId) }, {
                        $set: {
                            password: newHashedPassword
                        }
                    }, (err, result) => {
                        if (err) throw err;
                        res.json({ isMatched: true, message: "password updated" })
                    }
                    )
                } else {
                    res.json({
                        isMatched: false,
                        message: "wrong old password"
                    })
                }
            })

        }
    })
})

//middleware for pagination.
const paginatedResults = (req, res, next) => {
    var total;
    const page = parseInt(req.query.pageIndex);
    const limit = parseInt(req.query.pageSize);
    db.collection('user').count((err,result)=>{
        if(err) throw err;
        total = result;
    })
    const startIndex = (page) * limit;
    
    let results= {};
    db.collection('user').find().skip(startIndex).limit(limit).toArray((err, result) => {
        if (err) throw err;
        page >= Math.ceil(total/limit) ? results.next = false :results.next = true;
        page <= 1 ? results.previous = false : results.previous = true;
        results.total = total;
        results.result = result;
        res.paginate = results;
        next();
    })   
}

app.get('/user', paginatedResults , (req, res) => {
    res.send(res.paginate);
    
})

app.get('/showUserAll', (req, res) => {
    db.collection('user').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);

    });

});

//delete user based on id
app.delete('/deleteUser', (req, res) => {
    console.log(req.query._id)
    
    db.collection('user').deleteOne({ _id: ObjectId(req.query._id) }, (err, result) => {

        if (err) throw err;
        res.send("deleted");
    });
});
//update user based on id
app.put('/:id/updateUser', (req, res) => {
    db.collection('user').updateOne({ _id: ObjectId(req.params.id) },
        {
            $set: {
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address,
                mailid: req.body.mailid,
                hobbies: req.body.hobbies
            }
        }, (err, result) => {
            if (err) throw err;
            res.send("updated");
        });
});
//get data based on id
app.get('/:id/getUser', (req, res) => {
    //console.log(ObjectId(req.params.id).getTimestamp());
    db.collection('user').find({ _id: ObjectId(req.params.id) }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
// app.get('/getUser/:mailid', (req, res) => {
//     db.collection('user').find({ mailid: req.params.mailid }).toArray((err, result) => {
//         if (err) throw err;
//         res.send(result);
//     })
// })
//Login authentication
app.post('/login', (req, res) => {
    const mailid = req.body.mailid;
    const password = req.body.password;
    db.collection('user').find({ mailid: mailid }).toArray((err, result) => {
        if (err) res.send({ err: err });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (response) {
                    const id = result[0]._id;
                    const token = jwt.sign({ id }, config.secret, {
                        expiresIn: 300,
                    })
                    res.json({
                        auth: true,
                        token: token,
                        result: result
                    });
                } else {
                    res.json({ auth: false, message: "Wrong Usernames/password Combination" })
                }
            })
        }
        else {
            res.json({ auth: false, message: "User doesnot exist" });
        }
    })
})