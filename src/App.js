import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const numImages = 30;
  const numCrops = 4;
  const [images, setImages] = useState([0, 0, 0, 0]);
  const [frozen, setFrozen] = useState([false, false, false, false]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newArray = [...images];
      for (let i = 0; i < numCrops; i++) {
        if (frozen[i]) {
          continue;
        }
        const randNum = Math.round(Math.random() * numImages);

        newArray[i] = randNum;
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
    <div>
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
    </div>
  );
}

export default App;
