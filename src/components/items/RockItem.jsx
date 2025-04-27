// src/components/items/RockItem.jsx

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';

export default function RockItem({ item, onClick, decorative = false }) {
  const [hovered, setHovered] = useState(false);
  const indicatorRef = useRef();
  
  const [rockRef] = useSphere(() => ({
    mass: 0,
    position: item.position,
    args: [0.8],
    type: 'Static',
  }));
  
  useFrame(() => {
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
      <mesh 
        ref={rockRef} 
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : (item.color || '#A9A9A9')} 
          emissive={hovered ? (item.color || '#A9A9A9') : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.9}
        />
      </mesh>
      
      {/* Floating indicator if hoverable */}
      {hovered && !decorative && (
        <mesh 
          ref={indicatorRef} 
          position={[
            item.position[0],
            item.position[1] + 1.5,
            item.position[2]
          ]}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  );
}