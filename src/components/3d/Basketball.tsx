import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Basketball = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial color="#ff6b35" roughness={0.7} metalness={0.2} />
      </Sphere>
      {/* Basketball lines */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};
