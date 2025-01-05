const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("The skill bases data will coming")
} )



const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8aq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client
      .db("SkillBasedFreelancing")
      .collection("UsersCollection")

    const allJobsCollection = client.db("SkillBasedFreelancing").collection("allJobs")
    
    app.post("/users", async(req,res)=>{
        const user = req.body 
        console.log(user)
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })

    app.get("/user-role/:email", async(req,res)=>{
        const email = req.params.email 
        const query = {email:email}
        const result = await usersCollection.findOne(query)
        res.send(result)
    })

    app.post("/addJobs", async(req,res)=>{
      const job = req.body 
      const result = await allJobsCollection.insertOne(job)
      res.send(result)
    })
    
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`The server is running on the port of ${port}`)
})