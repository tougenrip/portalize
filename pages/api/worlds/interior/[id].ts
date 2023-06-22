import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../../lib/mongodb';
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query
  const client = await clientPromise;
        const db = client.db("test");
      let fmbyid = (await db.collection("map").find({_id:new ObjectId(`${id}`),}).toArray()).at(0)?.interior
        res.json(fmbyid)
}