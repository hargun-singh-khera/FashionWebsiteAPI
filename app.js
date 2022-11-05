const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://Hargun_FEcommerce:hZwwLSHq6vks@cluster0.7rlmlbe.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
var db;

const port = process.env.PORT || 8495;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


//home route or first default route
app.get('/', (req, res) => {
    res.send("<h1>This is my first Express App</h1>");
})

app.get('/products/:men', (req,res)=> {
    let department = String(req.params.men);
    console.log(department)
    db.collection('products').find({"department": department}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/men/:id', (req,res)=> {
    
    let id = Number(req.params.id);
    db.collection('men').find({"product_id": id}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/products/:women', (req,res)=> {
    let department = String(req.params.women)
    console.log(department)
    db.collection('products').find({"department": department}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/women/:id', (req,res)=> {

    let id = Number(req.params.id);
    db.collection('women').find({"product_id": id}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.post('/findproduct', (req,res)=> {
    // console.log(req.body);
    // res.send(req.body)
    db.collection('products').find({product_id:{$in:req.body}}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})


app.get('/orders',(req,res)=> {
    db.collection('orders').find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

app.post('/placeorder',(req,res)=>{
    db.collection('orders').insertMany(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order placed");
    })
})

app.delete('/deleteorder', (req,res)=> {
    db.collection('orders').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.delete('/deleteorder/:id',(req,res)=> {
    let id = Number(req.params.id);
    db.collection('orders').deleteOne({id:id},(err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/cart',(req,res)=> {
    db.collection('cart').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/inserttocart',(req,res)=>{
    db.collection('cart').insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Product has been added to cart successfully");
    })
})

app.delete('/emptycart',(req,res)=> {
    db.collection('cart').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.delete('/emptycart/:id', (req,res)=> {
    let id = Number(req.params.id);
    db.collection('cart').deleteOne({id:id},(err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/wishlist',(req,res)=> {
    db.collection('wishlist').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/inserttowishlist',(req,res)=>{
    db.collection('wishlist').insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Wishlist has been updated successfully");
    })
})

app.delete('/emptywishlist/:id',(req,res)=> {
    let id = Number(req.params.id);
    db.collection('wishlist').deleteOne({id:id},(err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.delete('/emptywishlist',(req,res)=> {
    db.collection('wishlist').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})


//connect with mongodb
MongoClient.connect(mongoUrl,(err,client)=> {
    if (err) console.log("Error while establishing connection");
    db = client.db('FashionWebsite');
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    })
});

