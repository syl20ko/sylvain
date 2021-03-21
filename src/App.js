import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useUpdate, useFrame } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Police from "./Police";
import Mars from "./Mars";
import * as THREE from "three";
import JSONfont from "./Akaya Telivigala_Regular.json";

function Loading({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "blue",
  ...props
}) {
  // load in font
  const font = new THREE.FontLoader().parse(JSONfont);
  const config = useMemo(
    () => ({
      font,
      size: 16,
      height: 30,
    }),
    [font]
  );
  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      self.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    },
    [children]
  );

  const ref = useRef();

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    ref.current.rotation.x = Math.cos(t / 2) / 8;
    ref.current.rotation.y = Math.sin(t / 2) / 8;
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.01]}>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    </group>
  );
}

function App() {


  return (
    <Canvas camera={{ position: [0, 20, 29], fov: 100 }}>
      <directionalLight intensity={0.2} />
      <ambientLight intensity={0.5} />
      <Suspense
        fallback={
          <Loading
            hAlign="center"
            position={[0, 0, 0]}
            children="Chargement..."
            size={3}
          />
        }
      >
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
