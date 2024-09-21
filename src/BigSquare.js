import Square from "./Square";

function BigSquare ({ bigRow, bigSquare, handleValue, changeAdjSqColor }){
    let bigsquare = [];
    let row = [];
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        row.push(<Square key={ "square" + bigRow + "" + bigSquare + "" + i + j } bigRow={ bigRow } bigSquare={ bigSquare } row={ i } square={ j } handleValue={ handleValue } changeAdjSqColor={ changeAdjSqColor } />)
      }
      bigsquare.push(<div key={ "row" + bigRow + "" + bigSquare + "" + i } className='row'>{ row }</div>);
      row = [];
    }
    return (
      <div className='bigSquare'>{ bigsquare }</div>
    );
}

export default BigSquare;