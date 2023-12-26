import formidable from 'formidable';
import { getServerSession } from 'next-auth';
import path, { join, resolve } from 'path'
import { authOptions } from '../auth/[...nextauth]'
import fs from 'fs'
import prisma from '@/prisma/prisma';

export const config = {
  api: {
    bodyParser: false
  }
  
}

const post = async(req, res) => {
  const session = await getServerSession(req,res,authOptions)
  const userId = session?.user?.id as string
  const currentQuota = session?.user?.usedQuota
  const storageQuota = session?.user?.storageQuota
  if(!session){
    res.status(401).json({message: 'unauthorized'})
  }
  try {
    
    
    // Check if session is not present (user is not authenticated)
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const userId = session?.user?.id as string

    // Define the upload directory
    const uploadDir = join(resolve(), '/uploads', `${userId}`)

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const options = {
      uploadDir: uploadDir,
      keepExtensions: false,
      maxFileSize: 8 * 1024 * 1024, // 8mb
      maxFieldsSize: 8 * 1024 * 1024, // 8mb
      filename: function (name, ext, part, form) {
        // Set the filename to "logo" with the original extension
        return 'logo'
      }
    }

    const form = new formidable.IncomingForm(options)
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while processing the upload.' })
      }

  
        // const filePath = path.join(process.cwd(), 'uploads', userId, files.file.originalFilename);
        // const data = fs.readFileSync(files.file.filepath);
        // fs.mkdirSync(path.dirname(filePath), { recursive: true });
        // fs.writeFileSync(filePath , data);

      // Construct the URL of the uploaded file based on your server configuration
      const fileUrl = `https://portalize.io/uploads/${userId}/logo`
      await prisma.user.update({
        where:{
          id:userId
        }, 
        data:{
          image: fileUrl
        }
      })

      // Send the URL as the response
      res.status(200).json({ message: 'Upload successful', fileUrl })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing the request.' })
  }
}


export default (req, res) => {
  req.method === "POST"
    ? console.log("POST")
    : req.method === "PUT"
    ? post(req, res)
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
