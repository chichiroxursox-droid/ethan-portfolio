import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Microphone = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Microphone head (capsule) */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Microphone grille lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.5 + (i - 4) * 0.15, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.32, 0.01, 8, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      {/* Microphone handle */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#2d3748" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
};
