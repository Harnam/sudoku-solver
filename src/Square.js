const Square = ({ bigRow, bigSquare, row, square, handleValue, changeAdjSqColor }) => {
    const uid = "square"+ bigRow + "" + bigSquare + "" + row + "" + square;
  
    let lastVal = "";
  
    function handleChange () {
      const sq = document.getElementById(uid);
      if(sq.value === " ") {
        sq.value = "";
        sq.style.backgroundColor = "white";
        handleValue(bigRow, bigSquare, row, square, null);
        sq.blur();
      } else if((/[^1-9]/).test(sq.value)) sq.value = "";
      else {
        sq.style.backgroundColor = "white";
        handleValue(bigRow, bigSquare, row, square, Number(sq.value));
        sq.blur();
      }
    }
  
    function handleFocus() {
      changeAdjSqColor(bigRow, bigSquare, row, square, "#dadada");
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
      changeAdjSqColor(bigRow, bigSquare, row, square, "white");
    }
  
    return (
    <div className='square'>
      <input className="square-input" type="text" id={ uid } onFocus={ handleFocus } onBlur={ handleBlur } onChange={ handleChange } key="uid" maxLength="1" />
    </div> 
    );
  }

  export default Square;