import React, {useState, useEffect} from 'react';
import './Board.css'

const Board = () => {
    const [gameBoard, setGameBoard] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState(null)
    const [lock, setLock] = useState(true)
    
    const handleClick = (index) => {
      if(lock){
      if (gameBoard[index] === null) {
      const updatedBoard = [...gameBoard];
      updatedBoard[index] = currentPlayer;
      setGameBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      checkWinner(gameBoard);
      }
      }
    }
    
    const checkWinner = (board) => {
      if(board[0] !== null && board[0] === board[1] && board[1] === board[2]){
        setWinner(board[0])
        setLock(false)
      }else if (board[3] !== null && board[3] === board[4] && board[4] === board[5]) {
        setWinner(board[3])
        setLock(false)
      }else if (board[6] !== null && board[6] === board[7] && board[7] === board[8]) {
        setWinner(board[6])
        setLock(false)
      }else if (board[0] !== null && board[0] === board[3] && board[3] === board[6]) {
        setWinner(board[0])
        setLock(false)
      }else if (board[1] !== null && board[1] === board[4] && board[4] === board[7]) {
        setWinner(board[1])
        setLock(false)
      }else if (board[2] !== null && board[2] === board[5] && board[5] === board[8]) {
        setWinner(board[2])
        setLock(false)
      }else if (board[0] !== null && board[0] === board[4] && board[4] === board[8]) {
        setWinner(board[0])
        setLock(false)
      }else if (board[2] !== null && board[2] === board[4] && board[4] === board[6]) {
        setWinner(board[2])
        setLock(false)
      }
    }
    
    const reStart = () => {
     setGameBoard(Array(9).fill(null))
     setCurrentPlayer(winner === 'X' ? 'O' :'X')
     setWinner(null)
     setLock(true)
    }
    
   useEffect(() => {
     checkWinner(gameBoard);
   }, [gameBoard, currentPlayer]);

    
  return (
    <div className='game-board'>
    <div className='main'>
      <div className="heading">
      {winner ? <h2 className='win'> Player {winner} won</h2>:<h2>Tic-Tac-Toe</h2>}
      </div>
      <div className="board">
       {gameBoard.map((game, index) => {
        return(
          <div 
           key={index} 
           onClick={() => {handleClick(index)}}
           className="cell">
          <h1 className={game === 'X' ? 'player1' : 'player2'}>{game}</h1>
          </div>
            )
          })}
         </div>
       <div className='btns'>
         <button onClick={reStart}>Re-Start</button>
       </div>
     </div>
     {gameBoard.every(game => game !== null) && winner === null && <div className='modal'>
       <h3>Game Over</h3>
       <button onClick={reStart}>
         Play Again 
       </button>
     </div>}
    </div>
  )
}

export default Board;

