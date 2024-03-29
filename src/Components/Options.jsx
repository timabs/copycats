import React, { useContext, useState } from "react";
import { SelectionContext } from "../Context/SelectionContext";
import ImgUploader from "./ImageUploader";
import { BlobContext } from "../Context/BlobContext";

export default function Options({ error, setError }) {
  const { selected, setSelected, selectedIndex, setSelectedIndex } =
    useContext(SelectionContext);
  const { setBlob, setBlobURL } = useContext(BlobContext);
  const handleImgUpload = (blobURL, blob) => {
    setBlobURL(blobURL);
    setBlob(blob);
  };
  const [options, setOptions] = useState([
    <img
      src="/cat1.jpg"
      alt="First cat option"
      className="object-cover h-full w-full z-20 relative"
    ></img>,
    <img
      src="/cat2.jpg"
      alt="2nd cat option"
      className="object-cover h-full w-full z-20 relative"
    ></img>,
    <label className="w-full h-full flex items-center justify-center text-center cursor-pointer z-20 relative">
      <ImgUploader tempImg={handleImgUpload} id="choose-cat" />
      Choose Your Own
    </label>,
    <img
      src="/cat3.jpg"
      alt="3rd cat option"
      className="object-cover h-full w-full z-20 relative"
    ></img>,
    <img
      src="/cat4.jpg"
      alt="4th cat option"
      className="object-cover h-full w-full z-20 relative"
    ></img>,
  ]);

  const handleSelect = (e, index) => {
    setError(false);
    const selection = e.target.parentNode;
    if (selection === selected && selectedIndex !== 2) {
      setSelected(null);
      setSelectedIndex(-1);
    } else {
      setSelected(selection);
      setSelectedIndex(index);
    }
  };
  return (
    <div className="h-fit flex items-center justify-center z-20">
      <div className="border-black w-fit h-fit flex justify-center gap-4  items-center z-20">
        {options.map((img, index) => (
          <div
            key={index}
            className={`slide transition-all w-28 h-40 cursor-pointer hover:scale-110 ${
              index === 2 ? "bg-amber-100" : ""
            } ${
              index === selectedIndex
                ? "border-2 border-blue-700 shadow-md shadow-blue-950"
                : ""
            }`}
            onClick={(e) => handleSelect(e, index)}
          >
            {img}
          </div>
        ))}
      </div>
    </div>
  );
}
