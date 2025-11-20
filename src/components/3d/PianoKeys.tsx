import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const PianoKeys = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  const whiteKeys = 7;
  const keyWidth = 0.3;
  const keyDepth = 1.5;
  const keyHeight = 0.1;

  return (
    <group ref={groupRef}>
      {/* White keys */}
      {Array.from({ length: whiteKeys }).map((_, i) => (
        <mesh
          key={`white-${i}`}
          position={[(i - whiteKeys / 2) * keyWidth, 0, 0]}
        >
          <boxGeometry args={[keyWidth - 0.02, keyHeight, keyDepth]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
      {/* Black keys */}
      {[0, 1, 3, 4, 5].map((i) => (
        <mesh
          key={`black-${i}`}
          position={[(i - 2.5) * keyWidth + keyWidth / 2, keyHeight / 2 + 0.05, -keyDepth / 4]}
        >
          <boxGeometry args={[keyWidth * 0.6, keyHeight * 0.8, keyDepth * 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
};
