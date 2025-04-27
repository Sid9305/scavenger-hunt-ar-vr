
// src/components/HUD.jsx

export default function HUD({ score, guessesLeft }) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
      <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md">
        Score: {score}
      </div>
      <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md">
        Guesses Left: {guessesLeft}
      </div>
    </div>
  );
}
