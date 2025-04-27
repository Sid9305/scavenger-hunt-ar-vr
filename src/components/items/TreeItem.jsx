// src/components/items/TreeItem.jsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCylinder, useBox } from '@react-three/cannon';

export default function TreeItem({ item, onClick, decorative = false }) {
  const [hovered, setHovered] = useState(false);
  const indicatorRef = useRef();
  
  const scale = item.scale || 1;
  
  // Tree trunk
  const [trunkRef] = useCylinder(() => ({
    mass: 0,
    position: item.position,
    args: [0.3 * scale, 0.3 * scale, 1 * scale, 8],
    type: 'Static',
  }));
  
  // Tree top (foliage)
  const [topRef] = useBox(() => ({
    mass: 0,
    position: [
      item.position[0],
      item.position[1] + 2 * scale,
      item.position[2]
    ],
    args: [1.5 * scale, 2 * scale, 1.5 * scale],
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
      {/* Tree trunk */}
      <mesh 
        ref={trunkRef} 
        castShadow
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.3 * scale, 0.3 * scale, 1 * scale, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Tree foliage */}
      <mesh 
        ref={topRef} 
        castShadow
        position={[
          item.position[0],
          item.position[1] + 2 * scale,
          item.position[2]
        ]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5 * scale, 2 * scale, 1.5 * scale]} />
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : (item.color || '#228B22')} 
          emissive={hovered ? (item.color || '#228B22') : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Floating indicator if hoverable */}
      {hovered && !decorative && (
        <mesh 
          ref={indicatorRef} 
          position={[
            item.position[0],
            item.position[1] + 4 * scale,
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
