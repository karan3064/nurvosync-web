import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Shoe({
  pitch,
  roll,
}: {
  pitch: number;
  roll: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    // 🔥 VERY IMPORTANT
    ref.current.rotation.x += (pitch - ref.current.rotation.x) * 0.25;
    ref.current.rotation.z += (roll - ref.current.rotation.z) * 0.25;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[2.2, 0.4, 0.8]} />
      <meshStandardMaterial color="#22d3ee" />
    </mesh>
  );
}
