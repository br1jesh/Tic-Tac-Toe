import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],           
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  const status = winner
    ? `Player ${winner === 'X' ? '1' : '2'} WON!`
    : isBoardFull
      ? "It's a tie!"
      : `Next Player: ${xIsNext ? 'X (Player 1)' : 'O (Player 2)'}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXisNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
  };

  return (
    <div className="game">
      <h1>Brijesh's TIC-TAC-TOE</h1>
      <p>{status}</p>
      <Board squares={squares} onClick={handleClick} />
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
