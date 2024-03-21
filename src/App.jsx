import React, { useState } from "react";
import Header from "./Components/Header";
import Options from "./Components/Options";
import Printer from "./Components/Printer";
import Results from "./Components/Results";
import { BlobProvider } from "./Context/BlobContext";
import { SelectionProvider } from "./Context/SelectionContext";

function App() {
  const [results, setResults] = useState([]);
  return (
    <SelectionProvider>
      <BlobProvider>
        <div className="h-screen">
          <Header />
          <Options />
          <Printer results={results} setResults={setResults} />
        </div>
      </BlobProvider>
    </SelectionProvider>
  );
}

export default App;
