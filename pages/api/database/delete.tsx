import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.query.function) {
        case 'FloorMaps':
            await DeleteFloorMaps()
            break;
        case 'Interior':
            await DeleteInteriors()
            break;
        default:
            res.status(400).json({message: 'Bad Request'})
    }

    async function DeleteFloorMaps()
    {
        const client = await clientPromise;
        const db = client.db("users");
    
        let floormaps = (await db.collection("editor").find({name: "Doruk"}).toArray()).at(0)?.FloorMaps
        floormaps = floormaps.map((floormap: string) => JSON.parse(floormap))
        res.json({floormaps});
    }

    async function DeleteInteriors()
    {
        const client = await clientPromise;
        const db = client.db("users");
        
        let interiors = (await db.collection("editor").find({name: "Doruk"}).toArray()).at(0)?.Interior
        interiors = interiors.map((interior: string) => JSON.parse(interior))
        res.json({interiors});
    }
}
