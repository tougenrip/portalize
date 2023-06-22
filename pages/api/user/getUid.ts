// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   const { id } = req.query
//   const client = await clientPromise;
//         const db = client.db("test");
//   let fmbyid = (await db.collection("users").find({}).toArray())
//         res.json({fmbyid});
// }

import { MongoClient, ObjectId } from "mongodb";
import { useSession } from "next-auth/react";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:admin@portalize.gkq1arb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const GetusrEmail = () => {
    const { data: session, status } = useSession()
    return session.user.email
}

export default async function GetUid(req, res) {
    
   
  try {
    
    

    const database = client.db("test");
    const movies = database.collection("users");
    // Query for a movie that has the title 'The Room'
    const query = {email: GetusrEmail as unknown as string,};
    const options = {
      // sort matched documents in descending order by rating
    //   sort: { "imdb.rating": -1 }, 
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, name:1, image: 0, email:0, maps: 0 },
    };
    const movie = await movies.findOne(query, options);
    res.json(movie);
  } finally {
    await client.close()
  }
}