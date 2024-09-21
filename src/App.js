import { useEffect, useState } from 'react';
import './App.css';

import Board from './Board';
import ImportExport from './ImportExport';

function App() {

  const [vals, setVals] = useState(
    JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null))))))
  );
  useEffect(updateUI, [vals]);
  
  function handleValue (bigRow, bigSquare, row, square, val) {
    const newVals = vals.slice();
    newVals[bigRow][bigSquare][row][square] = val;
    setVals(newVals);
  }

  function buttonEnable(val) {
    const solvebtn = document.getElementById("solvebtn");
    solvebtn.disabled = val ? null : "disabled";
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

  function updateUI() {
    let buttonEnabled = true;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        for(let k = 0; k < 3; k++) {
          for(let l = 0; l < 3; l++) {
            document.getElementById("square"+ i + "" + j + "" + k + "" + l).value = vals[i][j][k][l];
            document.getElementById("square"+ i + "" + j + "" + k + "" + l).style.backgroundColor = "white";
            if(vals[i][j][k][l]){
              let isValid = (checkValidity(i, j, k, l, vals[i][j][k][l]));
              buttonEnabled = buttonEnabled && isValid;
            }
          }
        }
      }
    }
    buttonEnable(buttonEnabled);
  }

  return (
    <div>
      <Board handleValue={ handleValue } />
      <button id="solvebtn">Solve</button>
      <ImportExport vals={ vals } setVals={ setVals } updateUI={ updateUI } />
    </div>
  );
}

export default App;