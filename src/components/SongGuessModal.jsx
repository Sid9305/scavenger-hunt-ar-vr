// src/components/SongGuessModal.jsx

import { useState } from 'react';

export default function SongGuessModal({ item, onGuess, onClose }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the guess is correct (case insensitive)
    const userGuess = guess.trim().toLowerCase();
    const correctAnswer = item.answer.toLowerCase();
    
    if (userGuess === correctAnswer) {
      setMessage(`Correct! It's "${item.answer}" by ${item.artist}`);
      setTimeout(() => {
        onGuess(true);
      }, 1500);
    } else {
      setMessage(`Incorrect. Try again!`);
      onGuess(false);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Lyric Hint</h2>
        <p className="text-gray-700 mb-6 italic">"{item.lyricHint}"</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter the song title"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            autoFocus
          />
          
          {message && (
            <p className={`mb-4 ${message.startsWith('Correct') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Guess
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}