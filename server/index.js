const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
  if (!token) return res.status(401).send({ message: "Unauthorized Access" });
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) return res.status(401).send({ message: "Unauthorized Access" });
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

    const completeOrdersCollection = client
      .db("SkillBasedFreelancing")
      .collection("completeOrdersCollection");

    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      
      if (!result || result.role !== "admin")
        return res.status(403).send({ message: "Forbidden Access" });
      next();
    };
    const verifyBuyer = async (req, res, next) => {
      const email = req.user.email;
      
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      
      if (!result || result.role !== "buyer")
        return res.status(403).send({ message: "Forbidden Access" });
      next();
    };
    const verifySeller = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      if (!result || result.role !== "seller")
        return res.status(403).send({ message: "Forbidden Access" });
      next();
    };

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

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.patch(
      "/update-user-role",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const updateInfo = req.body;
        const query = { _id: new ObjectId(updateInfo?.id) };
        const updatedDoc = {
          $set: {
            role: updateInfo?.role,
          },
        };
        const result = await usersCollection.updateOne(query, updatedDoc);
        res.send(result);
      }
    );

    app.get("/user-role/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      // if(email !== req.user.email) return res.status(403).send({message:"Forbidden Access"})
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

    app.get("/all-Jobs", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const filter = req.query.filter;
      const sort = req.query.sort;
      const searchText = req.query.searchText;
      let query = {
        title: { $regex: searchText, $options: "i" },
      };
      if (filter) query = { ...query, category: filter };

      let options = {};
      if (options) options = { sort: { deadline: sort === "asc" ? 1 : -1 } };
      const result = await allJobsCollection
        .find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    app.get("/allJobs-count", async (req, res) => {
      const filter = req.query.filter;
      const searchText = req.query.searchText;
      let query = {
        title: { $regex: searchText, $options: "i" },
      };
      if (filter) query = { ...query, category: filter };
      const count = await allJobsCollection.countDocuments(query);
      res.send({ count });
    });

    app.get("/jobDetails/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allJobsCollection.findOne(query);
      res.send(result);
    });

    app.get(
      "/my-posted-jobs/:email",
      verifyToken,
      verifyBuyer,
      async (req, res) => {
        const email = req.params.email;
        const user = req.user;
        if (email !== user.email)
          return res.status(403).send({ message: "Forbidden Access" });
        const query = { buyerEmail: email };
        const result = await allJobsCollection.find(query).toArray();
        res.send(result);
      }
    );

    app.delete("/deleteJob/:id", verifyToken, verifyBuyer, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allJobsCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/addJobs", verifyToken, verifyBuyer, async (req, res) => {
      const job = req.body;
      const result = await allJobsCollection.insertOne(job);
      res.send(result);
    });

    app.post("/bidAJob", verifyToken, async (req, res) => {
      const bidJobInfo = req.body;
      const result = await bidsCollection.insertOne(bidJobInfo);
      res.send(result);
    });

    app.get("/myBids/:email", verifyToken, verifySeller, async (req, res) => {
      const email = req.params.email;
      const user = req.user;
      if (email !== user.email)
        return res.status(403).send({ message: "Forbidden Access" });
      const query = { sellerEmail: email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    app.get(
      "/bidRequest/:email",
      verifyToken,
      verifyBuyer,
      async (req, res) => {
        const email = req.params.email;
        const user = req.user
        if (email !== user.email)
          return res.status(403).send({ message: "Forbidden Access" });
        const query = { buyerEmail: email };
        const result = await bidsCollection.find(query).toArray();
        res.send(result);
      }
    );

    app.patch("/bidREquestStatusUpdate", verifyToken, async (req, res) => {
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
    app.post("/order", verifyToken, verifyBuyer, async (req, res) => {
      const updatedInfo = req.body;
      const product = await bidsCollection.findOne({
        _id: new ObjectId(updatedInfo.id),
      });
      const trnId = new ObjectId().toString();
      const data = {
        total_amount: product.offerPrice,
        currency: "BDT",
        tran_id: trnId, // use unique tran_id for each api call
        // success_url: `http://localhost:5000/payment/${trnId}`,
        success_url: `https://freelancing-delta.vercel.app/payment/${trnId}`,
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
          product,
          paidStatus: false,
          TransitionID: trnId,
        };
        const result = ordersCollection.insertOne(finalOrderInfo);
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
        const result = await ordersCollection.updateOne(
          {
            TransitionID: req.params.tranId,
          },
          {
            $set: {
              paidStatus: true,
            },
          }
        );

        if (result.modifiedCount > 0) {
          // res.redirect(
          //   `http://localhost:5173/dashboard/payment/success/${req.params.tranId}`
          // );
          res.redirect(
            `https://skillbasedfreelancing.web.app/dashboard/payment/success/${req.params.tranId}`
          );
        }
      });
    });

    app.post("/completeOrder", verifyToken, verifySeller, async (req, res) => {
      const completeOrderInfo = req.body;
      if (completeOrderInfo?.message && completeOrderInfo?.image) {
        const result1 = await bidsCollection.updateOne(
          {
            _id: new ObjectId(completeOrderInfo?.bidId),
          },
          {
            $set: {
              status: completeOrderInfo?.status,
            },
          }
        );
        const result = await completeOrdersCollection.insertOne(
          completeOrderInfo
        );
        res.send(result);
      }
    });

    app.get("/MyCompleteOrder", verifyToken, verifyBuyer, async (req, res) => {
      const email = req.query.email;
      const id = req.query.id;
      const query = { bidId: id, buyerEmail: email };
      const result = await completeOrdersCollection.findOne(query);
      res.send(result);
    });

    app.get(
      "/statForSeller/:email",
      verifyToken,
      verifySeller,
      async (req, res) => {
        const email = req.params.email;
        const user = req.user
        // if (email !== user.email)
        //   return res.status(403).send({ message: "Forbidden Access" });
        const noOFBids = await bidsCollection.countDocuments({
          sellerEmail: email,
        });
        const noOfInProgress = await bidsCollection.countDocuments({
          sellerEmail: email,
          status: "In Progress",
        });
        const totalCompletedOrders = await completeOrdersCollection
          .find({ sellerEmail: email })
          .toArray();
        const noOFCompletedOrder = totalCompletedOrders.length;
        let totalSell = totalCompletedOrders.reduce(
          (total, item) => total + parseFloat(item.price),
          0
        );

        res.send({ noOFBids, totalSell, noOFCompletedOrder, noOfInProgress });
      }
    );

    app.get("/statForBuyer/:email", verifyToken, verifyBuyer, async (req, res) => {
      const email = req.params.email;
      const user = req.user 
      // if (email !== user.email)
      //   return res.status(403).send({ message: "Forbidden Access" });
      const totalNoOfJobs = await allJobsCollection.countDocuments({
        buyerEmail: email,
      });
      const noOfInProgress = await bidsCollection.countDocuments({
        buyerEmail: email,
        status: "In Progress",
      });
      const totalCompletedOrders = await completeOrdersCollection
        .find({ buyerEmail: email })
        .toArray();
      const noOFCompletedOrder = totalCompletedOrders.length;
      res.send({ totalNoOfJobs, noOfInProgress, noOFCompletedOrder });
    });

    app.get(
      "/statForAdmin/:email",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const email = req.params.email;
        const user = req.user
        // if (email !== user.email)
        //   return res.status(403).send({ message: "Forbidden Access" });
        const totalUsers = await usersCollection.countDocuments();
        const totalSeller = await usersCollection.countDocuments({
          role: "seller",
        });
        const totalBuyer = await usersCollection.countDocuments({
          role: "buyer",
        });
        const totalAdmin = await usersCollection.countDocuments({
          role: "admin",
        });
        res.send({ totalUsers, totalSeller, totalBuyer, totalAdmin });
      }
    );

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
