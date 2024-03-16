import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const numImages = 30;
  const numCrops = 4;
  const [images, setImages] = useState([0, 0, 0, 0]);
  const [frozen, setFrozen] = useState([false, false, false, false]);
  const [foundImages, setFoundImages] = useState([]);
  const [imageFound, setImageFound] = useState(false);

  useEffect(() => {
    const timeout = setInterval(() => {
      const newArray = [...images];
      for (let i = 0; i < numCrops; i++) {
        if (frozen[i]) {
          continue;
        }
        const randNum = Math.round(Math.random() * numImages);

        newArray[i] = randNum;
      }

      const oneImage = images.every((val) => val === images[0]);
      if (oneImage) {
        const newFoundImages = [...foundImages, images[0]];
        setImageFound(true);
        setFoundImages(newFoundImages);

        setTimeout(() => {
          setImageFound(false);
        }, 4000);
      }
      setImages(newArray);
    }, 1000);

    return () => clearInterval(timeout);
  });

  function freezeImage(num) {
    const frozenImages = [...frozen];
    frozenImages[num] = !frozenImages[num];
    setFrozen(frozenImages);
  }

  return (
    <div className="container">
      {imageFound && <div className="light-flash" />}
      <div className="image-container">
        {images.map((_, idx) => {
          return (
            <img
              src={`./images/img${images[idx]}.jpg`}
              alt=""
              className={`image image${idx + 1} ${frozen[idx] ? "frozen" : ""}`}
              onClick={() => freezeImage(idx)}
            />
          );
        })}
      </div>

      {foundImages && (
        <div>
          <h1 className="header-text">Your photo album so far...</h1>
          <div className="found-image-container">
            {foundImages.map((imageIdx, idx) => {
              return (
                <img
                  key={idx}
                  src={`./images/img${imageIdx}.jpg`}
                  alt=""
                  className="found-image"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
