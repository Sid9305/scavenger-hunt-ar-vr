// src/hooks/useKeyboardControls.js

import { useState, useEffect } from 'react';

export function useKeyboardControls() {
const [movement, setMovement] = useState({
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
});

useEffect(() => {
  const handleKeyDown = (e) => {
    // Prevent default behavior for arrow keys and space
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        setMovement((m) => ({ ...m, forward: true }));
        break;
      case 's':
      case 'ArrowDown':
        setMovement((m) => ({ ...m, backward: true }));
        break;
      case 'a':
      case 'ArrowLeft':
        setMovement((m) => ({ ...m, left: true }));
        break;
      case 'd':
      case 'ArrowRight':
        setMovement((m) => ({ ...m, right: true }));
        break;
      case ' ':
        setMovement((m) => ({ ...m, jump: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        setMovement((m) => ({ ...m, forward: false }));
        break;
      case 's':
      case 'ArrowDown':
        setMovement((m) => ({ ...m, backward: false }));
        break;
      case 'a':
      case 'ArrowLeft':
        setMovement((m) => ({ ...m, left: false }));
        break;
      case 'd':
      case 'ArrowRight':
        setMovement((m) => ({ ...m, right: false }));
        break;
      case ' ':
        setMovement((m) => ({ ...m, jump: false }));
        break;
      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, []);

return movement;
}