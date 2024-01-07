/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import React, { Fragment, useCallback, useEffect, useState} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import fetch from 'node-fetch'
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar'
import { useQuery } from "@tanstack/react-query";
import { BiXCircle } from "react-icons/bi";
import FriendsPortal from "@/components/FriendsPortal";

export const getServerSideProps = async(req,res,ctx) => {
  
  
  
  const {id} = req.query
  const gamedata = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/getMaps?world=${id}`)
  const gamedatares = await gamedata.json()
  console.log(gamedatares);
  const [floormapurl,interiorurl] = [`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/floormap/${id}`,`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/interior/${id}`]
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': `${process.env.API_ROUTE_SECRET}`
      }
    };
const [floormapRes, interiorRes] = await Promise.all([fetch(floormapurl, options), fetch(interiorurl, options)]);
const [floormap, interior] = await Promise.all([floormapRes.json(), interiorRes.json()])
const [floormapdata, interiordata] = await Promise.all([JSON.parse(JSON.stringify(floormap)),JSON.parse(JSON.stringify(interior))])


return{
  
  props:{floormapdata, interiordata, gamedatares}
  
  
};
}


function App({floormapdata, interiordata,gamedatares}) {
  const {data: session} = useSession()
  const floormap = JSON.stringify(floormapdata.floormap)
  const interior = JSON.stringify(interiordata.interior)
  const worldId = gamedatares.id 
  const password = gamedatares.password
  const router = useRouter()
  
  var newWorld
  const userId = session?.user?.id
  const userName = session?.user?.name
  const userGender = session?.user?.gender
  const avatarId = session?.user?.avatarUrl
  const userFriends = session?.user?.friends
  const userBday = session?.user?.bDay


  

  
  const fulldata = JSON.stringify({floormap,interior,worldId,password,userId,avatarId})
  

 
  const { unityProvider, loadingProgression, isLoaded, unload,  sendMessage, addEventListener, removeEventListener, UNSAFE__unityInstance } = useUnityContext({
    loaderUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/game/Build/webgl-portalize-playmode-12.loader.js`,
    dataUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/game/Build/webgl-portalize-playmode-12.data.unityweb`,
    frameworkUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/game/Build/webgl-portalize-playmode-12.framework.js.unityweb`,
    codeUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}uploads/Builds/game/Build/webgl-portalize-playmode-12.wasm.unityweb`,
    streamingAssetsUrl: "streamingassets",

    
    
  });
   if(isLoaded === true){
    setTimeout(() => sendMessage('PlaymodeManager','StartSession', fulldata), 500);
    
   }

   useEffect(
    () => {(globalThis.unityInstance = UNSAFE__unityInstance),
    [UNSAFE__unityInstance]}
  );  

  async function unloadUnity() {
    await unload();
  }

  useEffect(() => {
    window.addEventListener('beforeunload', unloadUnity);
    return () => {
      window.removeEventListener('beforeunload', unloadUnity);
    };
  }, []);


  const launchNewWorld = useCallback((_worldURL) => {
    console.log(`getting into the world ${_worldURL}`)
    unloadUnity();
    router.push(_worldURL)
  },[])



  useEffect(() => {
      addEventListener("NewWorld", launchNewWorld);
      return () => {
        removeEventListener("NewWorld", launchNewWorld);
      };
    }, [addEventListener, removeEventListener, launchNewWorld]);

    function OpenPortalList() {
      console.log('portal list should be open now')
      setPMV(true);
    }
    

    useEffect(() => {
      addEventListener("OpenPortalList", OpenPortalList);
      return () => {
        removeEventListener("OpenPortalList", OpenPortalList);
      };
    }, [addEventListener, removeEventListener, OpenPortalList]);



    const [portalModelVisibility, setPMV] = useState(true)
  
  return (
    

    <main>
      <NextNProgress color='773fff'/>
      <Head>
        <title>Portalize | {gamedatares.title}</title>
      </Head>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/agora-extension-virtual-background.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/virtualbackground.js"  strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/databuilder.js"  strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/clientmanager.js"  strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/wglwrapper.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/audioeffects.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/eventmanager.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/engineglobals.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/watermark.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/customvideo.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/agorachannel.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/multichannel.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/audiosystem.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/testing.js"  strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/agorautils.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/audiomixing.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/agorartcenginev2.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraRTC_N.js" strategy="beforeInteractive"/>
          <Script src="/uploads/Builds/game/AgoraWebSDK/libs/spatial-audio-main.js" strategy="beforeInteractive"/>
      {!isLoaded && (
        <>
        <div className={`fixed w-screen h-screen -z-10 `} style={{backgroundImage:`url(${gamedatares.img})`, backgroundPosition:'center', backgroundSize:'cover',}}></div>
          <div className="fixed top-0 left-0 bg-transparent h-screen w-screen" style={{backdropFilter:`blur(${Math.round(10 /loadingProgression * 0.2)}px)` ,transitionProperty:"all", transitionDuration:"1s", }}></div>
          <div className="fixed top-0 left-0 h-screen w-screen" style={{backgroundColor:`rgba( 0,0,0,${Math.round(10 /loadingProgression * 0.5)})`, opacity:`${(1 / loadingProgression * 0.100)}` }}></div>
        <Link href={`/`}><Image src='/img/logo_comp.webp'  unoptimized className="absolute top-10 left-10 scale-75 md:scale-100" width={218} height={38} alt="Logo"></Image></Link>
        <div className='absolute bottom-16 left-10 space-y-4 !z-50'>
        <h1 className='text-5xl font-black tracking-widest'>
            {gamedatares.title}
        </h1>
        <p className='w-1/2'>{gamedatares.desc}</p>
        <div className="bg-blue-gray-900 h-3 w-[35vw]">
            <div className='bg-white h-3 transition' style={{width:`${Math.round(loadingProgression * 100)}%`, transition:"width 1s ease 0s"}}></div>
        </div>
        </div>
        <div className={`${portalModelVisibility ? null : 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-start justify-center z-50`}>
          <FriendsPortal visibility={portalModelVisibility}/>
          <BiXCircle className={` ${portalModelVisibility ? null : 'hidden'} -ml-12 mt-2 h-10 w-10`} onClick={(curr) => setPMV(curr => !curr)}/>
        </div>
        
        </>
        
    
      )}
      
      <Unity
        className="-z-10"
        unityProvider={unityProvider}
        style={{transitionDelay:'3s', visibility: isLoaded ? "visible" : "hidden", "width": "100%", "height": "100vh" }}
      />
      
      
      
      
      
      
      
      {/*<ButtonGroup className="fixed top-5 left-5">
      <Input type="number" value={unityNumber} onChange={(e) => {setUnityNumber(e.target.valueAsNumber)}}/>
      <Input type="text" onChange={(e) => {e.preventDefault(); setUnityString(e.target.value)}}/>
      <Button onClick={() => sendMessage('JavascriptHook','TintRed')}>Red</Button>
      <Button onClick={() => sendMessage('JavascriptHook','TintGreen')}>Green</Button>
      <Button onClick={() => sendMessage('JavascriptHook', 'SetNumber', unityNumber)}>number</Button>
      <Button onClick={() => sendMessage('JavascriptHook','SetString', unityString)}>text</Button>
       <Button onClick={() => sendMessage('JavascriptHook','SetString', floormapdata)}>floormapdata</Button>
      <Button onClick={() => sendMessage('JavascriptHook','SetString', interiordata)}>interiordata</Button> 
    </ButtonGroup>*/}
    
    </main>
  );
}

export default App

