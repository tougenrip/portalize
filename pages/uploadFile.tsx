import ImageUpload from '@/components/ImageUpload'
import ModelUpload from '@/components/ModelUpload'
import { Button } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import useSWR from 'swr'

 const UploadFile = () => {

  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return response.json();
  };
  
  const useFetch = (path) => {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`, fetcher);
  
    const isLoading = !data && !error;
  
    return { data, error, isLoading };
  };
  const {data: models} = useFetch('api/user/listModels')

  function deleteModel(url:string){
    axios.delete(`api/user/deleteCustomModel?id=${url}`)
    .then((res) => {
      switch(res.status){
        case(200):
        console.log('file deleted');
        break;
        case(404):
        console.log('File Not Found');
        break;
        default:
          console.log('something happened')

          return
      }
    })
    .catch((err) => (console.log(err)))
  }
  
  function toggleVisibility() {
    SetVisibilityMI(current => !current); 
    console.log(visibility)
  }

  const [visibility, SetVisibilityMI] = useState(false)

  return (
    <>
      {/* <ImageUpload/> */}
      <ModelUpload visibility={visibility}/>
      <Button onClick={toggleVisibility}>
        Toggle Visibility
      </Button>

      <div>
      Uploaded Files

      {models?.map((item) => (
        <div key={item.id}>
          {item.filename}
          <button onClick={() => deleteModel(item.id)}>Delete this file</button>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default UploadFile