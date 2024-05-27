import React, { useState, useEffect } from "react";

function WindowSizeTitle() {
  const [size, setSize] = useState(getSize());

  const sizeTitle = ["Small", "Medium", "Large"];

  const [index, setIndex] = useState(null);

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
      if (768 <= size.width <= 1024) {
        setIndex(1);
        
      }
      if (size.width > 1024) {
        setIndex(2);
      }
      else setIndex(0);
      document.title = sizeTitle[index];
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Width: {size.width}</p>;
}

export default function App() {
  return (
    <div className="App">
      <WindowSizeTitle />
    </div>
  );
}
