// src/components/Environment.jsx

import { usePlane, useBox } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { Sky, Cloud, Stars } from '@react-three/drei';
import * as THREE from 'three';
import TreeItem from './items/TreeItem.jsx';
import BoxItem from './items/Box.jsx';
import RockItem from './items/RockItem.jsx';
import ChestItem from './items/ChestItem.jsx';
import CrystalItem from './items/CrystalItem.jsx';

export default function Environment({ items, onItemClick }) {
  const { scene } = useThree();
  
  // Set scene background and fog for depth
  scene.background = new THREE.Color('#87CEEB');
  scene.fog = new THREE.Fog('#87CEEB', 30, 100);
  
  // Ground plane
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.1, 0]
  }));

  // Create a water plane
  const [waterRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-15, 0.2, 20]
  }));

  const renderItem = (item) => {
    switch (item.type) {
      case 'tree':
        return <TreeItem key={item.id} item={item} onClick={onItemClick} />;
      case 'box':
        return <BoxItem key={item.id} item={item} onClick={onItemClick} />;
      case 'rock':
        return <RockItem key={item.id} item={item} onClick={onItemClick} />;
      case 'chest':
        return <ChestItem key={item.id} item={item} onClick={onItemClick} />;
      case 'crystal':
        return <CrystalItem key={item.id} item={item} onClick={onItemClick} />;
      default:
        return null;
    }
  };

  // Generate random positions for decorative elements
  const generateRandomPositions = (count, minDistance = 5, maxDistance = 25) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      
      // Check if position is far enough from game items
      const isFarEnough = items.every(item => {
        const dx = item.position[0] - x;
        const dz = item.position[2] - z;
        return Math.sqrt(dx * dx + dz * dz) > 8;
      });
      
      if (isFarEnough) {
        positions.push([x, 0, z]);
      } else {
        // Try again
        i--;
      }
    }
    return positions;
  };

  // Random positions for elements
  const treePositions = generateRandomPositions(15);
  const rockPositions = generateRandomPositions(10, 10, 30);
  const flowerPositions = generateRandomPositions(25, 5, 35);
  
  return (
    <>
      {/* Sky and atmospheric elements */}
      <Sky sunPosition={[100, 10, 100]} turbidity={0.3} rayleigh={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} />
      
      {/* Ambient light and sun */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Main ground */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#3a6b35" 
          roughness={0.8}
          metalness={0.1}
          wireframe={false}
        >
          <texture attach="map" repeat={[50, 50]} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Water area */}
      <mesh ref={waterRef} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#1e4d8c" 
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Cloud formations */}
      <Cloud position={[-10, 15, -10]} args={[3, 2]} />
      <Cloud position={[10, 20, 10]} args={[4, 2]} />
      <Cloud position={[-20, 18, 20]} args={[5, 3]} />
      
      {/* Items in the environment */}
      {items.map(renderItem)}
      
      {/* Decorative elements */}
      <group>
        {/* Hills with different shapes */}
        <mesh position={[-15, 2, -15]} castShadow>
          <sphereGeometry args={[5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
        <mesh position={[20, 3, -20]} castShadow>
          <sphereGeometry args={[8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
        <mesh position={[-25, 5, 10]} castShadow>
          <sphereGeometry args={[10, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
        
        {/* Mountain in the distance */}
        <mesh position={[-40, 15, -40]} castShadow>
          <coneGeometry args={[20, 30, 4]} />
          <meshStandardMaterial color="#6b705c" />
        </mesh>
        
        {/* Decorative trees with varied sizes */}
        {treePositions.map((pos, i) => (
          <TreeItem 
            key={`decor-tree-${i}`}
            item={{ 
              id: `decor-tree-${i}`, 
              position: pos, 
              color: Math.random() > 0.3 ? '#228B22' : '#3a5a40',
              scale: 0.8 + Math.random() * 0.7
            }} 
            decorative
          />
        ))}
        
        {/* Decorative rocks */}
        {rockPositions.map((pos, i) => (
          <RockItem
            key={`decor-rock-${i}`}
            item={{
              id: `decor-rock-${i}`,
              position: pos,
              color: Math.random() > 0.5 ? '#A9A9A9' : '#6b705c',
              scale: 0.5 + Math.random() * 0.5
            }}
            decorative
          />
        ))}
        
        {/* Flowers and small plants */}
        {flowerPositions.map((pos, i) => (
          <mesh 
            key={`flower-${i}`}
            position={[pos[0], 0.15, pos[2]]} 
            castShadow
            rotation={[0, Math.random() * Math.PI * 2, 0]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
            <meshStandardMaterial color="#4d7c0f" />
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial 
                color={
                  Math.random() > 0.6 ? '#f472b6' : 
                  Math.random() > 0.5 ? '#facc15' : 
                  Math.random() > 0.3 ? '#ffffff' : '#fb7185'
                } 
              />
            </mesh>
          </mesh>
        ))}
        
        {/* Path from center to items */}
        {items.map((item, index) => (
          <group key={`path-${index}`}>
            {Array.from({ length: 10 }).map((_, i) => {
              const t = i / 9;
              const x = item.position[0] * t;
              const z = item.position[2] * t;
              return (
                <mesh 
                  key={`path-stone-${index}-${i}`}
                  position={[x, 0.05, z]} 
                  rotation={[0, Math.random() * Math.PI * 2, 0]}
                  visible={Math.random() > 0.5}
                >
                  <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
                  <meshStandardMaterial color="#d6d3d1" />
                </mesh>
              );
            })}
          </group>
        ))}
      </group>
    </>
  );
}