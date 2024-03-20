import React, { createContext, useState } from "react";

export const BlobContext = createContext();

export const BlobProvider = ({ children }) => {
  const [blob, setBlob] = useState(null);
  const [blobURL, setBlobURL] = useState(null);

  return (
    <BlobContext.Provider value={{ blob, setBlob, blobURL, setBlobURL }}>
      {children}
    </BlobContext.Provider>
  );
};
