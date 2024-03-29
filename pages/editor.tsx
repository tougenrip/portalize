
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Switch, Slider, CardFooter, CardBody, CardHeader, Card, Typography, Select, Option } from "@material-tailwind/react";
import { BiXCircle } from "react-icons/bi";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { modelToImage } from "@/utils/modelToImage";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import { useRouter } from "next/router";



// export const getServerSideProps = async(req,res) => {
  


//   const uid = session?.user?.id
//   const gamedata = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/getDrafts?i=${uid}`)
//   const gamedatares = await gamedata.json()
//   console.log(gamedatares);


// return{
  
//   props:{gamedatares}
  
  
// };
// }



function OpenEmpty() {
  const [visibility, setVisibility] = useState(false);
  const [floormap, setFloormap] = useState("");
  const [interior, setInterior] = useState("");
  const [floormapdraft, setFloormapDraft] = useState(null);
  const [interiordraft, setInteriorDraft] = useState(null);
  const [draftTitle, setDraftTitle] = useState(null)
  const [bannerImg, setBannerImg] = useState(null)
  const [bannerUrl, setBannerUrl] = useState("")
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [cat, setCat] = useState("")
  const [userLimit, setUserLimit] = useState(1);
  const [ageLimit, setAgeLimit] = useState(1);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [draftId, setDraftId] = useState();
  const [selectedDraft, setSelectedDraft] =useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modelvisibility, setModelVisibility] = useState(false)
  const [model, setModel] = useState(null);
  const [modelUrl, setModelUrl] = useState('')
  const [modelName, setModelName] = useState('');
  const [imageLink, setImageLink] = useState('')
  let draftData
  let modelData

  const {data:session} = useSession()
  const userId = session?.user?.id
  const isActive = session?.user?.isActive

  const userName = session?.user?.name
  const userGender = session?.user?.gender
  const userBday = session?.user?.bDay
  const userAvatar = session?.user?.avatarUrl

  const router = useRouter()

  

  useEffect(() => { console.log('Category set to' + cat) },[cat])

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
    setBannerImg(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0])
    setBannerUrl(url)
    
  };

  useEffect(() => {
    console.log('Banner Has been updated:', bannerImg);
  }, [bannerImg]);

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

    // const mapForm = new FormData();
    // mapForm.append('title', title);
    // mapForm.append('desc', desc);
    // mapForm.append('file', bannerImg)
    // mapForm.append('ageLimit', `${ageLimit}`)
    // mapForm.append('userLimit', `${userLimit}`)
    // mapForm.append('tags[]', tags)

    const id = toast.loading("Please wait...")
    setIsLoading(true)
    setVisibility(false)
    const user = await axios.post(
        "/api/database/saveMap?function=uploadMap",
        { title, desc, file:bannerImg, ageLimit, userLimit, tags, isPrivate, password, floormap, interior, selectedDraft, cat},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(res => { 
        setIsLoading(false)
        
        toast.update(id, {render: "Congratulations! Your world just got uploaded to Portalize!", type: "success", isLoading: false, autoClose: 5000});
   }).catch((error) => {
        console.log(error);
        toast.update(id, {render: "Something went wrong", type: "error", isLoading: false , autoClose: 5000});
        setIsLoading(false);
      });
    console.log(user);
  };
 
    const { unityProvider, loadingProgression, isLoaded, sendMessage, addEventListener, removeEventListener, UNSAFE__unityInstance } =  useUnityContext({
      loaderUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/editor/Build/webgl-portalize-editor-13.loader.js`,
      dataUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/editor/Build/webgl-portalize-editor-13.data.unityweb`,
      frameworkUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/editor/Build/webgl-portalize-editor-13.framework.js.unityweb`,
      codeUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/editor/Build/webgl-portalize-editor-13.wasm.unityweb`,
      
    streamingAssetsUrl: "streamingassets",
    });

  
  if (isLoaded === true){

    axios.get(`/api/getDrafts`, {
      params: {
        i: userId
      }
    }).then((res) => {
      draftData = JSON.stringify(res.data)
      console.log(draftData)
      sendMessage('MenuSave', 'GetDraftsFromDB', draftData);
    })
    
    LoadModels()

    
  }

  function LoadModels() {
    axios.get(`/api/user/listModels`, {
      params: {
        i: userId
        
      }
    }).then((res) => {
      modelData = JSON.stringify(res.data)
      console.log(modelData)
      sendMessage('Asset Menu', 'LoadCustomModels', modelData);
    })
  }

  function getVisibility() {
    return visibility
  }

    const handleGameOver = useCallback((floormap, interior, id) => {
      setVisibility(true);
      getVisibility()
      setFloormap(`${floormap}`);
      setInterior(`${interior}`);
      setSelectedDraft(`${id}`)
      sendMessage('EditorManager','SetInput', "false");
      console.log("publish event ran" + floormap + interior + id);
    }, []);

    const handleSaveDraft = useCallback((floormap, interior, title, id) => {

      

      axios.post("api/uploadDraft", {
        ownerId:userId,
        title: title,
        floormap: floormap,
        interior: interior
      },{
        headers: {
          'x-api-key': process.env.API_ROUTE_SECRET //the token is a variable which holds the token
        }
       })
       .catch((err) => {toast.error('Couldnt save draft'); console.log(err)} )
       .then(() => 
       
      axios.get(`/api/getDrafts?i=${userId}`).then((res) => {
        draftData = JSON.stringify(res.data);
        sendMessage('MenuSave', 'GetDraftsFromDB', draftData);

      })).catch((err) => {toast.error('An error occured when fetching drafts. Please try again'); console.log(err)});

       
  
      }, [userId, sendMessage])

      const getDraftsFromDb = useCallback(() => {


        axios.get(`/api/getDrafts?i=${userId}`).then((res) => {
          draftData = JSON.stringify(res.data);
          sendMessage('MenuSave', 'GetDraftsFromDB', draftData);
        })
      }, [userId, sendMessage]);

      const deleteDraftFromDb = useCallback((draftId) => {
        axios.put(`/api/deleteDraft?i=${draftId}`).then(() => axios.get(`/api/getDrafts?i=${userId}`).then((res) => {
          draftData = JSON.stringify(res.data);
          sendMessage('MenuSave', 'GetDraftsFromDB', draftData);
        }))
      }, [])
  
    useEffect(() => {
      addEventListener("Publish", handleGameOver);
      
      return () => {
        removeEventListener("Publish", handleGameOver);
      };
    }, [addEventListener, removeEventListener, handleGameOver]);

    useEffect(() => {
      addEventListener("Save", handleSaveDraft);
      return () => {
        removeEventListener("Save", handleSaveDraft);
      };
    }, [addEventListener, removeEventListener, handleSaveDraft]);

    useEffect(() => {
      addEventListener("GetProjects", getDraftsFromDb);
      return () => {
        removeEventListener("GetProjects", getDraftsFromDb);
      };
    }, [addEventListener, removeEventListener, getDraftsFromDb]);


    useEffect(() => {
      addEventListener("DeleteDraft", deleteDraftFromDb);
      return () => {
        removeEventListener("DeleteDraft", deleteDraftFromDb);
      };
    }, [addEventListener, removeEventListener, getDraftsFromDb]);

    const ModalUpload = useCallback(() => {
      setModelVisibility((curr) => curr = !curr)
    }, [])

    useEffect(() => {
      addEventListener("OpenModalForm", ModalUpload);
      return () => {
        removeEventListener("OpenModalForm", ModalUpload);
      };
    }, [addEventListener, removeEventListener, ModalUpload]);

    const DeleteModel = useCallback((id) => {
      axios.delete(`/api/user/deleteCustomModel?id=${id}`).then(() => {
        LoadModels()
      }).catch((err)=> toast.error('There has been an error while deleting your model'))
      
    }, [])
    

    useEffect(() => {
      addEventListener("DeleteModel", DeleteModel);
      return () => {
        removeEventListener("DeleteModel", DeleteModel);
      };
    }, [addEventListener, removeEventListener, DeleteModel]);


    
    useEffect(() => {  convertmodelToImage()  }, [modelUrl])

    async function convertmodelToImage(){
      const modelLink = await modelToImage(modelUrl)
      // inFilePathUrl  - this will path of file or its dynamic for input tag then you can generate the filepath from file using blob
      setImageLink(modelLink)
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
      const id = toast.loading("Please wait...")
      setIsLoading(true)
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
        if(response.status === 201){
          setIsLoading(false)
          toast.update(id, {render: "Congratulations! Your world just got uploaded to Portalize!", type: "success", isLoading: false, autoClose: 5000});
        }
        if(response.status === 413){
          setIsLoading(false)
          toast.update(id, {render: "You don't have enough storage left.", type: "warning", isLoading: false, autoClose: 5000});
        }
        
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        toast.update(id, {render: "Something went wrong", type: "error", isLoading: false , autoClose: 5000}); 
      }
    };
  
    const handleModelUploadClick = event => {
      hiddenModelInput.current.click();
    };
  
    const hiddenModelInput = useRef(null);
  
    return (
      <Fragment>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
        />
        <Head>
          <title>Portalize | Editor</title>
        </Head>
        {!isLoaded && (
        <>
        <div className={`fixed w-screen h-screen -z-10 `} style={{backgroundImage:`url(/img/mapcomp.webp)`, backgroundPosition:'center', backgroundSize:'cover',}}></div>
          <div className="fixed top-0 left-0 bg-transparent h-screen w-screen " style={{backdropFilter:`blur(${Math.round(10 /loadingProgression * 0.2)}px)` ,transitionProperty:"all", transitionDuration:"1s", }}></div>
          <div className="fixed top-0 left-0 h-screen w-screen" style={{backgroundColor:`rgba( 0,0,0,${Math.round(10 /loadingProgression * 0.5)})`, opacity:`${(1 / loadingProgression * 0.100)}` }}></div>
        
        
        
        <div className='fixed justify-center bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 space-y-4 !z-50'>
        
        <p className='w-1/2'></p>
        <div className="" style={{ width: 400, height: 400, fontSmooth: "always", zIndex:"99"}}>
        <CircularProgressbar 
        value={Math.round(loadingProgression * 100)}  
        // text={`${Math.round(loadingProgression * 100)}%`}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `rgb(255, 255, 255)`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
            strokeWidth:'1px',
            // Customize transition animation
            transition: 'stroke-dashoffset 0.5s ease 0s',
            // Rotate the path
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: 'transparent',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            // Text color
            fill: '#f88',
            // Text size
            fontSize: '16px',
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: '#3e98c7',
          },
        }}
        />
