'use client'
import { Button, ButtonGroup, Textarea } from "@material-tailwind/react";
import React, { Fragment,useRef,useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnityInstance from "react-unity-webgl/declarations/unity-instance";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Input
} from "@material-tailwind/react";
import fetch from 'node-fetch'
import {Headers} from 'node-fetch';

export const getServerSideProps = async(req) => {
  const {mapid} = req.query
  const [floormapurl,interiorurl] = [`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/floormap/${mapid}`,`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/interior/${mapid}`]
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
  
  props:{floormapdata, interiordata}
  
};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse,{floormapdata, interiordata}) {
  switch(req.query.function){
    case 'updateskyperm':
      await UpdateSkyPerm()
      break;
    case 'updatebannerperm': 
    await UpdateBannerPerm()
    break;
    case 'uploadMap':
      await EditMap({floormapdata, interiordata})
      break;
  }


 function EditMap({floormapdata, interiordata}) {

  
 
  const { unityProvider, loadingProgression, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "http://192.168.0.33:3000/build/editor/editor.loader.js",
    dataUrl: "http://192.168.0.33:3000/build/editor/editor.data.unityweb",
    frameworkUrl: "http://192.168.0.33:3000/build/editor/editor.framework.js.unityweb",
    codeUrl: "http://192.168.0.33:3000/build/editor/editor.wasm.unityweb",
  });

  if(isLoaded === true){
    
    
    setTimeout(() => sendMessage('PlaymodeManager','SetFloormap', `${floormapdata}`),500);
    setTimeout(() => sendMessage('PlaymodeManager','SetInterior',`${interiordata}`), 500);
    setTimeout(() => sendMessage('PlaymodeManager','LoadMap'), 500);
  }  


  return (
    <Fragment>
      {!isLoaded && (
        <p className="w-[100vh] h-[100vh] text-center">Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        className="-z-10"
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden", "width": "100%", "height": "100vh" }}
      />
      <>
      </>
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
    </Fragment>
  );
}

}