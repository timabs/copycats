import React from "react";

export default function Results({ results }) {
  return (
    <div className="h-2/6 flex items-center justify-center">
      <div className="w-1/4 flex items-center justify-center flex-wrap">
        {results.map((result, index) => (
          <img
            key={index}
            src={result.src}
            style={{ width: result.width, height: result.height }}
          />
        ))}
      </div>
    </div>
  );
}
