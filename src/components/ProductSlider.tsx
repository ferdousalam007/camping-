import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

interface ProductSliderProps {
  imageUrls: string[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div>
      <div className="product-slider overflow-hidden max-h-[500px]">
        <button onClick={prevSlide} className="slider-button prev">
          &lt;
        </button>
        <div className="slider-image-container">
          <div className=" mx-auto ">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: `Product Image ${currentIndex + 1}`,
                  isFluidWidth: true,
                  src: imageUrls[currentIndex],
                },
                largeImage: {
                  src: imageUrls[currentIndex],
                  width: 836,
                  height: 1400,
                },
                enlargedImagePosition: "over",
                lensStyle: { backgroundColor: "rgba(0,0,0,.3)" },
              }}
            />
          </div>
        </div>
        <button onClick={nextSlide} className="slider-button next">
          &gt;
        </button>
      </div>
      <div className="thumbnail-navigation">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
