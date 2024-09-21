import { useEffect, useState } from 'react';
import './App.css';

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
            if(vals[i][j][k][l]){
              console.log(i,j,k,l)
              document.getElementById("square"+ i + "" + j + "" + k + "" + l).value = vals[i][j][k][l];
              let isValid = (checkValidity(i, j, k, l, vals[i][j][k][l]));
              buttonEnabled = buttonEnabled && isValid;
            }
          }
        }
      }
    }
  }

  function importData() {
    const impexp = document.getElementById("impexp");
    const newVals = JSON.parse(impexp.value);
    setVals(newVals);
    updateUI();
  }

  function exportData() {
    const impexp = document.getElementById("impexp");
    impexp.value = JSON.stringify(vals);
  }

  return (
    <div>
      <Board handleValue={ handleValue } />
      <button id="solvebtn">Solve</button>
      <div>
        <input id="impexp" type="text"></input>
        <button id="impbtn" onClick={ importData }>Import</button>
        <button id="expbtn" onClick={ exportData }>Export</button>
      </div>
    </div>
  );
}

function Square({ bigRow, bigSquare, row, square, handleValue }) {
  const uid = "square"+ bigRow + "" + bigSquare + "" + row + "" + square;

  let lastVal = "";

  function handleChange () {
    const sq = document.getElementById(uid);
    if((/[^1-9]/).test(sq.value)) sq.value = "";
    else {
      sq.style.backgroundColor = "white";
      handleValue(bigRow, bigSquare, row, square, Number(sq.value));
      sq.blur();
    }
  }

  function handleFocus() {
    const sq = document.getElementById(uid);
    lastVal = sq.value;
    sq.value = "";
  }

  function handleBlur() {
    const sq = document.getElementById(uid);
    if ( lastVal !== "" ) {
      if ( sq.value === "" )
        sq.value = lastVal;
      lastVal = "";
    }
  }

  return (
  <div className='square'>
    <input className="square-input" type="text" id={ uid } onFocus={ handleFocus } onBlur={ handleBlur } onChange={ handleChange } key="uid" maxLength="1" />
  </div> 
  );
}

function BigSquare ({ bigRow, bigSquare, handleValue }){
  let bigsquare = [];
  let row = [];
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      row.push(<Square key={ "square" + bigRow + "" + bigSquare + "" + i + j } bigRow={ bigRow } bigSquare={ bigSquare } row={ i } square={ j } handleValue={ handleValue } />)
    }
    bigsquare.push(<div key={ "row" + bigRow + "" + bigSquare + "" + i } className='row'>{ row }</div>);
    row = [];
  }
  return (
    <div className='bigSquare'>{ bigsquare }</div>
  );
}

function Board ({ handleValue }) {
  let board = [];
  let bigrow = [];
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      bigrow.push(<BigSquare key={ "bigsquare" + i + "" + j } bigRow={ i } bigSquare={ j } handleValue={ handleValue } />)
    }
    board.push(<div key={ "bigrow" + i } className='bigRow'>{ bigrow }</div>);
    bigrow = [];
  }
  return (
    <div className='board'>
      { board }
    </div>
  )
}

export default App;
