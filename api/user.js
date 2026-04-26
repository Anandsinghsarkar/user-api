import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Anandsinghsarkar:Sarkar777@cluster0.vctqol5.mongodb.net/?retryWrites=true&w=majority";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  try {
    const { phone } = req.query;

    // ❗ validation
    if (!phone) {
      return res.status(400).json({ error: "Phone is required" });
    }

    const client = await clientPromise;
    const db = client.db("test");

    const user = await db.collection("users").findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
