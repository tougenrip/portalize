

import React, { Fragment,useRef,useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";



// export const getServerSideProps = async(req,res) => {
  
//   const {mapid} = req.query
//   if(!req.query.function){
//    return handler()
//   }else{
//     const [floormapurl,interiorurl] = [`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/floormap/${mapid}`,`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/worlds/interior/${mapid}`]
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-api-key': `${process.env.API_ROUTE_SECRET}`
//       }
//     };
// const [floormapRes, interiorRes] = await Promise.all([fetch(floormapurl, options), fetch(interiorurl, options)]);
// const [floormap, interior] = await Promise.all([floormapRes.json(), interiorRes.json()])
// const [floormapdata, interiordata] = await Promise.all([JSON.parse(JSON.stringify(floormap)),JSON.parse(JSON.stringify(interior))])

// return{
  
//   props:{floormapdata, interiordata}
  
// };
//   }
  
// }



function OpenEmpty() {

  
 
    const { unityProvider, loadingProgression, isLoaded, sendMessage } =  useUnityContext({
      loaderUrl: "https://cdn.portalize.io/build/editor/editor.loader.js",
      dataUrl: "https://cdn.portalize.io/build/editor/editor.data.unityweb",
      frameworkUrl: "https://cdn.portalize.io/build/editor/editor.framework.js.unityweb",
      codeUrl: "https://cdn.portalize.io/build/editor/editor.wasm.unityweb",
    });
  
  
  
    return (
      <Fragment>
        {!isLoaded && (
          <p className="w-[100vh] h-[100vh] text-center">Loading Application... {Math.round(loadingProgression * 100)}%</p>
        )}
        <Unity
          className="-z-10"
          unityProvider={unityProvider}
          style={{transitionDelay:'5s', visibility: isLoaded ? "visible" : "hidden", "width": "100%", "height": "100vh" }}
        />
        <>
        </>
      </Fragment>
    );
  }
  export default OpenEmpty