<Link href={`/`}><Image src='/img/logo_comp.webp'  unoptimized className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-100" width={218} height={38} alt="Logo"></Image></Link>
        </div>
        {/* <div className="bg-blue-gray-900 h-3 w-[35vw] z-50">
            <div className='bg-white h-3 transition' style={{width:`${Math.round(loadingProgression * 100)}%`, transition:"width 1s ease 0s"}}></div>
        </div> */}
        </div>
        </>
        
    
      )}
        <Unity
          tabIndex={1}
          className="fixed !z-0"
          unityProvider={unityProvider}
          style={{transitionDelay:'5s', visibility: isLoaded ? "visible" : "hidden", "width": "100%", "height": "100vh" }}
        />


{/* */}

        <form className={`${visibility ? null : "hidden"}  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col space-y-5 bg-[#242424] p-5 rounded-3xl min-w-[400px] max-w-[400px] z-50 `}>
          <div className="flex flex-row-reverse justify-between">
            <BiXCircle className='h-10 w-10' onClick={(curr) => setVisibility(curr => !curr)}/>
            <h1 className='self-center text-4xl font-bold mb-5'>PUBLISH YOUR MAP</h1>
          </div>
        
      <Input value={title} crossOrigin={undefined} type="text" label="Map Title" onChange={(e) => setTitle(e.target.value)}/>
      <Input value={desc} type="text" label='Description' onChange={(e) => setDesc(e.target.value)} crossOrigin={undefined}/>
      <Select value={cat} color="purple" onChange={(e) => {setCat(e)}} label="Select Category">
        <Option value="worldaffairs">🌍 World Affairs</Option>
        <Option value="life">🌻 Life</Option>
        <Option value="arts">💭 Arts</Option>
        <Option value="knowledge">💡 Knowledge</Option>
        <Option value="tech">🧭 Tech</Option>
        <Option value="places">🌆 Places</Option>
        <Option value="faith">🕊️ Faith</Option>
        <Option value="hangingout">🥳 Hanging Out</Option>
        <Option value="sports">🏆 Sports</Option>
        <Option value="identity">🗣️ Identity</Option>
        <Option value="hustle">🔥 Hustle</Option>
        <Option value="languages">💬 Languages</Option>
        <Option value="wellness">🌿 Wellness</Option>
        <Option value="entertainment">🎸 Entertainment</Option>
      </Select>
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
      <div className='flex flex-col '>
        <div className="flex flex-row justify-between">
        <p className='px-5'>Privite</p>
        <Switch color="purple" onChange={(current) => { setIsPrivate(current => !current); console.log(isPrivate); } } crossOrigin={undefined}/>
        </div>
        <div  className={`${isPrivate ? null :"hidden"}`}>
        <Input value={password} crossOrigin={undefined} type="text" label="Set Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        
      </div>
      <div className='pt-3 flex flex-row justify-between'>
        <p className='w-min whitespace-nowrap px-5  relative bottom-[6px]'>User Limit</p>
        <Slider color="purple" value={userLimit}  min={1} max={isActive ? 33 : 11} step={1} onChange={(e) =>{setUserLimit(e.target.valueAsNumber); console.log("UserLimit set to: " + userLimit)}} />
        
      </div>
      <div className='flex flex-row justify-between'>
        <p className='w-min whitespace-nowrap px-5 relative bottom-[6px]'>Age Limit</p>
        <Slider color="purple" value={ageLimit} min={1} max={100} step={1} onChange={(e) =>{setAgeLimit(e.target.valueAsNumber); console.log("AgeLimit set to: " + ageLimit)}} />
        
      </div>
     
      <Button onClick={uploadToServer} style={{pointerEvents: isLoading ? 'none' : null, opacity: isLoading ? '0.5' : '1'}} variant="gradient" color="purple">{isLoading ? `PLEASE WAIT`: `PUBLISH YOUR MAP`}</Button>
    </form>

   {/**/}

    <Card className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  !shadow-none bg-transparent z-50 ${modelvisibility ? null : "hidden"}`} style={{transition:'all', transitionProperty:'all', transitionDuration:'300ms'}}>
      {/* <CardHeader
        variant="gradient"
        color="purple"
        className="mb-4 flex h-28 justify-between p-5 relative"
      >
        
        
      </CardHeader> */}
      <CardBody className="relative flex flex-row gap-4 bg-[#151515] rounded-3xl aspect-[1784/518]  !h-[400px] w-auto" >
        <div className="flex flex-col flex-grow justify-between h-full">

        <Typography variant="h3" color="white">
          Import 3D Asset
        </Typography>
            <BiXCircle className='absolute h-10 w-10 z-50 top-5 right-5 stroke-blue-gray-50 text-white' onClick={(curr) => setModelVisibility(curr => !curr)}/>
              <hr className="h-2"/>
              <Input  className="!bg-[#242424] border-none" label="Write Object Name" color='purple' size="lg" value={modelName} onChange={handleModelNameChange} crossOrigin={undefined} />
              <Button onClick={handleModelUploadClick} className='!relative !bg-[#242424] h-40 border-1 border-white !shadow-none'>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
            <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
          </svg>
            <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a model</p>
            </Button>
              <input type="file" ref={hiddenModelInput} style={{display:'none'}} onChange={handleModelChange} />

        </div>
        <div className="flex-1 relative bg-[#242424] rounded-xl">
        <Typography variant="h3" className="bottom-5 left-4 font-thin" style={{textAlign:'start', position:'absolute'}}>
                  Preview
              </Typography>
            <div className=' aspect-square h-full w-auto mx-auto mt-6'>
            <img className={`${imageLink ? null : 'hidden'}`} alt='model preview' src={imageLink} />
            
            </div>
            
              </div>
{/* 
        {
          imageLink && (
            
          )
        } */}

      </CardBody>
      <CardFooter className="pt-0 text-center p-10">
        <Button onClick={handleUploadModel} className={`${isLoading ? '!opacity-50 !pointer-events-none' : ""} bg-gradient-to-r from-[#3B29FF] to-[#9C4FFF]`} >
          { isLoading?'Please Wait':'Upload your Model'}
        </Button>
        
        
        
        
      </CardFooter>
    </Card>

      </Fragment>
    );
  }
  export default OpenEmpty