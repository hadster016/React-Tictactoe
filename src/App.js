import { useState } from 'react';

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      // alert(`squares, ${squares[i]}`);
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O"; // Set the square to X or O

    // Calculate row and column based on the index
    const row = Math.floor(i / 3);
    const col = i % 3;

    // Call onPlay with the updated squares and the row/col
    onPlay(nextSquares, row, col);
  }

  const winner = calculateWinner(squares);
  // alert(`winner ${winner}`);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
    const winningLine = winner[1];
    for (let i = 0; i < winningLine.length; i++) {
      document.querySelectorAll('.square')[winningLine[i]].classList.add('highlight');
    }

  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return  (
  <>
 <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          } ) }
        </div>
       ) ) }
  {/* <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div> */}
  </>
  );
}


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// function Square() {
//   const [value, setValue] = useState(null);

//   function handleClick() {
//     setValue('X');
//   }
//   return <button className="square"
//           onClick={handleClick}
//           >{value}
//           </button>;
// }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}


export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [reverseMoves, setReverseMoves] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, row, col) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: { row, col } }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Toggle the order of moves
  function toggleReverseMoves() {
    setReverseMoves(!reverseMoves);
  }

  // Create moves array
  const moves = history.map((entry, move) => {
    const { location } = entry;
    if (move === currentMove) {
      return <li key={move}>You are at move #{move}</li>; // Display current move
    } else {
      const description = move > 0 ? `Go to move #${move} (${location.row}, ${location.col})` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  // Reverse the moves if reverseMoves is true
  const displayedMoves = reverseMoves ? [...moves].reverse() : moves;

const Footer = () => {
  return (
      <footer>
          <div>
              <a href="https://hadster016.github.io/Portfolio/index.html">Go to Homepage</a>
          </div>
      </footer>
  );
};

  return (
    <div className="game">
      <div className="game-container">
      <h1 >Haider's Tic Tac Toe - React game</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      </div>
      <div className="game-info">
        <button onClick={toggleReverseMoves}>
          {reverseMoves ? 'Show Moves in Normal Order' : 'Show Moves in Reverse Order'}
        </button>
        <ol>{displayedMoves}</ol>
      </div>
      <footer>
        <Footer />

      </footer>
    </div>
  );
}

  // Check if the page is loaded in an iframe
  if (window.self !== window.top) {
    // Hide the "Return to Home" button
    const homeButton = document.querySelector('.footer');
    if (homeButton) {
      homeButton.style.display = 'none';
    }
  }
// export default function Game() {
//   // const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   // const currentSquares = history[history.length - 1];
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     // setHistory([...history, nextSquares]);
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//     // setXIsNext(!xIsNext);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//     document.querySelectorAll('.square').forEach(square => square.classList.remove('highlight'));
//     // setXIsNext(nextMove % 2 === 0);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
 
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

  // return (
  //   <div className="game">
  //     <div className="game-board">
  //       <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
  //     </div>
  //     <div className="game-info">
  //       <ol>{moves}</ol>
  //     </div>
  //   </div>
  // );
// }