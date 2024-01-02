import Navbar from '@/components/Navbar'
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AfterAuth = () => {
    const {data:session} = useSession()
    const userGender = session?.user?.gender
    const userBday = session?.user?.bDay
    const [gender, setGender] = useState(null)
    const [bDay, setBDay] = useState(null)
    const router = useRouter()

    if([userGender, userBday].every(Boolean)){
        router.push("/")
    }

    function delay(ms) {
        return new Promise((resolve) => {
           setTimeout(resolve, ms);
        })
     }

    const completeUserInfo = async() => {
        try {
            const response = await axios.put('api/user/updateUser', 
            {
             gender,bDay
            },
            {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }).then(async(res) => {
                toast.success('Great! You`re being redirected!')
                await delay(5000)
                router.push('/')
              })

              
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
                <Input type='date' onChange={e => { setBDay(new Date(e.target.value).toISOString()); console.log(bDay); } } size='lg' label='Enter your Birthday' crossOrigin={undefined}/>
                <Input type='date' onChange={e => { setBDay(new Date(e.target.value).toISOString()); console.log(bDay); } } size='lg' label='Enter your Birthday' crossOrigin={undefined}/>
                <Select size='lg' onChange={e => {setGender(e); console.log(bDay)}} value={gender} label="Select your Gender">
                    <Option value='male'>Male</Option>
                    <Option value='female'>Female</Option>
                    <Option value='other'>Other</Option>
                </Select>
                <Button color="purple" type='submit' className={`opacity-[]`} style={{opacity: gender && bDay ? '1' : '0.5', pointerEvents: gender && bDay ? 'auto' : 'none',}} onClick={completeUserInfo}>Continue</Button>
            </div>
        </div>
    </>
  )
}

export default AfterAuth