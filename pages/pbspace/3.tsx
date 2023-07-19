
import React, { Fragment} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

 function App(req) {
 
  const { unityProvider, loadingProgression, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: `https://cdn.portalize.io/build/pbspace3/game.loader.js`,
    dataUrl: `https://cdn.portalize.io/build/pbspace3/game.data.gz`,
    frameworkUrl: `https://cdn.portalize.io/build/pbspace3/game.framework.js.gz`,
    codeUrl: `https://cdn.portalize.io/build/pbspace3/game.wasm.gz`,
    
  });

  return (
    

    <>
      

      {!isLoaded && (
        <p className="w-[100vh] h-[100vh] text-center">Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        className="-z-10"
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden", "width": "100%", "height": "100vh" }}
      />
    </>
  );
}

export default App