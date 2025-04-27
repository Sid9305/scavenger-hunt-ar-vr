// src/components/items/BoxItem.jsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

export default function BoxItem({ item, onClick, decorative = false }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  
  const [boxRef] = useBox(() => ({
    mass: 1,
    position: item.position,
    args: [1, 1, 1],
    type: 'Static',
  }));
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  
  const handleClick = () => {
    if (!decorative && onClick) {
      onClick(item);
    }
  };
  
  return (
    <mesh
      ref={boxRef}
      castShadow
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#ffffff' : item.color} 
        emissive={hovered ? item.color : '#000000'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
      {/* Floating indicator if hoverable */}
      {hovered && !decorative && (
        <mesh ref={ref} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
        </mesh>
      )}
    </mesh>
  );
}



