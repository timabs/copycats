import React, { useState } from "react";
import Header from "./Components/Header";
import Options from "./Components/Options";
import Printer from "./Components/Printer";
import { BlobProvider } from "./Context/BlobContext";
import { SelectionProvider } from "./Context/SelectionContext";

function App() {
  const [error, setError] = useState(false);
  return (
    <SelectionProvider>
      <BlobProvider>
        <div className="h-screen flex flex-col">
          <Header />
          <Options error={error} setError={setError} />
          <Printer error={error} setError={setError} />
        </div>
      </BlobProvider>
    </SelectionProvider>
  );
}

export default App;
