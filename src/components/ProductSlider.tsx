import React, { useState } from "react";
// Ensure you have a CSS file for styling

interface ProductSliderProps {
  imageUrls: string[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;
    setMagnifierPosition({ x, y });
  };

  return (
    <div className="product-slider">
      <button onClick={prevSlide} className="slider-button prev">
        &lt;
      </button>
      <div
        className="slider-image-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        <img
          src={imageUrls[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="slider-image"
        />
        {showMagnifier && (
          <div
            className="magnifier"
            style={{
              backgroundImage: `url(${imageUrls[currentIndex]})`,
              backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
              left: `${magnifierPosition.x}%`,
              top: `${magnifierPosition.y}%`,
            }}
          />
        )}
      </div>
      <button onClick={nextSlide} className="slider-button next">
        &gt;
      </button>

      <div className="thumbnail-navigation">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
