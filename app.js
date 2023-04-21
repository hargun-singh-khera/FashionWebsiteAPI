const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://Hargun_EBooksLibray:VCW1dyrFmoecISep@cluster0.9mmezhn.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');


var db;

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(express.json())
app.use(cors());




//home route or first default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})

app.get('/books', (req,res)=> {
    db.collection('books').find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

app.get('/books/type/:type', (req,res)=> {
    let type = req.params.type;
    db.collection('books').find({"type": type}).toArray((err,result)=> { 
        if (err) throw err;
        res.send(result);
    })
})

app.get('/books/:title', (req,res)=> {
    let title = req.params.title;
    console.log(title)
    db.collection('books').find({"title": title}).toArray((err,result)=> { 
        if (err) throw err;
        res.send(result);
    })
})

app.get('/api/auth/register', (req,res)=> {
    db.collection('users').find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
        // res.json(req.body)
    })
    
})
app.post('/api/auth/register', (req,res)=> {
    const data = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    console.log(data)
    db.collection('users').insertOne(data, (err, result)=> {
        if(err) throw err
        // res.send('Success')
    })
    // res.send('Success')
})

// connect with mongodb
MongoClient.connect(mongoUrl,(err,client)=> {
    if (err) console.log("Error while establishing connection");
    db = client.db('EBooksLibrary');
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    })
});
