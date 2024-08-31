import React, { useState } from 'react';

const FloatingGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const gridItems = Array.from({ length: 16 }, (_, i) => i + 1);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="galaxy-background flex justify-center items-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <div className="background-image"></div>
      <div 
        className="relative w-[400px] h-[400px]"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div 
          className="absolute inset-0 grid grid-cols-4 gap-3 transition-transform duration-300 ease-out"
          style={{
            transform: `
              rotateX(${5 + mousePosition.y * 5}deg)
              rotateZ(-7deg)
              rotateY(${35 + mousePosition.x * 5}deg)
              translateZ(0px)
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          {gridItems.map((item) => (
            <button
              key={item}
              className={`
                relative bg-blue-500 bg-opacity-10 text-white font-bold text-2xl
                transition-all duration-300 focus:outline-none grid-item
              `}
              style={{
                transform: selectedItem === item 
                  ? 'translateZ(50px)'
                  : 'translateZ(0)',
              }}
              onClick={() => setSelectedItem(item === selectedItem ? null : item)}
            >
              <span className="absolute bottom-1 right-2">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingGrid;