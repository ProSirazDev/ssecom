
 
 const handleExportCsv = (gridRef,fileName) => {

    console.log("Function Called");
    
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv({
        allColumns: true, // Export all columns (true will export every column)
        fileName,// Set a custom filename
      });
    }
  };

  export default handleExportCsv