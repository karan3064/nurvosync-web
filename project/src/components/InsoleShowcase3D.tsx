import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SHOE_MODEL_URL = '/models/sneaker.glb';

function Shoe() {
  const { scene } = useGLTF(SHOE_MODEL_URL);

  // The source model's raw geometry is ~9.7 x 4 x 3.5 units, off-center from
  // its own origin — at any sane camera distance the camera ends up inside
  // the mesh. Normalize it to a fixed size and center it at the origin so it
  // frames correctly regardless of the file's native scale/pivot.
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.6;
    const scale = targetSize / maxDim;

    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} rotation={[0, Math.PI / 5, 0]} />;
}

function ShoeFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 0.7, 1]} />
      <meshStandardMaterial color="#0d9488" wireframe />
    </mesh>
  );
}

useGLTF.preload(SHOE_MODEL_URL);

export default function InsoleShowcase3D() {
  return (
    <Canvas camera={{ position: [2.6, 1.6, 2.6], fov: 45 }}>
      <hemisphereLight args={['#ffffff', '#3f3f46', 1.4]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.3} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#5eead4" />
      <pointLight position={[0, 4, 3]} intensity={0.6} />

      <Suspense fallback={<ShoeFallback />}>
        <Shoe />
      </Suspense>

      <ContactShadows position={[0, -0.58, 0]} opacity={0.5} scale={6} blur={2.4} far={1.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
