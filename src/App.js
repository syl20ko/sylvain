import * as THREE from "three";
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas , useFrame } from "react-three-fiber";
import { OrbitControls} from "@react-three/drei";
import Police from "./Police";
import Mars from "./Mars";

const Stars = () => {
  let group = useRef()
  let theta = 0
  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 2 * Math.sin(THREE.Math.degToRad((theta += 0.1)))
    const s = Math.cos(THREE.Math.degToRad(theta * 1))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightblue') })
    const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, mat, coords]
  }, [])
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 20, 29], fov: 100 }}>
      <directionalLight intensity={0.2} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Mars />
        <group>
          <Police />
          <Stars />
        </group>
      </Suspense>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minDistance={[35]}
        minPolarAngle={0}
        /* autoRotate */
      />
    </Canvas>
  );
}

export default App;
