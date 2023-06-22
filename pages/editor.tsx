
import { Button, ButtonGroup, Textarea } from "@material-tailwind/react";
import React, { Fragment,useRef,useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnityInstance from "react-unity-webgl/declarations/unity-instance";
import {
  Input
} from "@material-tailwind/react";


export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/worlds/6488fdfb9d52beb18ed2c4d6');
  const gData = await res.json()
  const gameData = JSON.stringify(gData);
  console.log(gameData)
  return{
    
    props:{gameData,},revalidate: 30,
    
  };
  
}


function App({gameData}) {
  const[unityNumber, setUnityNumber] = useState(0);
  const[unityString, setUnityString] = useState('text');
  var testObject = {name: 'John', age: 48, test: 21}
  var jsonString = JSON.stringify(testObject)
 
  const { unityProvider, loadingProgression, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "build/webgl-api-test.loader.js",
    dataUrl: "build/webgl-api-test.data.unityweb",
    frameworkUrl: "build/webgl-api-test.framework.js.unityweb",
    codeUrl: "build/webgl-api-test.wasm.unityweb",
  });
  
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
      <ButtonGroup className="fixed top-5 left-5">
      <Input type="number" value={unityNumber} onChange={(e) => {setUnityNumber(e.target.valueAsNumber)}}/>
      <Input type="text" onChange={(e) => {e.preventDefault(); setUnityString(e.target.value)}}/>
      <Button onClick={() => sendMessage('JavascriptHook','TintRed')}>Red</Button>
      <Button onClick={() => sendMessage('JavascriptHook','TintGreen')}>Green</Button>
      <Button onClick={() => sendMessage('JavascriptHook', 'SetNumber', unityNumber)}>number</Button>
      <Button onClick={() => sendMessage('JavascriptHook','SetString', unityString)}>text</Button>
      <Button onClick={() => sendMessage('JavascriptHook','SetString', gameData)}>Json</Button>
    </ButtonGroup>
    </Fragment>
  );
}

export default App