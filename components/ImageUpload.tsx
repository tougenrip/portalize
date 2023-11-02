/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import {useState} from "react";

export default function UserImageUpload() {
  const [ImageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState(null)
  let imagetext
  const getImage = async (e) => {
    setImage(e.target.files[0])
    const url = URL.createObjectURL(e.target.files[0])
    setImageUrl(url);
  }
  const sendServer = async () => {
    const body = new FormData()
    body.append('file', image)
    const response = await axios.post('api/user/uploadUserImage', body).then((res) => imagetext= res.data)
  }
  return (
    <>
      <img src={ImageUrl} alt="preview"/>
      <input type='file' id='image' name='image' onChange={getImage} />
      <button type='button' onClick={sendServer}>Send to Server</button>
      <p>{imagetext}</p>
      
    </>
  )
}