
import './App.css';
import{useState,useEffect} from 'react';
import { Square } from './components/Square';
import { Patterns } from './patterns';

function App() {
  const [board,setBoard]=useState(["","","","","","","","",""]);
  const [player,setPlayer]=useState("X")
  const [result,setResult]=useState({winner: "none",state:"none"})

  useEffect(()=>{
      checkIfTie();
      checkWin();
  },[board])


  useEffect(()=>{
    if(result.state!=="none"){

      // alert(`Game Finished! Winning Player : ${result.winner}`)
     
    }
  },[result])

  const chooseSquare=(square)=>{
    if(board[square]===""){
    setBoard(board.map((val,idx)=>{
      if(idx===square){
        return player
      }
      return val;
    }))

    if(player==="X"){
      setPlayer("O")
    }
    else{
      setPlayer("X")
    }
  }
  }

  const checkWin=()=>{
    Patterns.forEach((curPattern)=>{
      const firstPlayer=board[curPattern[0]];
      if(firstPlayer==="")return ;
      let foundWinningPattern=true;
      curPattern.forEach((idx)=>{
        if(board[idx]!==firstPlayer){
          foundWinningPattern=false;
        }
      })
      if(foundWinningPattern){ 
        if(player ==="O"){
          setResult({winner:"X" ,state:"Won"})
        }
        else{
          setResult({winner:"O" ,state:"Won"})
        }
      }
    })
  }

  const checkIfTie=()=>{
    let filled=true;
    board.forEach((square)=>{
      if(square==="") {
        filled=false;
      }
    })
    if(filled===true){
      setResult({winner:"No One",state:"Tie "})
    }
  }

  const restartGame=()=>{
    setBoard(["","","","","","","","",""]);
    setPlayer("X")
    setResult({winner:"none",state:"none"});
  }


  return (
    <div className="App">
      
      <div className='board'>
        <div className='row' id='rowh'>
          <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}} />
          <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}} />
          <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
        </div>
        <div className='row' id='rowh'>
          <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}} />
          <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}} />
          <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}} />
          <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}} />
          <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
        </div>
      </div>
      <div className='result'>
        {result.winner!=="none"?<div>
          <h3>Winner:{result.winner}</h3>
          <button onClick={ restartGame}>Restart</button>
          </div>:<h3></h3>}
      </div>
    </div>
  );
}

export default App;
