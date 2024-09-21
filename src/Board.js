import BigSquare from "./BigSquare";

const Board = ({ handleValue, changeAdjSqColor }) => {
    let board = [];
    let bigrow = [];
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        bigrow.push(<BigSquare key={ "bigsquare" + i + "" + j } bigRow={ i } bigSquare={ j } handleValue={ handleValue } changeAdjSqColor={ changeAdjSqColor } />)
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

export default Board;