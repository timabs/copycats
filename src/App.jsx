import Header from "./Components/Header";
import Options from "./Components/Options";
import Printer from "./Components/Printer";
import { SelectionProvider } from "./Context/SelectionContext";

function App() {
  return (
    <SelectionProvider>
      <div className="h-screen">
        <Header />
        <Options />
        <Printer />
      </div>
    </SelectionProvider>
  );
}

export default App;
