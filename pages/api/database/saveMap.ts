
import formidable from "formidable";
import fs from "fs";
import path from 'path'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from "@/prisma/prisma";

// connect to MongoDB



// define and export the POST endpoint handler function
export default async function handler(req, res) {
  //  if(req.headers['x-api-key'] !== process.env.API_ROUTE_SECRET){return res.status(401).send('Unauthorized Access2')}
  // if(!session){res.status(401).send('You`re not signed in!')}

  switch(req.query.function){
    case 'uploadMap':
      await UploadMap(req, res)
      break;
    case 'updateMap':
      await UpdateMap()
      break;
    case 'saveDraft':
      await SaveDraft()
  }

  async function SaveDraft(){
    
  
    if (req.method === 'POST') {
      
      try {
        // extract the map data and session from the request body
        const {title, floormap, interior} = req.body;
  
        const session = await getServerSession(req,res,authOptions);;
        const ownerId = session?.user?.id
  
  
  
        // create a new document in the Worlds collection
        await prisma.draft.create({data: {
          title: title,
          floormap: floormap,
          interior: interior,
          ownerId: ownerId,
        }});
  
        // send a success response back to the client with the CSRF token
        res.status(201).json({ message: 'Map data drafted successfully.' });
      } catch (e) {
        // send an error response back to the client
        res.status(500).json({ error: e.message });
      }
    } else {
      // send a 405 Method Not Allowed response back to the client
      res.status(405).json({ error: 'Only POST requests allowed.' });
    }
  }


async function UploadMap(req, res){
      const session = await getServerSession(req,res,authOptions);;
      const owner = session?.user?.name;
      const ownerId = session?.user?.id as string;
      const hardLimit = session?.user.isActive ? 32 : 10;
      if(!session){
        res.status(401).json({message: 'unauthorized'})
      }
      const options = {
        keepExtensions: false,
        maxFileSize: 8 * 1024 * 1024, // 8mb
        maxFieldsSize: 8 * 1024 * 1024, // 8mb
        filename: function (name, ext, part, form) {
          // Set the filename to "logo" with the original extension
          return 'thumbnail'
        }
      }
      const form = new formidable.IncomingForm(options);
      form.parse(req, async function (err, fields, files){
        console.log('handling map...');
        console.log(fields);
        console.log(files);
        if (err) console.log(err)
        else{
          try{
            await saveThumbnail(req,res,files.file,fields,owner,ownerId)
        }catch(e){
          console.log('Error was catched: ', e);
        }
        return res.status(201).send("file sent" + files.file.toJSON);
        }
      })

}

const saveThumbnail = async(req,res,file,fields,user,userId) => {

  console.log(file.size);

  const isPrivateForm = () => {
    if(fields.isPrivate === "true"){
      return true
    }else{
      return false
    }
  }

  const map = await prisma.map.create({data: {
    title: fields.title,
    desc: fields.desc,
    ownerName: user,
    ownerId: userId,
    tags: fields.tags,
    isPrivate: isPrivateForm(),
    password: fields.password,
    fromDraft: fields.selectedDraft,
    cat: fields.cat,
    ageLimit: parseInt(fields.ageLimit),
    userLimit: parseInt(fields.userLimit), 
    floormap: fields.floormap,
    interior: fields.interior,
  }});

  const filePath = path.join(process.cwd(), 'uploads', userId, 'thumbnails', `${map.id}`, file.newFilename);
  const data = fs.readFileSync(file.filepath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath , data);

  const webFilePath: string = `https://portalize.io/uploads/${userId}/thumbnails/${map.id}/${file.newFilename}`

  await prisma.map.update({
    where:{
      id:map.id
    },
    data:{
      img:webFilePath
    }
  })
  
  return;
}

async function UpdateMap(){
  /*const worldId = req.query
  
  if (req.method === 'PUT') {
    
    try {
      // extract the map data and session from the request body
      const {title, desc, userLimit, floormap, interior, img} = req.body;

      const session = await getServerSession(req,res,authOptions);;
      const owner = session?.user?.name
      const ownerEmail = session?.user?.email
      const likes = 0
      const hardLimit = session?.user.isActive ? 32 : 10

      if(userLimit > hardLimit){
        throw new Error('You cannot set userLimit higher then dedicated limit. Which is 10 for free users and 32 for premium')
      }


      // create a new document in the Worlds collection
      await prisma.map.update({where: {id:worldId} ,data: {
        title: title,
        desc: desc,
        // ownerName: owner,
        // ownerEmail: ownerEmail,
        userLimit:userLimit, 
        floormap: floormap,
        interior: interior,
        img: img,
      }});

      // send a success response back to the client with the CSRF token
      res.status(201).json({ message: 'Map data updated successfully.' });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }
  } else {
    // send a 405 Method Not Allowed response back to the client
    res.status(405).json({ error: 'Only PUT requests allowed.' });
  }*/
}

}

export const config = {
  api: {
    bodyParser: false
  }
};


// const post = async (req, res) => {
//   const session = await getServerSession(req,res,authOptions)
//   const userId = session?.user?.id as string
//   const currentQuota = session?.user?.usedQuota
//   const storageQuota = session?.user?.storageQuota
//   if(!session){
//     res.status(401).json({message: 'unauthorized'})
//   }
//   console.log('handling file...');
//   const form = new formidable.IncomingForm();
//   form.parse(req, async function (err, fields, files) {

//     if (err) console.log(err)
//     if(currentQuota + files.file.size >= storageQuota){
//       console.log('storage wasnt enough')
//       res.status(400).json({message:'not enough storage'})
//     } else{
//     try{
//         await saveFile1(req,res,files.file,fields,userId,currentQuota, storageQuota);
//     }
//     catch(e){
//       console.log('Error was catched: ',e);
//     }
//     return res.status(201).send("file sent" + files.file.toJSON);
//   }
// });
// };