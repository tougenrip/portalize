import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.body.function)
    {
      case "SaveFloorMapFile":
        await SaveFloorMapFile();
        break;
      case "SaveInteriorFile":
        await SaveInteriorFile();
        break;
      default:
        res.status(400).json({ message: "Invalid function" });
    }

    async function SaveFloorMapFile() {
      const client = await clientPromise;
      const db = client.db(req.body.db as string);
  
      const posts = await db.collection(req.body.col as string).updateOne({name: "Doruk"}, {$push: {FloorMaps: req.body.data}}, {upsert: true})
      res.json({posts});
    }

    async function SaveInteriorFile() {
      const client = await clientPromise;
      const db = client.db(req.body.db as string);

      const posts = await db.collection(req.body.col as string).updateOne({name: "Doruk"}, {$push: {Interior: req.body.data}}, {upsert: true})
      res.json({posts});
    }
  } catch (e) {
    res.status(400).json({ e });
    console.error(e);
  }
};