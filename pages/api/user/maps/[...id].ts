import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../../lib/mongodb';
import { MongoClient, ObjectId } from "mongodb";
export default async function handler(req, res) {

  const { id } = req.query
  const client = await clientPromise;
        const db = client.db("test");
  let fmbyid = (await db.collection("users").findOne({_id:new ObjectId(`${id}`),}, {projection:{_id:1,name:0,email:0,image:0,emailVerified:0}}))
        res.json(fmbyid?.maps);

        const maparr = Array.from(fmbyid.maps)
        maparr.forEach(element => {
            element = fetch(`http://localhost:3000/api/worlds/floormap/${fmbyid.maps[1]}`)
            console.log(element)
        });
       
}


