import React, { useContext, useRef } from "react";
import { SelectionContext } from "../Context/SelectionContext";
import { BlobContext } from "../Context/BlobContext";
import gsap from "gsap";

export default function Printer({ results, setResults }) {
  const { selected, selectedIndex } = useContext(SelectionContext);
  const { blobURL } = useContext(BlobContext);
  const printerRef = useRef(null);

  const randomize = () => {
    return Math.random() * 2 - 1;
  };
  const getTranslateX = (element) => {
    const compStyle = window.getComputedStyle(element);
    const matrix = compStyle.transform;
    return matrix[4];
  };
  // const getTranslateY = (element) => {
  //   const compStyle = window.getComputedStyle(element);
  //   const matrix = compStyle.transform;
  //   return matrix[5];
  // };
  const getDuration = (maxWidth, translate) => {
    return (2.25 / maxWidth) * Math.abs(translate);
  };
  const animatePrint = (element) => {
    const maxWidth = window.innerWidth - 300;
    const maxHeight = window.innerHeight - 300;
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
    setTimeout(() => {
      getTranslateX(element);
    }, 1000);
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
    imgToCopy.width = selected.offsetWidth;
    imgToCopy.height = selected.offsetHeight;
    applyStyles(copiedStyles, imgToCopy);
    addCopyToDOM(imgToCopy);
    animatePrint(imgToCopy);
  };

  const applyStyles = (stylesObj, element) => {
    Object.keys(stylesObj).forEach((prop) => {
      element.style[prop] = stylesObj[prop];
    });
  };
  const copiedStyles = {
    opacity: "0",
    position: "absolute",
    zIndex: "0",
    objectFit: "cover",
  };
  const copy = () => {
    console.log(`Printer:`);
    console.log(printerRef.current.getBoundingClientRect());
    if (selected && selectedIndex !== 2) {
      copyExisting();
    }
    if (selected && selectedIndex === 2) {
      copyCustom();
    }
  };
  return (
    <div className="h-1/6 flex items-center justify-center ">
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
