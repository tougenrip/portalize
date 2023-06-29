import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query
  const client = await clientPromise;
        const db = client.db("test");
        let fmbyid = (await db.collection("maps").find({_id:new ObjectId(`${id}`),}).toArray()).at(0)?.floormap
        res.json(fmbyid);
}