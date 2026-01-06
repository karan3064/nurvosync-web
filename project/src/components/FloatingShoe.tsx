import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingShoe({
  pitch,
  roll,
  walk,
}: {
  pitch: number;
  roll: number;
  walk: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    // 🔥 IMU → ROTATION (NO ACCUMULATION)
    ref.current.rotation.x = pitch;
    ref.current.rotation.z = roll;

    // 👣 Walking bounce
    ref.current.position.y = walk
      ? Math.sin(clock.elapsedTime * 6) * 0.12
      : 0;
  });

  return (
    <mesh ref={ref}>
      {/* Shoe-like capsule */}
      <capsuleGeometry args={[0.45, 2.2, 12, 24]} />
      <meshStandardMaterial
        color="#22d3ee"
        metalness={0.35}
        roughness={0.4}
      />
    </mesh>
  );
}
