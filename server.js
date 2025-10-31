const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://diyashettyyyy:&hettyyyy890@cluster0.h0rgr.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


async function setupBookingCollection() {
  const database = await client.db('synergiaDB');
  database.createCollection('bookings')
    .then(() => {
 
})
.catch((error) => {
 
})

}
setupBookingCollection();


app.get('/api/bookings', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const allBookings = await collection.find().toArray();
  res.status(200).send(allBookings);
});

app.post('/api/bookings', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const { name, email, event, ticketType } = req.body;
  if (!name || !email || !event) {
    return res.status(400).send(" Name, email, and event are required!");
  }

  const newBooking = {
    name,
    email,
    event,
    ticketType,
    createdAt: new Date()
  };

  try {
    await collection.insertOne(newBooking);
    res.status(201).send("Booking created");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error");
  }
});


app.get('/api/bookings/:id', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const id = req.params.id;
  try {
    const booking = await collection.findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return res.status(404).send(" Booking not found");
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(400).send("Invalid");
  }
});


app.put('/api/bookings/:id', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send(" Booking not found or nothing to update");
    }

    res.status(200).send("Booking updated!");
  } catch (error) {
    res.status(400).send("error");
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const id = req.params.id;
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send(" Not found");
    }
    res.status(200).send("Booking deleted");
  } catch (error) {
    res.status(400).send("Error");
  }
});


app.get('/api/bookings/search', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const email = req.query.email;

  const result = await collection.find({ email: email }).toArray();
  res.status(200).send(result);
});


app.get('/api/bookings/filter', async (req, res) => {
  const database = client.db('synergiaDB');
  const collection = database.collection('bookings');
  const event = req.query.event;

  const result = await collection.find({ event: event }).toArray();
  res.status(200).send(result);
});

app.listen(2000, () => {
  console.log(" Server started");
});
