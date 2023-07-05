import clientPromise from '../../../../lib/mongodb';
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if(req.headers['x-api-key'] !== process.env.API_ROUTE_SECRET){return res.status(401).send('Unauthorized Access2')}
  const { id } = req.query
  const client = await clientPromise;
        const db = client.db("test");
        let fmbyid = (await db.collection("maps").find({_id:new ObjectId(`${id}`),}).toArray()).at(0)?.interior
        res.json(fmbyid)
}