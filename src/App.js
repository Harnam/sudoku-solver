import { useEffect, useState } from 'react';
import './App.css';

import Board from './Board';
import ImportExport from './ImportExport';

function App() {

  const [vals, setVals] = useState(
    JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null))))))
  );
  useEffect(() => updateUI(true), [vals]);

  const [ state , setState ] = useState(0);
  useEffect(setStateUI, [state])
  
  function handleValue (bigRow, bigSquare, row, square, val) {
    const newVals = vals.slice();
    newVals[bigRow][bigSquare][row][square] = val;
    setVals(newVals);
  }

  function buttonEnable(val) {
    const solvebtn = document.getElementById("solvebtn");
    solvebtn.disabled = val ? null : "disabled";
  }

  function changeAdjSqColor (bigRow, bigSquare, row, square, color) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        for(let k = 0; k < 3; k++) {
          for(let l = 0; l < 3; l++) {
            const isInsideBigSquare = (bigRow === i) && (bigSquare === j);
            const isInsideHorizontalLine = (bigRow === i) && (row === k);
            const isInsideVerticalLine = (bigSquare === j) && (square === l);
            const isNotItself = !((bigRow === i) && (bigSquare === j) && (row === k) && (square === l));
            if ((isInsideBigSquare || isInsideHorizontalLine || isInsideVerticalLine) && isNotItself) {
              document.getElementById("square"+ i + "" + j + "" + k + "" + l).style.backgroundColor = color;
            }
          }
        }
      }
    }
    updateUI();
  }

  function checkValidity(bigRow, bigSquare, row, square, val) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        for(let k = 0; k < 3; k++) {
          for(let l = 0; l < 3; l++) {
            const isInsideBigSquare = (bigRow === i) && (bigSquare === j);
            const isInsideHorizontalLine = (bigRow === i) && (row === k);
            const isInsideVerticalLine = (bigSquare === j) && (square === l);
            const isNotItself = !((bigRow === i) && (bigSquare === j) && (row === k) && (square === l));
            if ((isInsideBigSquare || isInsideHorizontalLine || isInsideVerticalLine) && isNotItself) {
              if(vals[i][j][k][l] && vals[i][j][k][l] === val) {
                document.getElementById("square"+ bigRow + "" + bigSquare + "" + row + "" + square).style.backgroundColor = "#ff6767";
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }

  function updateUI( resetBoard ) {
    let buttonEnabled = true;
    let countValid = 0;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        for(let k = 0; k < 3; k++) {
          for(let l = 0; l < 3; l++) {
            document.getElementById("square"+ i + "" + j + "" + k + "" + l).value = vals[i][j][k][l];
            if (resetBoard) document.getElementById("square"+ i + "" + j + "" + k + "" + l).style.backgroundColor = "white";
            if(vals[i][j][k][l]){
              let isValid = (checkValidity(i, j, k, l, vals[i][j][k][l]));
              if(isValid) countValid++;
              buttonEnabled = (state === 0) ? (buttonEnabled && isValid) : true ;
            }
          }
        }
      }
    }
    buttonEnable(buttonEnabled);
    if(countValid === 81) setState(2);
  }

  function setSquareStateUI() {
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        for(let k = 0; k < 3; k++)
          for(let l = 0; l < 3; l++)
            document.getElementById("square"+ i + "" + j + "" + k + "" + l).disabled = (state === 0) ? null : (state === 1) ? (vals[i][j][k][l]) : "disabled";
  }

  function setStateUI(){
    const heading = document.getElementById("heading");
    const solvebtn = document.getElementById("solvebtn");
    setSquareStateUI();
    switch(state) {
      case 0:
        heading.innerHTML = "Fill in Sudoku Problem";
        solvebtn.innerHTML = "Start Solving";
        break;
      case 1:
        heading.innerHTML = "Start Solving";
        solvebtn.innerHTML = "Ask Computer to Solve";
        break;
      case 2:
        heading.innerHTML = "Completed";
        solvebtn.innerHTML = "Reset All";
        break;
      default:
        heading.innerHTML = "Unsolvable";
        solvebtn.innerHTML = "Reset All";
    }
  }

  function resetBoard() {
    const emptyVals = JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null))))));
    setVals(emptyVals);
  }

  function startSolving() {
    switch(state) {
      case 0:
        setState(1);
        break;
      case 1:
        setState(2);
        break;
      default:
        setState(0);
        resetBoard();
    }
  }

  return (
    <div>
      <h1 id="heading"></h1>
      <Board handleValue={ handleValue } changeAdjSqColor={ changeAdjSqColor } />
      <button id="solvebtn" onClick={ startSolving }>Start Solving</button>
      <ImportExport vals={ vals } setVals={ setVals } updateUI={ updateUI } />
    </div>
  );
}

export default App;