import React from "react";

export default function ImgUploader({ tempImg, id }) {
  const processImg = async (file) => {
    const maxWidth = 800;
    const maxHeight = 600;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          async (blob) => {
            const blobURL = URL.createObjectURL(blob);
            tempImg(blobURL, blob);
          },
          "image/webp",
          0.9
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  const handleImgChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      processImg(file);
    }
  };

  return (
    <div style={{ width: "0%" }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImgChange}
        onClick={(e) => e.stopPropagation()}
        style={{ display: "none" }}
        id={id}
        title="Image Uploader"
      />
    </div>
  );
}
