import formidable from 'formidable';
import { getServerSession } from 'next-auth';
import { join, resolve } from 'path'
import { authOptions } from '../auth/[...nextauth]'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
  
}

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    
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
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10mb
      maxFieldsSize: 10 * 1024 * 1024, // 10mb
      filename: function (name, ext, part, form) {
        // Set the filename to "logo" with the original extension
        return 'logo' + ext
      }
    }

    const form = new formidable.IncomingForm(options)
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while processing the upload.' })
        return
      }

      // Construct the URL of the uploaded file based on your server configuration
      const fileUrl = `https://example.com/uploads/${userId}/logo${files.file.name}`

      // Send the URL as the response
      res.status(200).json({ message: 'Upload successful', fileUrl })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing the request.' })
  }
}
