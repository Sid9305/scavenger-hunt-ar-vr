// src/App.jsx

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import Game from './components/Game';
import AvatarSelection from './components/AvatarSelection';
import HUD from './components/HUD';
import SongGuessModal from './components/SongGuessModal';

function App() {
  const [gameState, setGameState] = useState('avatar-selection'); // 'avatar-selection', 'playing', 'game-over'
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [score, setScore] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAvatarSelected = (avatar) => {
    setSelectedAvatar(avatar);
    setGameState('playing');
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const handleGuess = (correct) => {
    if (correct) {
      setScore(score + 1);
      setModalOpen(false);
      setActiveItem(null);
    } else {
      setGuessesLeft(guessesLeft - 1);
      if (guessesLeft <= 1) {
        // Game over if no guesses left
        setGameState('game-over');
      }
    }
  };

  const restartGame = () => {
    setGameState('avatar-selection');
    setSelectedAvatar(null);
    setScore(0);
    setGuessesLeft(3);
    setActiveItem(null);
  };

  return (
    <div className="h-screen w-screen">
      {gameState === 'avatar-selection' && (
        <AvatarSelection onSelect={handleAvatarSelected} />
      )}
      
      {gameState === 'playing' && (
        <>
          <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            <Sky sunPosition={[100, 20, 100]} />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={1}
              maxDistance={50}
            />
            <Game 
              avatar={selectedAvatar}
              onItemClick={handleItemClick}
            />
          </Canvas>
          <HUD score={score} guessesLeft={guessesLeft} />
          {modalOpen && (
            <SongGuessModal 
              item={activeItem}
              onGuess={handleGuess}
              onClose={() => setModalOpen(false)}
            />
          )}
        </>
      )}

      {gameState === 'game-over' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
          <h1 className="text-4xl mb-4">Game Over!</h1>
          <p className="text-2xl mb-8">Your score: {score}</p>
          <button 
            onClick={restartGame}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;