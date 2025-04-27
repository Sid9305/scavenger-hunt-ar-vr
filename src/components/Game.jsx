// src/components/Game.jsx

import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Avatar from './Avatar';
import Environment from './Environment';
import Player from './Player';

// Game items with Hindi song lyric hints and correct answers
const gameItems = [
  {
    id: 'item1',
    type: 'box',
    position: [5, 0.5, -3],
    color: '#ff9900',
    lyricHint: "Channa Mereya, Channa Mereya, Befikar in parindo si...",
    answer: "Channa Mereya",
    artist: "Arijit Singh"
  },
  {
    id: 'item2',
    type: 'tree',
    position: [-6, 0, 5],
    color: '#228B22',
    lyricHint: "Kaise hua, tu itna zaroori...",
    answer: "Kaise Hua",
    artist: "Vishal Mishra"
  },
  {
    id: 'item3',
    type: 'rock',
    position: [0, 0.5, 8],
    color: '#A9A9A9',
    lyricHint: "Mere mehboob qayamat hogi, aaj ruswa teri galiyon mein...",
    answer: "Mere Mehboob Qayamat Hogi",
    artist: "Kishore Kumar"
  },
  {
    id: 'item4',
    type: 'chest',
    position: [-4, 0.5, -5],
    color: '#8B4513',
    lyricHint: "Tujhe dekha to yeh jaana sanam...",
    answer: "Tujhe Dekha To",
    artist: "Kumar Sanu & Lata Mangeshkar"
  },
  {
    id: 'item5',
    type: 'crystal',
    position: [8, 1, 2],
    color: '#9370DB',
    lyricHint: "Pal pal dil ke paas tum rehti ho...",
    answer: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar"
  }
];

export default function Game({ avatar, onItemClick }) {
  const { camera } = useThree();
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0]);
  
  // Update camera to follow player
  useEffect(() => {
    const cameraOffset = [0, 5, 5];
    camera.position.set(
      playerPosition[0] + cameraOffset[0],
      playerPosition[1] + cameraOffset[1],
      playerPosition[2] + cameraOffset[2]
    );
    camera.lookAt(playerPosition[0], playerPosition[1], playerPosition[2]);
  }, [playerPosition, camera]);

  return (
    <Physics>
      <Player 
        avatar={avatar}
        position={playerPosition}
        setPosition={setPlayerPosition}
      />
      <Environment items={gameItems} onItemClick={onItemClick} />
    </Physics>
  );
}