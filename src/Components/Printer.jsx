import React, { useContext } from "react";
import { SelectionContext } from "../Context/SelectionContext";
import { BlobContext } from "../Context/BlobContext";

export default function Printer({ results, setResults }) {
  const { selected, selectedIndex } = useContext(SelectionContext);
  const { blobURL } = useContext(BlobContext);
  const copy = () => {
    if (selected && selectedIndex !== 2) {
      const imgToCopy = selected.children[0];
      const copiedImg = imgToCopy.cloneNode();
      copiedImg.width = imgToCopy.width;
      copiedImg.height = imgToCopy.height;
      setResults([...results, copiedImg]);
    }
    if (selected && selectedIndex === 2) {
      const imgToCopy = document.createElement("img");
      imgToCopy.src = blobURL;
      imgToCopy.width = selected.offsetWidth;
      imgToCopy.height = selected.offsetHeight;
      setResults([...results, imgToCopy]);
    }
  };
  return (
    <div
      className="h-1/6 flex items-center justify-center z-20"
      onClick={() => copy()}
    >
      <img
        className="w-1/4 h-full object-scale-down hover:cursor-pointer hover:scale-110 transition-all"
        src="/printer.png"
        alt="Printer"
      ></img>
    </div>
  );
}
