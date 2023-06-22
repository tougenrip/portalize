import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.query.function) {
        case 'FloorMaps':
            await GetFloorMaps()
            break;
        case 'Interior':
            await GetInteriors()
            break;
        case `GetById`:
            await GetFloorMapByID({params: {id:'1'}})
        default:
            res.status(400).json({message: 'Bad Request'})
    }switch(req.query.id){
        case 'id':
            await GetFloorMapByID({params: {id:`${this.id}`}})

    }

    async function GetFloorMaps()
    {
        const client = await clientPromise;
        const db = client.db('Worlds');
    
        let floormaps = (await db.collection("maps").find({}).toArray()).at(0)?.map?.floormap
        res.json({floormaps});
    }

    async function GetInteriors()
    {
        const client = await clientPromise;
        const db = client.db("users");
        
        let interiors = (await db.collection("editor").find({name: "Doruk"}).toArray()).at(0)?.Interior
        interiors = interiors.map((interior: string) => JSON.parse(interior))
        res.json({interiors});
    }
    async function GetFloorMapByID({params}: {params: {id: String}}) {
        const client = await clientPromise;
        const db = client.db("Worlds");

        let fmbyid = (await db.collection("maps").find({id:`${params.id}`,}).toArray()).at(0)?.map?.floormap
        res.json({fmbyid});
    }
}
