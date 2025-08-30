"use client";
import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
};

const ImagesGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openPopup = (index: number) => {
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full lg:max-w-xl mx-auto flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setPopupOpen(true)}
          onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/600x400/E5E5E5/333?text=Image+Not+Found")
          }
        />
      </div>

      {/* Thumbnails Slider */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative w-20 h-20 rounded-lg overflow-hidden shadow-sm cursor-pointer border-2 ${
              currentIndex === i ? "border-blue-500" : "border-transparent"
            } flex-shrink-0`}
            onClick={() => setCurrentIndex(i)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/150x150/E5E5E5/333?text=No+Image")
              }
            />
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-[#0009] flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setPopupOpen(false)}
          >
            &#10005;
          </button>
          <button
            className="absolute left-4 text-white text-2xl font-bold"
            onClick={prevImage}
          >
            &#8592;
          </button>
          <div className="relative w-4/5 h-4/5">
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/600x400/E5E5E5/333?text=Image+Not+Found")
              }
            />
          </div>
          <button
            className="absolute right-4 text-white text-2xl font-bold"
            onClick={nextImage}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagesGallery;
