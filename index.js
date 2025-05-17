const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express  = require('express') 
const cors = require('cors')
const app  = express() 
require('dotenv').config()
const port = process.env.PORT || 5000 



// midelwere  
app.use(cors())
app.use(express.json()) 

  app.get('/',(req,res)=>{


    res.send('Hello it is now practice  time')
  })





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.unhq3oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

    try{
          await client.connect(); 

          const coffeeColletions = client.db('myUser').collection('myUserCoffee')
          const userCoffeeColletion = client.db('myUser').collection('userData')
            await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

app.get('/coffees',async(req,res)=>{

  const result = await coffeeColletions.find().toArray()

  res.send(result)
    
})
app.get('/coffees/:id',async(req,res)=>{



  const id = req.params.id 
  const query = {_id: new ObjectId(id)} 
  const  result = await coffeeColletions.findOne(query)

  res.send(result)

})
app.post('/coffees',async(req,res)=>{

const  newCoffee = req.body 

console.log(newCoffee);

const result = await coffeeColletions.insertOne(newCoffee) 

res.send(result)

})

app.put('/coffees/:id',async(req,res)=>{



  const id = req.params.id 

  const filter = {_id: new ObjectId(id)} 

  const options = { upsert:true}
  const updatedCoffee = req.body 
  
  const updateDoc = {

    $set:updatedCoffee 
  }

  const result = await coffeeColletions.updateOne(filter,updateDoc,options) 

  res.send(result)
})
app.delete('/coffees/:id',async(req,res)=>{

 const id = req.params.id 

 const query = {_id: new ObjectId(id)} 

 const result = await coffeeColletions.deleteOne(query)

 res.send(result)

})

//  for user  crud operation 

app.get('/user',async(req,res)=>{


  const result = await userCoffeeColletion.find().toArray() 
  res.send(result)
  
})

app.post('/user',async(req,res)=>{


  const newUser = req.body 

  const  result = await userCoffeeColletion.insertOne(newUser) 

  res.send(result) 

})

app.delete('/user/:id',async(req,res)=>{


  const id = req.params.id 

  const query = {_id: new ObjectId(id)}


   const result  = await userCoffeeColletion.deleteOne(query) 

   res.send(result)
 
  
})

app.patch('/user',async(req,res)=>{

  const {email,lastSignInTime
}= req.body 

const filter = {email:email}
const updateDoc = {

  $set:{
lastSignInTime:lastSignInTime

  }


}

  const result =  await userCoffeeColletion.updateOne(filter,updateDoc)

  res.send(result)
  
})

    }finally{


    }
    
}

run().catch(console.dir)

  app.listen(port,()=>{


    console.log(`this port is running ${port}`);
    
  })