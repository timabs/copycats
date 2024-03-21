import React from "react";
import Header from "./Components/Header";
import Options from "./Components/Options";
import Printer from "./Components/Printer";
import { BlobProvider } from "./Context/BlobContext";
import { SelectionProvider } from "./Context/SelectionContext";

function App() {
  return (
    <SelectionProvider>
      <BlobProvider>
        <div className="h-screen">
          <Header />
          <Options />
          <Printer />
        </div>
      </BlobProvider>
    </SelectionProvider>
  );
}

export default App;
