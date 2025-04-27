
// src/components/items/ChestItem.jsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

export default function ChestItem({ item, onClick, decorative = false }) {
  const [hovered, setHovered] = useState(false);
  const indicatorRef = useRef();
  
  const [boxRef] = useBox(() => ({
    mass: 1,
    position: item.position,
    args: [1, 0.7, 0.7],
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
      {/* Chest base */}
      <mesh
        ref={boxRef}
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.7, 0.7]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : (item.color || '#8B4513')} 
          emissive={hovered ? (item.color || '#8B4513') : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Chest lid */}
      <mesh
        position={[
          item.position[0],
          item.position[1] + 0.5,
          item.position[2]
        ]}
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
      <boxGeometry args={[1, 0.3, 0.7]} />
      <meshStandardMaterial 
        color={hovered ? '#ffffff' : (item.color || '#8B4513')} 
        emissive={hovered ? (item.color || '#8B4513') : '#000000'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
    
    {/* Gold lock */}
    <mesh
      position={[
        item.position[0],
        item.position[1] + 0.2,
        item.position[2] + 0.36
      ]}
      castShadow
    >
      <boxGeometry args={[0.3, 0.2, 0.1]} />
      <meshStandardMaterial color="#FFD700" />
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

