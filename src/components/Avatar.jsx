// src/components/Avatar.jsx

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Avatar({ type, color, position, scale, highlighted }) {
  const avatarRef = useRef();
  
  useFrame(() => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y += 0.01;
    }
  });

  // Different geometries based on avatar type
  const renderAvatar = () => {
    switch (type) {
      case 'robot':
        return (
          <group ref={avatarRef} position={position} scale={scale}>
            {/* Robot body */}
            <mesh castShadow>
              <boxGeometry args={[1, 1.5, 0.5]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Robot head */}
            <mesh castShadow position={[0, 1.25, 0]}>
              <boxGeometry args={[0.75, 0.75, 0.75]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Robot eyes */}
            <mesh position={[-0.2, 1.25, 0.4]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={highlighted ? "#ff0000" : "#ffffff"} />
            </mesh>
            <mesh position={[0.2, 1.25, 0.4]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={highlighted ? "#ff0000" : "#ffffff"} />
            </mesh>
          </group>
        );
      
      case 'alien':
        return (
          <group ref={avatarRef} position={position} scale={scale}>
            {/* Alien body */}
            <mesh castShadow>
              <capsuleGeometry args={[0.5, 1, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Alien head */}
            <mesh castShadow position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.6, 32, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Alien eyes */}
            <mesh position={[-0.25, 1.3, 0.4]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color={highlighted ? "#ff0000" : "#000000"} />
            </mesh>
            <mesh position={[0.25, 1.3, 0.4]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color={highlighted ? "#ff0000" : "#000000"} />
            </mesh>
          </group>
        );
        
      case 'human':
      default:
        return (
          <group ref={avatarRef} position={position} scale={scale}>
            {/* Human body */}
            <mesh castShadow>
              <capsuleGeometry args={[0.5, 1, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Human head */}
            <mesh castShadow position={[0, 1.25, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#F5DEB3" />
            </mesh>
            {/* Human hair */}
            <mesh castShadow position={[0, 1.5, 0]}>
              <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={highlighted ? "#ff0000" : "#8B4513"} />
            </mesh>
          </group>
        );
    }
  };

  return renderAvatar();
}
