import { PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'
studio.initialize();
studio.ui.restore();
import { SheetProvider, editable as e } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import React, {Suspense} from 'react'
import {Model} from './components/Model'
import Image from 'next/image'  
import theatre from './utils/theatre'







const ComingSoon = () => {
  
  return (
    <>
        <main className=''>
             <div id='canvas-container' className=''>
                <ComingSoonCanvas/>
                
             </div>
             <div className="absolute top-2 left-2"><Image src={"/img/logo.png"} width={218} height={38} alt={"Logo"}/></div>
             <div></div>
        </main>
    </>
  )
}

var ComingSoonCanvas = () => {

    const demoSheet = getProject('Demo Project').sheet('Demo Sheet')
    
   
        
        
    return(
        
        <Canvas className='!h-screen m-0'>
            <SheetProvider sheet={demoSheet}>
                <ambientLight intensity={.7} position={[0,0,0]} color={"white"}/>
                <pointLight intensity={.2} position={[0,0,0]} />
                <PerspectiveCamera makeDefault={true} position={[0,4,0]} near={0.001} far={999} fov={80}/>
                <Suspense fallback={null}>
                    <Model />
                    <Preload all/>
                </Suspense>
            </SheetProvider>
        </Canvas>
    )
}
export default ComingSoon