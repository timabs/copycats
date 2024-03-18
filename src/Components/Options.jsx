import React, { useState } from "react";

export default function Options() {
  const [options, setOptions] = useState(["1", "2", "3", "4", "5"]);
  const scrollRight = () => {
    const firstElement = options.shift();
    setOptions([...options, firstElement]);
  };
  return (
    <div className="h-fit flex items-center justify-center">
      <div className="border-black w-fit h-fit flex justify-center gap-4 pb-8 items-center">
        <button>LEFT</button>
        {options.map((item, index) => (
          <div
            key={index}
            className={`slide border-blue-400 border-2 transition-all ${
              index === 2 ? "w-36 h-44" : "w-28 h-40"
            }`}
          >
            {item}
          </div>
        ))}
        <button onClick={() => scrollRight()}>RIGHT</button>
        {/* <div className="slide border-blue-400 border-2 w-28 h-40">1</div>
        <div className="slide border-blue-400 border-2 w-28 h-40">2</div>
        <div className="slide border-blue-400 border-2 w-36 h-44">3</div>
        <div className="slide border-blue-400 border-2 w-28 h-40">4</div>
        <div className="slide border-blue-400 border-2 w-28 h-40">5</div> */}
      </div>
    </div>
  );
}
