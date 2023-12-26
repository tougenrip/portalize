

export default async function handler(req, res) {
  const {id} = req.query
        let fmbyid = (await prisma.map.findUnique({where:{id:parseInt(id as unknown as string)}, select:{floormap:true} }))
        res.json(fmbyid);
}
