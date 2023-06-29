import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
        const db = client.db("test");
        let fmbyid = (await db.collection("maps").find({}, {projection: {floormap:0,interior:0,}}).toArray())
        res.json(fmbyid);
}

