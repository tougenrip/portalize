import { Input, Switch, Button, Slider } from '@material-tailwind/react/'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'



const Maptest = (req, {visibility ,floormap, interior}) => {
  const worldId = req.body || null
  const [bannerImg, setBannerImg] = useState('')
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [userLimit, setUserLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const isActive = false;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const hiddenFileInput = React.useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBannerImg(base64 as unknown as string);
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleAddTag = (e) => {
    if ( e.key !== "Enter") return ;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
    console.log(tags)
  }

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
    console.log(tags)
  }


  const uploadToServer = async () => {

    const user = await axios.post(
        "/api/database/saveMap?function=uploadMap",
        { title, desc, bannerImg, userLimit, tags, isPrivate },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).catch((error) => {
        console.log(error);
      });
    console.log(user);
  };

  return (
    <form className={`${visibility ? null : "hidden"} absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2 flex flex-col space-y-5 bg-[#242424] p-5 rounded-3xl max-w-[800px] `}>
      <h1 className='self-center text-4xl font-bold mb-5'>PUBLISH YOUR MAP</h1>
      <Input type="text" label="Map Title" onChange={(e) => setTitle(e.target.value)} crossOrigin={undefined}/>
      <Input type="text" label='Description' onChange={(e) => setDesc(e.target.value)} crossOrigin={undefined}/>
      <Button onClick={handleClick} className='!relative !bg-transparent border-2 border-white !shadow-none'>
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
          <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
        </svg>
          <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a file</p>
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileUpload}
            style={{display: 'none'}} 
          />
          <div className='flex items-center flex-wrap border-2 border-solid border-gray-600 p-2 rounded-xl w-full mt-4 gap-2'>
            {tags.map((tag,index) => (<span key={index} className="bg-blue-gray-100 inline-flex px-3 py-2 rounded-full space-x-2 text-black"><p>{tag}</p><span className='relative top-[1px] h-5 w-5 bg-[#151515] rounded-full text-center inline-block text-white' onClick={() => removeTag(index)}>x</span></span>))}
            {/*<span className="bg-blue-gray-100 inline-flex px-3 py-2 rounded-full space-x-2 text-black"><p>hello</p><span className='relative top-[1px] h-5 w-5 bg-[#151515] rounded-full text-center inline-block text-white' onClick={() => removeTag(index)}>&times:</span></span>*/}
            <input type='text' onKeyDown={handleAddTag} className='flex-grow-1 border-none outline-none bg-transparent' placeholder='Type your tags'></input>
          </div>
      <div className='flex flex-row justify-between'>
        <p className='px-5'>Privite</p>
        <Switch color="purple" onChange={(current) => { setIsPrivate(current => !current); console.log(isPrivate) } } crossOrigin={undefined}/>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='w-min whitespace-nowrap px-5'>User Limit</p>
        <Slider color="purple" defaultValue={5} min={1} max={isActive ? 33 : 11} step={1} onChange={(e) =>{setUserLimit(e.target.valueAsNumber); console.log("UserLimit set to: " + userLimit)}} />
      </div>
      <Button onClick={uploadToServer} variant="gradient" color="purple">PUBLISH YOUR MAP</Button>
    </form>
  )
}

export default Maptest