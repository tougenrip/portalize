import formidable from "formidable";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@components/prisma/prisma";
import path from 'path'

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const session = await getServerSession(req,res,authOptions)
  const userId = session?.user?.id as string
  const currentQuota = session?.user?.usedQuota
  const storageQuota = session?.user?.storageQuota
  if(!session){
    res.status(401).json({message: 'unauthorized'})
  }
  console.log('handling file...');
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) console.log(err)
    try{
      if(currentQuota + files.file.size >= storageQuota){
        res.status(400).json({message:'not enough storage'})
      }else{
        await saveFile1(req,res,files.file,fields,userId,currentQuota);
      }

    }
    catch(e){
      console.log('Error was catched: ',e);
    }
    return res.status(201).send("Nothing");
  });
};

const saveFile1 = async (req,res,file,fields,userId,currentQuota:number) => {
  
  console.log(file.size); //**TypeError**

  
  const filePath = path.join(process.cwd(), 'uploads', userId, 'models', file.originalFilename);
  const data = fs.readFileSync(file.filepath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath , data);

  const webFilePath: string = `https://portalize.io/uploads/${userId}/models/${file.originalFilename}`

  await prisma.file.create({data:{
    userId: userId,
    filename: fields.name,
    size: file.size,
    image: fields.image,
    address: webFilePath,
  }})

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      usedQuota: currentQuota + file.size
    }
  })

  //await fs.unlinkSync(file.path);
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};