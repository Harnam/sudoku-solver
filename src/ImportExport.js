const ImportExport = ({ vals, setVals, updateUI }) => {

    function importData() {
        const impexp = document.getElementById("impexp");
        const newVals = JSON.parse(impexp.value);
        setVals(newVals);
      }
    
      function exportData() {
        const impexp = document.getElementById("impexp");
        impexp.value = JSON.stringify(vals);
      }

    return (
      <div>
        <input id="impexp" type="text"></input>
        <button id="impbtn" onClick={ importData }>Import</button>
        <button id="expbtn" onClick={ exportData }>Export</button>
      </div>
    );
}

export default ImportExport;