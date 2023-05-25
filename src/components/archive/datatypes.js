import React, { useState } from "react";
import Papa from "papaparse";

function App() {
  const [dataTypes, setDataTypes] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const headers = result.meta.fields;
        const firstRow = result.data[0];
        const types = {};
        headers.forEach((header) => {
          types[header] = typeof firstRow[header];
        });
        setDataTypes(types);
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {dataTypes && (
        <div>
          <h3>Data Types:</h3>
          <ul>
            {Object.entries(dataTypes).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
