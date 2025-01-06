const express = require("express")
const app = express()
require("dotenv").config();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://skillbasedfreelancing.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
}));
app.use(express.json())
app.use(cookieParser())

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


    // JWT 
    app.post("/jwt", async(req,res)=>{
      const user = req.body 
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "4h"
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict'
      })
      .send({success:true})
    })

    app.get("/logout",async(req,res)=>{
      res.clearCookie("token", {
        secure: process.env.NODE_ENV,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 0
      }).send({success:true})
    })
    
    app.post("/users", async(req,res)=>{
        const user = req.body
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })

    app.get("/user-role/:email", async(req,res)=>{
        const email = req.params.email 
        const query = {email:email}
        const result = await usersCollection.findOne(query)
        res.send(result)
    })

    app.get("/allJobs", async(req,res)=>{
      const result = await allJobsCollection.find().toArray()
      res.send(result)
    })

    app.delete("/deleteJob/:id", async(req,res)=>{
      const id = req.params.id 
      const query = {_id: new ObjectId(id)}
      const result = await allJobsCollection.deleteOne(query)
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