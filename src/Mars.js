/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/mars.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        position={[0, -19.5, 0]}
        scale={[0.04, 0.04, 0.04]}
        material={materials["Default OBJ.005"]}
        geometry={nodes.Cube008.geometry}
      />
    </group>
  );
}

useGLTF.preload("/mars.glb");