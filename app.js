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

app.get('/products/:department', (req,res)=> {
    let department = req.params.department;
    db.collection('products').find({"department": department}).toArray((err,result)=> { 
        if (err) throw err;
        res.send(result);
    })
})

app.get('/products/:department/:id', (req,res)=> {
    let department = req.params.department;
    let id = Number(req.params.id);
    db.collection('products').find({$and: [{"product_id": id},{"department": department}]}).toArray((err,result)=> {
        if (err) throw err;
        res.send(result);
    })
})

app.put('/updateProductRating/:id', (req,res)=> {
    let id = Number(req.params.id);
    let rating = req.body.rating;
    db.collection('products').updateOne(
        {"product_id": id}, {
            $set: {
                "rating": rating
            }
        }
    )
    res.send("Data updated")
})

app.put('/updateProductPrice/:id', (req,res)=> {
    let id = Number(req.params.id);
    let price = req.body.price;
    db.collection('products').updateOne(
        {"product_id": id}, {
            $set: {
                "price": price
            }
        }
    )
    res.send("Data updated")
})

app.put('/updateProductAvailability/:id', (req,res)=> {
    let id = Number(req.params.id);
    let availability = req.body.availability;
    db.collection('products').updateOne(
        {"product_id": id}, {
            $set: {
                "availability": availability
            }
        }
    )
    res.send("Data updated")
})

app.post('/findproduct', (req,res)=> {
    db.collection('products').find({"product_id": {$in:req.body}}).toArray((err,result)=> {
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
    db.collection('orders').insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order placed");
    })
})

app.put('/updateOrderStatus/:id', (req,res)=> {
    var id = Number(req.params.id);
    db.collection('orders').updateOne(
        {product_id:id}, {
            $set: {
                "status": "Booked"
            }
        }
    )
    res.send("Data Updated")
})

app.delete('/deleteorder', (req,res)=> {
    db.collection('orders').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send("All orders has been deleted successfully");
    })
})

app.delete('/deleteorder/:id',(req,res)=> {
    let id = Number(req.params.id);
    db.collection('orders').deleteOne({"product_id":id},(err,result)=> {
        if (err) throw err;
        res.send("Some orders has been deleted from your account");
    })
})

app.get('/cart',(req,res)=> {
    db.collection('cart').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/insertToCart',(req,res)=>{
    db.collection('cart').insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Product has been added to cart successfully");
    })
})

app.delete('/emptyCart',(req,res)=> {
    db.collection('cart').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send("All cart items have been deleted successfully");
    })
})

app.delete('/emptyCart/:id', (req,res)=> {
    let id = Number(req.params.id);
    db.collection('cart').deleteOne({"product_id":id},(err,result)=> {
        if (err) throw err;
        res.send("Some cart items has been deleted successfully");
    })
})

app.get('/wishlist',(req,res)=> {
    db.collection('wishlist').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/insertToWishlist',(req,res)=>{
    db.collection('wishlist').insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Wishlist has been updated successfully");
    })
})

app.delete('/emptyWishlist/:id',(req,res)=> {
    let id = Number(req.params.id);
    db.collection('wishlist').deleteOne({"product_id":id},(err,result)=> {
        if (err) throw err;
        res.send("Some wishlist item has been deleted successfully");
    })
})

app.delete('/emptyWishlist',(req,res)=> {
    db.collection('wishlist').deleteMany({},(err,result)=> {
        if (err) throw err;
        res.send("All wishlist items have been deleted successfully");
    })
})

app.get('/costfilter', (req,res) => {
    let query = {};
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.lcost && req.query.hcost)
    {
        query = {$and: [{"price":{$gte:lcost,$lte:hcost}}]}
    }
    db.collection('products').find(query).toArray((err,result)=> {
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

