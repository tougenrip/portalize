import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/test.loader.js",
    dataUrl: "build/test.data",
    frameworkUrl: "build/test.framework.js",
    codeUrl: "build/test.wasm",
    webglContextAttributes: {
        preserveDrawingBuffer: true
    }
  });

  return <Unity unityProvider={unityProvider} className="unity-canvas h-screen w-screen" />;
}