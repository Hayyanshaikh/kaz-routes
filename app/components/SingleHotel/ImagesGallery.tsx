"use client";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
};

const ImagesGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  if (!images || images.length === 0)
    return <div className="flex-1 lg:w-1/2 flex flex-col gap-4"></div>;

  const [mainImage, ...subImages] = images;

  return (
    <section className="flex-1 lg:w-1/2 flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={mainImage}
          alt="Main Image"
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x200/E5E5E5/333?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Sub Images */}
      {subImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {subImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={img}
                alt={`Sub Image ${i + 1}`}
                fill
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/300x200/E5E5E5/333?text=Image+Not+Found";
                }}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ImagesGallery;
