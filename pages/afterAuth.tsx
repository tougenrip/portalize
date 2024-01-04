import Navbar from '@/components/Navbar'
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import { AvatarCreator, EditorConfig } from '@readyplayerme/rpm-react-sdk';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AfterAuth = () => {
    const {data:session, update} = useSession()
    const userAvatar = session?.user?.avatarUrl
    const userGender = session?.user?.gender
    const userBday = session?.user?.bDay
    const userName = session?.user?.name
    const [avatar, setAvatar] = useState(null) 
    const [gender, setGender] = useState(null)
    const [bDay, setBDay] = useState(null)
    const [name, setName] = useState(null)
    const router = useRouter()

    useEffect(() => {
      console.log({ Name: name }, '\n', { bDay: bDay }, '\n', { gender: gender }, '\n', { avatar:avatar })
    },[avatar, gender, bDay, name])

    if([userGender, userBday, userName, avatar].every(Boolean)){
        router.push("/")
    }

    function delay(ms) {
        return new Promise((resolve) => {
           setTimeout(resolve, ms);
        })
     }

     const config: EditorConfig  = {
      clearCache: true,
      bodyType: 'fullbody',
      quickStart: true,
      language: 'en',
    };

     const handleOnAvatarExported = async (url: string) => {
      setAvatar(url)
    };

    const completeUserInfo = async() => {
        try {
            await axios.put('api/user/updateUser', 
            {
             gender,bDay,name,avatar
            },
            {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }).then(async() => {
                update({name:name, bDay:bDay, gender:gender, avatarUrl:avatar})
              }).finally(async () => {
                toast.success('Great! You`re being redirected!')
                await delay(5000)
                router.push('/')
              }

              )

              
          } 
        catch (err) {
            if (err.response.status === 500){
                toast.error('Internal Server Error. Please try again later.')
            }
            console.error(err)
            
          }
        
          
    }


  return (
    <>
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
    <Navbar/>
        <div className='w-screen'>
            <div className='bg-[url(/img/herobgnewcomp.webp)] bg-center h-56 relative bottom-24' ></div>
            <div className='flex flex-col space-y-5 w-[95%] max-w-xl mx-auto'>
                <Typography variant="h1" color="white" className="text-center">You`re Almost Ready</Typography>
                <Typography variant="h5" color="white" className="text-center font-thin">We just need a little bit more information of you.</Typography>
                {!userName && <Input type='date' onChange={e => { setName(e.target.value); } } size='lg' label='Enter your Username' crossOrigin={undefined}/>}
                {!userBday && <Input type='date' onChange={e => { setBDay(new Date(e.target.value).toISOString()); } } size='lg' label='Enter your Birthday' crossOrigin={undefined}/>}
                {!userGender && 
                <Select size='lg' onChange={e => {setGender(e); console.log(bDay)}} value={gender} label="Select your Gender">
                    <Option value='male'>Male</Option>
                    <Option value='female'>Female</Option>
                    <Option value='other'>Other</Option>
                </Select>
                }
                {!userAvatar && 
                <AvatarCreator
                subdomain='portalize-dqxbvv'
                onAvatarExported={handleOnAvatarExported}
                editorConfig={config}
                />
                }
                
                <Button color="purple" type='submit' className={`opacity-[]`} style={{opacity: gender && bDay ? '1' : '0.5', pointerEvents: gender && bDay && name && avatar ? 'auto' : 'none',}} onClick={completeUserInfo}>Continue</Button>
            </div>
        </div>
    </>
  )
}

export default AfterAuth