const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k0tncy0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const contactCollection = client.db('contactManagement').collection('contacts')
    const AllContactCollection = client.db('contactManagement').collection('allContacts')


    app.get("/contact", async (req, res) => {
      const data = contactCollection.find();
      const result = await data.toArray();
      res.send(result);
    });


    app.post("/contact", async (req, res) => {
      const data = req.body;
      const query = { data };
      console.log(query)
      const exits = await contactCollection.findOne(query);
      if (exits) {
        return res.send({ success: false, data: exits })
      }
      const result = await contactCollection.insertOne(data);

      res.send({ success: true, result });
    });



    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('AirCNC Server is running..')
})

app.listen(port, () => {
  console.log(`AirCNC is running on port ${port}`)
})