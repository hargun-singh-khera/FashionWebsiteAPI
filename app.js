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


app.get('/men', (req,res)=> {
    db.collection('men').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/women', (req,res)=> {
    db.collection('women').find().toArray((err,result)=> {
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

app.get('/women/product/:id', (req,res)=> {

    let id = Number(req.params.id);
    db.collection('location').find({"location_id": id}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.delete('/deleteorder', (req,res)=> {
    db.collection('orders').remove({},(err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.delete('/deleteorder/:id',(req,res)=> {
    var id = Number(req.params.id);
    db.collection('orders').remove({id:id},(err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.post('/placeorder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order placed");
    })
})

app.post('/shoppingcart',(req,res)=>{
    db.collection('cart').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Product has been added to cart successfully");
    })
})

app.post('/userwishlist',(req,res)=>{

    db.collection('wishlist').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Wishlist has been updated successfully");
    })
})

// app.post('/postorder',(req,res)=>{
//     // console.log(req.body);
//     // res.send('ok')
//     db.collection('orders').insertOne(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send("Appointment Booked");
//     })
// })



app.post('/serviceArray',(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    db.collection('services').find({id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updatestatus/:id', (req, res)=>{
    var id = Number(req.params.id);
    db.collection('orders').update(
        {id: id},
        {
            $set: {
                "date": req.body.date,
                "bank": req.body.bank,
                "bank_status": req.body.bank_status,
                "status":"Booked"
            }
        }
    )
    res.send("Data Updated");
})


//query params example city w.r.t state
app.get('/city', (req,res)=> {
    var query = {};
    // console.log(req.query.city);
    if(req.query.city && req.query.feature) {
        query = {state_id: Number(req.query.city),feature: Number(req.query.feature)};
    } 
    db.collection('location').find(query).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
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

