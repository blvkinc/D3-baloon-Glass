import React from 'react';
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Float, Lightformer, Text, Html, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing"
import { suspend } from "suspend-react"
import bghdr from "./bg.hdr"

import bg from "./bg.png"

const inter = import("@pmndrs/assets/fonts/inter_regular.woff")
useGLTF.preload("/test.glb")

export const App = () => (
  <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
    <div style={{ position: "fixed", zIndex: -99, width: "100%", height: "100%", backgroundImage: `url(${bg})` }}></div>
    <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} shadows camera={{ position: [0, 0, 20], fov: 50 }}>
      {/* <color attach={"background"} args={["#e0e0e0"]} /> */}
      <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
      <Status position={[0, 0, -10]} />
      <Float floatIntensity={2}>
      
          <D3 scale={0.7} />
  
      </Float>
      <Environment files={bghdr}>
      {/* <Environment preset = "sunset"> */}
        <Lightformer intensity={10} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
      <EffectComposer disableNormalPass>
        <N8AO aoRadius={1} intensity={2} />
        <TiltShift2 blur={0.2} />
      </EffectComposer>
    </Canvas>
  </div>
)



function D3(props) {
  const { nodes } = useGLTF("/test.glb")
  return (
    <mesh receiveShadow castShadow  geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry} {...props}>
      <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} />
    </mesh>
  )
}

function Status(props) {
  const text =  "/D3" 
  return (
      //    <Text fontSize={14} letterSpacing={-0.025} font={suspend(inter).default} color="black" {...props}>
      // {text}
      <Html style={{ color: "transparent", fontSize: "33.5em" }} transform>
      
      </Html>
   

  )
}

export default App;
