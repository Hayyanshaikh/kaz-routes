import Image from "next/image";

type DishCardProps = {
  dish: {
    name: string;
    description: string | null;
    images: string[];
    variants: {
      size: string;
      price: string;
    }[];
  };
};

const DishCard = ({ dish }: DishCardProps | any) => {
  const image =
    dish.images?.[0] || "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Dish Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden shadow">
        <Image
          layout="fill"
          src={image}
          alt={dish.name}
          className="w-full h-full object-cover !relative"
        />
      </div>

      <div className="flex sm:flex-row flex-col gap-4">
        {/* Variants */}
        {dish.variants.map((v: any, i: number) => (
          <div key={i} className="p-4 border rounded-lg flex-1 bg-gray-50">
            <p className="text-sm text-primary font-medium mb-2">
              {v.price &&
                Number(v.price).toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  minimumFractionDigits: 2,
                })}
            </p>
            <h4 className="font-semibold">{v.size}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishCard;
