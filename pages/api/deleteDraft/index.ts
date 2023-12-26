

export default async function handler(req, res) {

  const { i:id } = req.query
        await prisma.draft.delete({
            where: {
              id:id
            }
          });
          res.status(200).json({message: `deleted draft with id ${id} successfully`})
}