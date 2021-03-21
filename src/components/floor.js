import React from "react";

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -19.5, 0]}>
      <sphereGeometry args={[20, 20, 100]} />
      <meshStandardMaterial color="grey" />
    </mesh>
  );
};

export default Floor;