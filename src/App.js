import { useState } from 'react';
import './App.css';

function App() {

  const [vals, setVals] = useState(
    JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null))))))
  );
  
  function handleValue (bigRow, bigSquare, row, square, val) {
    const newVals = vals.slice();
    console.log(bigRow, bigSquare, row, square, val);
    newVals[bigRow][bigSquare][row][square] = val;
    setVals(newVals);
  }

  return (
    <Board handleValue={ handleValue } />
  );
}

function Square({ bigRow, bigSquare, row, square, handleValue }) {
  const uid = "square"+ bigRow + "" + bigSquare + "" + row + "" + square;

  let lastVal = "";

  function handleChange () {
    const sq = document.getElementById(uid);
    if((/[^1-9]/).test(sq.value)) sq.value = "";
    else {
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
