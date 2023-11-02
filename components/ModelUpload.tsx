// components/FileUpload.js

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import ModelViewer from "@google/model-viewer"
import ModelViewerElementBase from '@google/model-viewer/lib/model-viewer-base';
import {modelToImage}from '@components/utils/modelToImage'
import Image from 'next/image';






const FileUpload = ({visibility}) => {
  const MVcanvas = useRef<ModelViewerElementBase>(null);
  const [model, setModel] = useState(null);
  const [modelUrl, setModelUrl] = useState('')
  const [modelName, setModelName] = useState('');
  const [imageLink, setImageLink] = useState('')

  useEffect(() => {  convertmodelToImage()  }, [modelUrl])

  async function convertmodelToImage(){
    const modelLink = await modelToImage(modelUrl)
    // inFilePathUrl  - this will path of file or its dynamic for input tag then you can generate the filepath from file using blob
    setImageLink(modelLink)
    console.log(imageLink)
  }

  const handleModelChange = (e) => {
    setModel(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0])
    setModelUrl(url)

  };

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const handleUploadModel = async () => {
    if (!model || !modelName) return;

    const formData = new FormData();
    formData.append('file', model);
    formData.append('name', modelName);
    formData.append('image', imageLink)

    try {
      const response = await axios.post('/api/user/uploadCustomModel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleModelUploadClick = event => {
    hiddenModelInput.current.click();
  };

  const hiddenModelInput = useRef(null);




  return (
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <input
    //     type="text"
    //     placeholder="Enter file name"
    //     value={fileName}
    //     onChange={handleFileNameChange}
    //   />
    //   <button onClick={handleUpload}>Upload File</button>
    // </div>
    <Card className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full !max-w-[500px] bg-gray-900 ${visibility ? null : 'hidden'}`} style={{transition:'all', transitionProperty:'all', transitionDuration:'300ms'}}>
      <CardHeader
        variant="gradient"
        color="purple"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Add Your Model
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 bg-gray-900" >
        <Input  label="Type File Name" color='purple' size="lg" value={modelName} onChange={handleModelNameChange} crossOrigin={undefined} />
        <Button onClick={handleModelUploadClick} className='!relative !bg-transparent border-2 border-white !shadow-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
      <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
    </svg>
       <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a file</p>
      </Button>
        <input type="file" ref={hiddenModelInput} style={{display:'none'}} onChange={handleModelChange} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleUploadModel} variant="gradient" color="purple" fullWidth>
          Upload your Model
        </Button>
        <Typography variant="small" style={{textAlign:'center', position:'relative', top:'10px'}}>
            Preview of your Model
        </Typography>
        <div className='h-64 w-64 self-center mt-6'>
        <img alt='model preview' src={imageLink} />
        </div>
        
      </CardFooter>
    </Card>
  );
};

export default FileUpload;