import clientPromise from '../../../lib/mongodb';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query
  const client = await clientPromise;
        const db = client.db("Worlds");
        let fmbyid = (await db.collection("maps").find({}).toArray()).at(0)?._id
        res.json(fmbyid);
}