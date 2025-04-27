// src/components/Player.jsx
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import Avatar from './Avatar';

export default function Player({ avatar, position, setPosition }) {
  const { camera } = useThree();
  const controls = useKeyboardControls();
  
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    type: 'Dynamic',
  }));
  
  // Update player position based on keyboard input
  useFrame(() => {
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, (controls.backward ? 1 : 0) - (controls.forward ? 1 : 0));
    const sideVector = new THREE.Vector3((controls.left ? 1 : 0) - (controls.right ? 1 : 0), 0, 0);
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(5); // movement speed
      
    api.velocity.set(direction.x, 0, direction.z);
  });
  
  // Get position from physics and update component state
  useEffect(() => {
    const unsubscribe = api.position.subscribe(v => setPosition(v));
    return unsubscribe;
  }, [api, setPosition]);
  
  return (
    <group ref={ref}>
      <Avatar 
        type={avatar?.id || 'human'}
        color={avatar?.color || '#E3A857'}
        scale={1.5}
        position={[0, -1, 0]}
      />
    </group>
  );
}