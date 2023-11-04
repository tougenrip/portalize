import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/prisma";
import path from 'path'



export default async function handler(req, res) {

    const session = await getServerSession(req,res,authOptions);
      const owner = session?.user?.id
      const usedQuota = session?.user?.usedQuota as number;
      const { id: fileId } = req.query;

    if (req.method === "DELETE") {
        

        if (!fileId) {
            res.status(400).json({ message: 'File ID is required' });
            return;
        }

        try {
            if (!owner) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const file = await prisma.file.findUnique({ where: { id: fileId } });

            if (!file) {
                res.status(404).json({ message: 'File not found' });
                return;
            }

            const filePath = path.join(file.address.replace('https://portalize.io/', ''));

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);

                const newUsedQuota = usedQuota - file.size;

                // Update user's usedQuota
                await prisma.user.update({
                    where: {
                        id: owner
                    },
                    data: {
                        usedQuota: newUsedQuota, // Updated variable name
                    }
                });

                // Delete the file from the database
                await prisma.file.delete({ where: { id: fileId } });

                res.status(204).json({ message: 'File deleted' });
            } else {
                res.status(404).json({ message: 'File not found on the server' });
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    } else {
        res.status(405).json({ error: 'Only DELETE requests allowed.' });
    }
}

