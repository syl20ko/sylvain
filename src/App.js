import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Police from "./Police";
import Mars from "./Mars";

function App() {
  return (
    <Canvas camera={{ position: [0, 20, 29], fov: 100 }}>
      <directionalLight intensity={0.2} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Mars />
        <group>
          <Police />
          <Stars
            distance={600000} // Camera distance (default=450000)
            sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
            inclination={0} // Sun elevation angle from 0 to 1 (default=0)
            azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          />
        </group>
      </Suspense>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minDistance={[35]}
        minPolarAngle={0}
        autoRotate
      />
    </Canvas>
  );
}

export default App;
