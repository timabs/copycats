import React, { useContext, useRef } from "react";
import { SelectionContext } from "../Context/SelectionContext";
import { BlobContext } from "../Context/BlobContext";
import gsap from "gsap";

export default function Printer() {
  const { selected, selectedIndex } = useContext(SelectionContext);
  const { blob, blobURL } = useContext(BlobContext);
  const printerRef = useRef(null);

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
    applyStyles(copiedStyles, copiedImg);
    addCopyToDOM(copiedImg);
    animatePrint(copiedImg);
  };
  const copyCustom = () => {
    const imgToCopy = document.createElement("img");
    imgToCopy.src = blobURL;
    imgToCopy.style.width = `${selected.offsetWidth}px`;
    imgToCopy.style.height = `${selected.offsetHeight}px`;
    applyStyles(copiedStyles, imgToCopy);
    addCopyToDOM(imgToCopy);
    animatePrint(imgToCopy);
  };

  const copy = () => {
    if (selected && selectedIndex !== 2) {
      copyExisting();
    }
    if (blob && selectedIndex === 2) {
      copyCustom();
    }
  };
  return (
    <div className="h-1/6 flex items-center justify-center flex-grow-0 flex-shrink-0">
      <img
        className="h-full object-scale-down hover:cursor-pointer hover:scale-110 transition-all z-20"
        src="/printer.png"
        alt="Printer"
        ref={printerRef}
        onClick={() => copy()}
      ></img>
    </div>
  );
}
