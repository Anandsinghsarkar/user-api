import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Anandsinghsarkar:Sarkar777@cluster0.vctqol5.mongodb.net/test";

export default async function handler(req, res) {
  const { phone } = req.query;

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("test");
  const user = await db.collection("users").findOne({ phone });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
}
