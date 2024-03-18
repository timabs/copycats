import React, { useState } from "react";

export default function Options() {
  const [options, setOptions] = useState([
    <img
      src="/cat1.jpg"
      alt="First cat option"
      className="object-cover h-full w-full"
    ></img>,
    <img
      src="/cat2.jpg"
      alt="2nd cat option"
      className="object-cover h-full w-full"
    ></img>,
    <img src="" alt="Add your own" className="object-contain h-full"></img>,
    <img
      src="/cat3.jpg"
      alt="3rd cat option"
      className="object-cover h-full w-full"
    ></img>,
    <img
      src="/cat4.jpg"
      alt="4th cat option"
      className="object-cover h-full w-full"
    ></img>,
  ]);
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
