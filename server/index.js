const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const SSLCommerzPayment = require("sslcommerz-lts");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const store_id = `${process.env.STORE_ID}`;
const store_passwd = `${process.env.STORE_PASS}`;
const is_live = false; //true for live, false for sandbox

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://skillbasedfreelancing.web.app",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("The skill bases data will coming");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8aq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).send({ message: "Unauthorized Access1" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) return res.status(401).send({ message: "Unauthorized Access2" });
    console.log(decode);
    req.user = decode;
    next();
  });
};

async function run() {
  try {
    const usersCollection = client
      .db("SkillBasedFreelancing")
      .collection("UsersCollection");

    const allJobsCollection = client
      .db("SkillBasedFreelancing")
      .collection("allJobs");

    const bidsCollection = client
      .db("SkillBasedFreelancing")
      .collection("allBidsRequest");

    const ordersCollection = client
      .db("SkillBasedFreelancing")
      .collection("orderCollection");
    // JWT
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "4h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.get("/logout", async (req, res) => {
      res
        .clearCookie("token", {
          secure: process.env.NODE_ENV,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/user-role/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.get("/allJobs", async (req, res) => {
      const category = req.query.category;
      let query = {};
      if (category) {
        query = { category: category };
      }
      const result = await allJobsCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/jobDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allJobsCollection.findOne(query);
      res.send(result);
    });

    app.get("/my-posted-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.user;
      // if(email !== user.email) return res.status(403).send({message:"Forbidden Access"})
      const query = { buyerEmail: email };
      const result = await allJobsCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/deleteJob/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allJobsCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/addJobs", async (req, res) => {
      const job = req.body;
      const result = await allJobsCollection.insertOne(job);
      res.send(result);
    });

    app.post("/bidAJob", async (req, res) => {
      const bidJobInfo = req.body;
      const result = await bidsCollection.insertOne(bidJobInfo);
      res.send(result);
    });

    app.get("/myBids/:email", async (req, res) => {
      const email = req.params.email;
      const query = { sellerEmail: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/bidRequest/:email", async (req, res) => {
      const email = req.params.email;
      const query = { buyerEmail: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/bidREquestStatusUpdate", async (req, res) => {
      const updateInfo = req.body;
      const query = { _id: new ObjectId(updateInfo?.id) };
      const updatedDoc = {
        $set: {
          status: updateInfo.status,
        },
      };
      const result = await bidsCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    // Payment
    app.post("/order", async (req, res) => {
      const updatedInfo = req.body;
      const product = await bidsCollection.findOne({
        _id: new ObjectId(updatedInfo.id),
      });

      const trnId = new ObjectId().toString();
      const data = {
        total_amount: product.offerPrice,
        currency: "BDT",
        tran_id: trnId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/payment/${trnId}`,
        // success_url: `https://freelancing-delta.vercel.app/payment/${trnId}`,
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: product.buyerEmail,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        const finalOrderInfo = {
          product, paidStatus: false, TransitionID: trnId
        }
        const result = ordersCollection.insertOne(finalOrderInfo)
        const updateStatusRes = bidsCollection.updateOne(
          { _id: new ObjectId(updatedInfo.id) },
          {
            $set: {
              status: updatedInfo.status,
            },
          }
        );
      });

      app.post("/payment/:tranId", async (req, res) => {
        console.log(req.params.tranId);
        const result = await ordersCollection.updateOne({
          TransitionID: req.params.tranId,
        }, {$set:{
          paidStatus: true,
        }});

        if(result.modifiedCount>0){
          res.redirect(`http://localhost:5173/dashboard/payment/success/${req.params.tranId}`);
          // res.redirect(
          //   `https://skillbasedfreelancing.web.app/dashboard/payment/success/${req.params.tranId}`
          // );
        }
      });

      // res.send(product);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`The server is running on the port of ${port}`);
});
