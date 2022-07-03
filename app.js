// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// dotenv.config();
// const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
// const mongoUrl = process.env.MongoLiveUrl;
// const cors = require('cors');
// const bodyParser = require('body-parser');
// var db;

// const port = process.env.PORT || 8425;

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cors());

// //home route or first default route
// app.get('/', (req, res) => {
//     res.send("<h1>This is my first Express App</h1>");
// })


// app.get('/location', (req,res)=> {
//     db.collection('location').find().toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// app.get('/location/:id', (req,res)=> {
//     // converting string to int using es5
//     let id = parseInt(req.params.id);
//     // console.log(id);
//     // res.send("ok");
//     db.collection('location').find({"location_id": id}).toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// app.get('/services', (req,res)=> {
//     db.collection('services').find().toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// app.get('/services/:id', (req,res)=> {
//     // converting string to int using es6
//     let id = Number(req.params.id);
//     // console.log(id);
//     // res.send("ok");
//     db.collection('services').find({"id": id}).toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// app.get('/features', (req,res)=> {
//     db.collection('features').find().toArray((err,result)=> {
//         if(err) throw err;
//         res.send(result);
//     })
// })

// app.get('/appointment', (req,res)=> {
//     db.collection('orders').find().toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// // app.post('/placeorder',(req,res)=>{
// //     // console.log(req.body);
// //     // res.send('ok')
// //     db.collection('orders').insert(req.body,(err,result)=>{
// //         if(err) throw err;
// //         res.send("Order placed");
// //     })
// // })

// app.post('/postorder',(req,res)=>{
//     // console.log(req.body);
//     // res.send('ok')
//     db.collection('orders').insertOne(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send("Appointment Booked");
//     })
// })

// app.delete('/deleteorder', (req,res)=> {
//     db.collection('orders').remove({},(err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// app.delete('/deleteorder/:id',(req,res)=> {
//     var id = Number(req.params.id);
//     db.collection('orders').remove({id:id},(err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })


// app.post('/serviceArray',(req,res)=>{
//     // console.log(req.body);
//     // res.send(req.body)
//     db.collection('services').find({id:{$in:req.body}}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })

// app.put('/updatestatus/:id', (req, res)=>{
//     var id = Number(req.params.id);
//     db.collection('orders').update(
//         {id: id},
//         {
//             $set: {
//                 "date": req.body.date,
//                 "bank": req.body.bank,
//                 "bank_status": req.body.bank_status,
//                 "status":"Booked"
//             }
//         }
//     )
//     res.send("Data Updated");
// })


// //query params example city w.r.t state
// app.get('/city', (req,res)=> {
//     var query = {};
//     // console.log(req.query.city);
//     if(req.query.city && req.query.feature) {
//         query = {state_id: Number(req.query.city),feature: Number(req.query.feature)};
//     } 
//     db.collection('location').find(query).toArray((err,result)=> {
//         if (err) throw err;
//         res.send(result);
//     })
// })

// //connect with mongodb
// MongoClient.connect(mongoUrl,(err,client)=> {
//     if (err) console.log("Error while establishing connection");
//     db = client.db('Practice');
//     app.listen(port, () => {
//         console.log(`The application started successfully on port ${port}`);
//     })
// });


var express=require('express');
var app = express();
var mongo=require('mongodb');
var MongoClient=mongo.MongoClient;
const mongoUrl="mongodb+srv://Hargun_FEcommerce:hZwwLSHq6vks@cluster0.7rlmlbe.mongodb.net/?retryWrites=true&w=majority";
var cors=require('cors');
const bodyParser=require('body-parser');

var port = process.env.PORT || 8425
var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//first default route
app.get('/',(req,res)=>{
    res.send("Hii From Express")
})


app.get('/location',(req,res)=>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

app.get('/services',(req,res)=>{
    db.collection('services').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/features',(req,res)=>{
    db.collection('features').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/location/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    // console.log(id);
    // res.send('ok')
    db.collection('location').find({"location_id":id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// app.get('/state/:id',(req,res)=>{
//     var id=parseInt(req.params.id);
//     db.collection('location').find({"state_id":id}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })

//query param example
//city with respect to state_id
app.get('/city',(req,res)=>{
    var query={};
    //console.log(req.query.city);
    if(req.query.city && req.query.feature){
        query={state_id:Number(req.query.city),"feature.feature_id":Number(req.query.feature)}
    }
    db.collection('location').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/services/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    // console.log(id);
    // res.send('ok')
    db.collection('services').find({"id":id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/features/:id',(req,res)=>{
    var id=Number(req.params.id);
    // console.log(id);
    // res.send('ok')
    db.collection('features').find({"Feature_id":id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/appointment',(req,res)=>{
    db.collection('orders').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// app.post('/placeorder',(req,res)=>{
//     // console.log(req.body);
//     // res.send('ok')
//     db.collection('orders').insert(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send("Order placed");
//     })
// })

app.post('/postorder',(req,res)=>{
    // console.log(req.body);
    // res.send('ok')
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Appointment Booked");
    })
})

app.delete('/deleteOrder',(req,res)=>{
    db.collection('orders').remove({},(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.delete('/deleteOrder/:id',(req,res)=>{
    var id=Number(req.params.id)
    db.collection('orders').remove({id:id},(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/serviceArray',(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    db.collection('services').find({id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updateStatus/:id',(req,res)=>{
    var id=Number(req.params.id)
    var status=req.body.status?req.body.status:"Booked"
    db.collection('orders').updateOne(
        {id:id},
        {
            $set:{
                "date":req.body.date,
                "Bank":req.body.Bank,
                "bank_status":req.body.bank_status,
                "status":status
            }
        }
    )
    res.send("Data updated")
})


//connect with mongodb 
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("Error while Connection");
    db=client.db('HospitalData');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})

app.get('/costfilter/:mealId',(req,res)=>{
    var id=Number(req.params.mealId)
    var query={"mealTypes.mealtype_id":id}

    if(req.query.cuisine && req.query.lcost && req.query.hcost){
        let lcost=Number(req.query.lcost)
        let hcost=Number(req.query.hcost)
        query={$and:[{cost:{$gt:lcost, $lt:hcost}}],"mealTypes.mealtype_id":id,
                "cuisines.cuisine_id":Number(req.query.cuisine)}
        // query={"mealTypes.mealtype_id":id,"cuisines.cuisine_id":{$in:[2,5]}}
    }else if(req.query.lcost && req.query.hcost){
        let lcost=Number(req.query.lcost)
        let hcost=Number(req.query.hcost)

        query={$and:[{cost:{$gt:lcost, $lt:hcost}}],"mealTypes.mealtype_id":id}
    }
    db.collection('restdata').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})