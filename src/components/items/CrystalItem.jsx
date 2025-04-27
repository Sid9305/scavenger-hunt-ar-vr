// src/components/items/CrystalItem.jsx

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

export default function CrystalItem({ item, onClick, decorative = false }) {
  const [hovered, setHovered] = useState(false);
  const crystalRef = useRef();
  const indicatorRef = useRef();
  
  // Position and scale
  const position = item.position || [0, 0, 0];
  const scale = item.scale || 1;
  
  // Use a simple box for physics collision
  const [ref] = useBox(() => ({
    mass: 0,
    position: position,
    args: [1 * scale, 2 * scale, 1 * scale],
    type: 'Static',
  }));
  
  useFrame(() => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01;
    }
    if (indicatorRef.current) {
      indicatorRef.current.rotation.y += 0.01;
    }
  });
  
  const handleClick = () => {
    if (!decorative && onClick) {
      onClick(item);
    }
  };
  
  return (
    <group>
      {/* Crystal body - using octahedron for crystal shape */}
      <mesh 
        ref={crystalRef} 
        position={position}
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1 * scale, 0]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : (item.color || '#9370DB')} 
          emissive={hovered ? (item.color || '#9370DB') : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Invisible physics body */}
      <mesh 
        ref={ref} 
        position={position}
        visible={false}
      >
        <boxGeometry args={[1 * scale, 2 * scale, 1 * scale]} />
        <meshStandardMaterial opacity={0} transparent={true} />
      </mesh>
      
      {/* Floating indicator if hoverable */}
      {hovered && !decorative && (
        <mesh 
          ref={indicatorRef} 
          position={[
            position[0],
            position[1] + 2 * scale,
            position[2]
          ]}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  );
}