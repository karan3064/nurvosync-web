import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function SceneTest({
  pitch,
  roll,
}: {
  pitch: number;
  roll: number;
}) {
  return (
    <div className="w-full h-[320px] rounded-xl overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* ✅ Orientation helper */}
        <primitive object={new THREE.AxesHelper(1.5)} />

        {/* ✅ IMU cube */}
        <mesh rotation={[pitch, 0, roll]}>
          <boxGeometry args={[1, 0.2, 2]} />
          <meshStandardMaterial color="#22d3ee" />
        </mesh>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
