// src/components/AvatarSelection.jsx

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';

const avatarOptions = [
  { id: 'robot', name: 'Robot', color: '#5D8AA8' },
  { id: 'alien', name: 'Alien', color: '#50C878' },
  { id: 'human', name: 'Human', color: '#E3A857' },
];

export default function AvatarSelection({ onSelect }) {
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-white">Choose Your Avatar</h1>
      
      <div className="flex gap-8">
        {avatarOptions.map((avatar) => (
          <div 
            key={avatar.id}
            className="flex flex-col items-center"
            onMouseEnter={() => setHoveredAvatar(avatar.id)}
            onMouseLeave={() => setHoveredAvatar(null)}
            onClick={() => onSelect(avatar)}
          >
            <div className="w-48 h-48 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Avatar
                  type={avatar.id}
                  color={avatar.color}
                  scale={1}
                  position={[0, -1, 0]}
                  highlighted={hoveredAvatar === avatar.id}
                />
              </Canvas>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">{avatar.name}</h2>
          </div>
        ))}
      </div>
      
      <p className="mt-12 text-gray-400 max-w-md text-center">
        Select your avatar to join the musical scavenger hunt!
        Find objects, guess songs, and score points.
      </p>
    </div>
  );
}
