import React, { useContext, useRef, useState } from "react";
import { SelectionContext } from "../Context/SelectionContext";
import { BlobContext } from "../Context/BlobContext";
import gsap from "gsap";

export default function Printer({ error, setError }) {
  const { selected, selectedIndex } = useContext(SelectionContext);
  const { blob, blobURL } = useContext(BlobContext);
  const printerRef = useRef(null);
  const [copyAmount, setCopyAmount] = useState(1);

  const randomize = () => {
    return Math.random() * 2 - 1;
  };
  const getDuration = (maxWidth, translate) => {
    //adding a minimum to dur really helps uniformize ( is that a word?)
    //the animation of the copies shooting out
    const dur = (2.25 / maxWidth) * Math.abs(translate);
    if (dur < 0.5) {
      return 0.5;
    } else {
      return dur;
    }
  };
  const animatePrint = (element) => {
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 150;
    const randomX = (randomize() * maxWidth) / 2;
    const randomY = (randomize() * maxHeight) / 2;
    const { printerX, printerY } = printerRef.current.getBoundingClientRect();
    gsap.fromTo(
      element,
      { x: printerX, y: printerY, opacity: 0 },
      {
        x: randomX,
        y: randomY,
        opacity: 1,
        duration: getDuration(
          maxWidth,
          Math.abs(randomX) > Math.abs(randomY) ? randomX : randomY
        ),
      }
    );
  };
  const copiedStyles = {
    opacity: "0",
    position: "absolute",
    zIndex: "0",
    objectFit: "cover",
    flex: "0 0 auto",
  };
  const applyStyles = (stylesObj, element) => {
    Object.keys(stylesObj).forEach((prop) => {
      element.style[prop] = stylesObj[prop];
    });
  };
  const addCopyToDOM = (element) => {
    printerRef.current.parentNode.appendChild(element);
  };

  const copyExisting = () => {
    const imgToCopy = selected.children[0];
    const copiedImg = imgToCopy.cloneNode();
    copiedImg.width = imgToCopy.width;
    copiedImg.height = imgToCopy.height;
    copiedImg.classList.remove("w-full");
    copiedImg.classList.remove("h-full");
    copiedImg.classList.add("printed-copy");
    applyStyles(copiedStyles, copiedImg);
    addCopyToDOM(copiedImg);
    animatePrint(copiedImg);
  };
  const copyCustom = () => {
    const imgToCopy = document.createElement("img");
    imgToCopy.src = blobURL;
    imgToCopy.style.width = `${selected.offsetWidth}px`;
    imgToCopy.style.height = `${selected.offsetHeight}px`;
    imgToCopy.classList.add("printed-copy");
    applyStyles(copiedStyles, imgToCopy);
    addCopyToDOM(imgToCopy);
    animatePrint(imgToCopy);
  };

  const copy = () => {
    if (selected && selectedIndex !== 2) {
      setError(false);
      for (let i = 1; i <= copyAmount; i++) {
        copyExisting();
      }
    }
    if (blob && selectedIndex === 2) {
      setError(false);
      for (let i = 1; i <= copyAmount; i++) {
        copyCustom();
      }
    }
    if (!selected) {
      setError(true);
    }
  };
  const handleChange = (e) => {
    let copyNum = e.target.value;
    const maxCopies = 100;
    const minCopies = 1;
    if (copyNum > maxCopies) {
      copyNum = maxCopies;
      //for UI
      e.target.value = maxCopies;
    }
    if (copyNum < minCopies) {
      copyNum = minCopies;
      e.target.value = minCopies;
    }
    setCopyAmount(copyNum);
  };

  const clear = () => {
    const copies = document.querySelectorAll(".printed-copy");
    copies.forEach((copy) => {
      copy.classList.add("transition-all");
      copy.style.transitionDuration = "350ms";
      copy.style.opacity = 0;
      setTimeout(() => {
        copy.remove();
      }, 350);
    });
  };
  return (
    <div className="h-2/6 flex items-center justify-center flex-grow-0 flex-shrink-0 flex-col relative">
      <img
        className="h-1/2 object-scale-down hover:cursor-pointer hover:scale-110 transition-all z-20"
        src="/printer.png"
        alt="Printer"
        ref={printerRef}
        onClick={() => copy()}
      ></img>
      <div className="flex flex-row gap-2 items-start z-30">
        <button
          className="bg-red-800 text-white rounded-md px-4 py-2 z-30 active:bg-red-950 transition-all"
          onClick={() => clear()}
        >
          Clear
        </button>
        <div className="flex flex-col-reverse">
          <label htmlFor="copies" className="text-gray-600 opacity-85">
            Max: 100
          </label>
          <input
            type="number"
            className="rounded-md focus:outline-none border-black border-2 p-2 w-16 text-center z-30"
            id="copies"
            defaultValue={1}
            max={100}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
      </div>
      <div
        className={`${
          error ? "opacity-100" : "opacity-0"
        } absolute bottom-0 text-red-600 transition-all`}
      >
        Please select an image!
      </div>
    </div>
  );
}
