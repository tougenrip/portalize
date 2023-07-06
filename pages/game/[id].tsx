
import { Button, ButtonGroup, Textarea } from "@material-tailwind/react";
import React, { Fragment,useRef,useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnityInstance from "react-unity-webgl/declarations/unity-instance";
import {
  Input
} from "@material-tailwind/react";
import fetch from 'node-fetch'
import { CircularProgressbar } from 'react-circular-progressbar';


export const getServerSideProps = async(req) => {
  const {id} = req.query
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
  
  props:{floormapdata, interiordata}
  
};
}
function App({floormapdata, interiordata}) {
 
  const { unityProvider, loadingProgression, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "https://app.portalize.io/build/game/game.loader.js",
    dataUrl: "https://app.portalize.io/build/game/game.data",
    frameworkUrl: "https://app.portalize.io/build/game/game.framework.js",
    codeUrl: "https://app.portalize.io/build/game/game.wasm",
    
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

export default App