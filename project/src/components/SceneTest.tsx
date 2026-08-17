import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useGLTF } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Crosshair } from "lucide-react";

// ==========================================
// 🎛️ SENSITIVITY & TUNING
// ==========================================

// 1. SMOOTHING (The "Heavy" Feel)
// Lower number = Smoother, slower, less jittery.
// Higher number = Snappy, instant, but maybe shaky.
// Try: 0.05 (Very Smooth) to 0.2 (Fast)
const SMOOTHING_FACTOR = 0.08; 

// 2. MOVEMENT SCALE (Dampening)
// If you tilt 10 degrees, how much should the 3D shoe tilt?
// 1.0 = Exact 1:1 match (Real life)
// 0.5 = Half movement (Subtle)
const SENSITIVITY_SCALE = 0.8; 

// 3. AXIS CONFIGURATION (Keep your settings from before)
const SWAP_PITCH_AND_ROLL = true; 
const PITCH_SIGN = 1; 
const ROLL_SIGN  = 1; 

// ==========================================

type Props = {
  pitch: number; 
  roll: number;  
  yaw?: number;
};

// --- REAL SHOE MODEL ---
// "Trainer" by jeremy (poly.pizza/m/cs7k_ENAZjQ), licensed CC-BY 3.0.
// Attribution credited in Footer.tsx.
const SHOE_MODEL_URL = "/models/sneaker.glb";

function RealShoe() {
    const { scene } = useGLTF(SHOE_MODEL_URL);
    // Clone per-instance: the same SceneTest component is mounted twice
    // (left + right foot) and a THREE.Object3D can only live in one place
    // in the scene graph at a time, so the cached GLTF scene can't be reused as-is.
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    return (
        <primitive
            object={clonedScene}
            scale={1.4}
            position={[0, -0.3, 0]}
            rotation={[0, Math.PI / 4, 0]}
        />
    );
}

function ShoeFallback() {
    return (
        <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[1.2, 0.4, 3]} />
            <meshStandardMaterial color="#333" wireframe />
        </mesh>
    );
}

useGLTF.preload(SHOE_MODEL_URL);

// --- WRAPPER WITH SMOOTHING LOGIC ---
function ShoeWrapper({ pitch, roll }: { pitch: number, roll: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // We use this to store the "Current Smoothed Value"
  // It remembers where the shoe WAS, so it can drift slowly to where it SHOULD be.
  const currentRot = useRef({ x: 0, z: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // 1. Map Inputs (Axis Swapping)
    let targetPitch, targetRoll;

    if (SWAP_PITCH_AND_ROLL) {
        targetPitch = roll * PITCH_SIGN; 
        targetRoll  = pitch * ROLL_SIGN;
    } else {
        targetPitch = pitch * PITCH_SIGN;
        targetRoll  = roll * ROLL_SIGN;
    }

    // 2. Apply Sensitivity Scaling (Make movements smaller if needed)
    targetPitch *= SENSITIVITY_SCALE;
    targetRoll  *= SENSITIVITY_SCALE;

    // 3. Apply Smoothing (Lerp)
    // "Move 8% of the way towards the target every frame"
    currentRot.current.x += (targetPitch - currentRot.current.x) * SMOOTHING_FACTOR;
    currentRot.current.z += (-targetRoll - currentRot.current.z) * SMOOTHING_FACTOR;

    // 4. Update 3D Object
    groupRef.current.rotation.x = currentRot.current.x;
    groupRef.current.rotation.z = currentRot.current.z;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={<ShoeFallback />}>
        <RealShoe />
      </Suspense>
    </group>
  );
}

export default function SceneTest({ pitch, roll }: Props) {
  const [offsets, setOffsets] = useState({ pitch: 0, roll: 0 });

  const handleCalibrate = () => {
      setOffsets({ pitch, roll });
  };

  // Zero the data
  const cleanPitch = pitch - offsets.pitch;
  const cleanRoll  = roll - offsets.roll;

  return (
    <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing bg-gray-100 rounded-xl overflow-hidden relative group">

      <button
        onClick={handleCalibrate}
        className="absolute top-3 right-3 z-50 bg-white/90 hover:bg-white text-gray-900 backdrop-blur-md border border-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all shadow-lg"
      >
        <Crosshair size={16} className="text-cyan-600" />
        <span>Tare</span>
      </button>

      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, 5, -10]} intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} />

        <ShoeWrapper pitch={cleanPitch} roll={cleanRoll} />

        <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={10} blur={2} far={1} />
        <OrbitControls enablePan={false} />
      </Canvas>
      
      <div className="absolute bottom-2 left-2 text-xs font-mono text-white/40 bg-black/50 p-2 rounded">
         SMOOTHING: {SMOOTHING_FACTOR} <br/>
         SCALE: {SENSITIVITY_SCALE}
      </div>
    </div>
  );
}