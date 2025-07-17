import { FilterConfig } from "@/app/types/CommonType";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const FILE_BASE_URL = process.env.NEXT_PUBLIC_FILE_BASE_URL;

export const DISPLAY_DATE = "MMMM DD, YYYY";

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search?category=sites", label: "Sites" },
  { href: "/search?category=restaurants", label: "Restaurants" },
  { href: "/search?category=packages", label: "Packages" },
  { href: "/search?category=hotels", label: "Hotels" },
  // { href: "/about", label: "About" },
  // { href: "/contact", label: "Contact" },
];

export const CATEGORIES = [
  { value: "sites", label: "Sites" },
  { value: "restaurants", label: "Restaurants" },
  { value: "packages", label: "Packages" },
  { value: "hotels", label: "Hotels" },
  { value: "cars", label: "Cars" },
];

// Data for the slider items
export const HERO_SLIDES_DATA = {
  heading: "Explore the World with Us",
  description: "Dive into cutting-edge technology and build the future.",
  imageUrl: "/images/hero/hero-3.jpg",
  buttonText: "Get Started",
};

export const DESTINATION_OPTIONS = [
  {
    label: "Select Destination",
    value: "destination",
  },
  {
    label: "Almaty",
    value: "almaty",
  },
  {
    label: "Astana",
    value: "astana",
  },
  {
    label: "Shymkent",
    value: "shymkent",
  },
  {
    label: "Aktau",
    value: "aktau",
  },
  {
    label: "Turkistan",
    value: "turkistan",
  },
  {
    label: "Karaganda",
    value: "karaganda",
  },
  {
    label: "Pavlodar",
    value: "pavlodar",
  },
  {
    label: "Kostanay",
    value: "kostanay",
  },
];

export const VEHICLE_TYPE_OPTIONS = [
  {
    label: "Select Vehicle Type",
    value: "vehicleType",
  },
  {
    label: "Car",
    value: "car",
  },
  {
    label: "Bus",
    value: "bus",
  },
  {
    label: "Bike",
    value: "bike",
  },
];

export const HOTEL_PREFERENCE_OPTIONS = [
  {
    label: "Select Hotel Preference",
    value: "hotelPreference",
  },
  {
    label: "Luxury",
    value: "luxury",
  },
  {
    label: "Budget",
    value: "budget",
  },
  {
    label: "Family-friendly",
    value: "familyFriendly",
  },
];

export const PACKAGE_TYPE_OPTIONS = [
  {
    label: "Select Package Type",
    value: "packageType",
  },
  {
    label: "Adventure",
    value: "adventure",
  },
  {
    label: "Relaxation",
    value: "relaxation",
  },
  {
    label: "Cultural",
    value: "cultural",
  },
];

export const PACKAGES = [
  {
    imageUrl: "/images/packages/adventure-in-the-mountains.jpg",
    rating: 4.5,
    title: "Adventure in the Mountains",
    description:
      "Expert-guided tours exploring breathtaking mountains with camping and photography.",
    duration: "3 Days",
    maxParticipants: 10,
    highlights: ["Guided Tours", "Camping", "Photography"],
    price: 299,
  },
  {
    imageUrl: "/images/packages/cultural-heritage-tour.jpg",
    rating: 4.8,
    title: "Cultural Heritage Tour",
    description:
      "Discover rich cultural heritage, local cuisine, museum visits, and workshops.",
    duration: "5 Days",
    maxParticipants: 15,
    highlights: ["Museum Visits", "Local Cuisine", "Workshops"],
    price: 499,
  },
  {
    imageUrl: "/images/packages/beach-retreat-snorkeling.jpg",
    rating: 4.2,
    title: "Beach Retreat & Snorkeling",
    description:
      "Relax on pristine beaches, enjoy snorkeling, and a beautiful sunset cruise.",
    duration: "4 Days",
    maxParticipants: 8,
    highlights: ["Snorkeling", "Beach Relaxation", "Sunset Cruise"],
    price: 399,
  },
  {
    imageUrl: "/images/packages/wildlife-safari-adventure.jpg",
    rating: 4.7,
    title: "Wildlife Safari Adventure",
    description:
      "Witness incredible wildlife on a jeep safari with bird watching and photography.",
    duration: "6 Days",
    maxParticipants: 12,
    highlights: ["Jeep Safari", "Bird Watching", "Nature Photography"],
    price: 649,
  },
  {
    imageUrl: "/images/packages/desert-glamping-experience.jpg",
    rating: 4.9,
    title: "Desert Glamping Experience",
    description:
      "Magical night under stars, camel ride, traditional dinner in luxury camp.",
    duration: "2 Days",
    maxParticipants: 6,
    highlights: ["Stargazing", "Camel Ride", "Traditional Dinner"],
    price: 549,
  },
];

export const DESTINATION_DATA = [
  {
    imageUrl: "/images/destinations/paris.jpg",
    imageAlt: "Eiffel Tower in Paris",
    buttonText: "Book Paris Trip",
  },
  {
    imageUrl: "/images/destinations/tokyo.jpg",
    imageAlt: "Tokyo Cityscape",
    buttonText: "Book Tokyo Trip",
  },
  {
    imageUrl: "/images/destinations/new-york.jpg",
    imageAlt: "New York City Skyline",
    buttonText: "Book NYC Trip",
  },
  {
    imageUrl: "/images/destinations/rome.jpg",
    imageAlt: "Colosseum in Rome",
    buttonText: "Book Rome Trip",
  },
  {
    imageUrl: "/images/destinations/london.jpg",
    imageAlt: "Big Ben in London",
    buttonText: "Book London Trip",
  },
  {
    imageUrl: "/images/destinations/dubai.jpg",
    imageAlt: "Burj Khalifa in Dubai",
    buttonText: "Book Dubai Trip",
  },
  {
    imageUrl: "/images/destinations/sydney.jpg",
    imageAlt: "Opera House in Sydney",
    buttonText: "Book Sydney Trip",
  },
  {
    imageUrl: "/images/destinations/istanbul.jpg",
    imageAlt: "Blue Mosque in Istanbul",
    buttonText: "Book Istanbul Trip",
  },
];

export const VEHICLE_DATA = [
  {
    imageUrl: "/images/cars/kia-sportage.png",
    location: "Faisalabad, Pakistan",
    carBrand: "KIA",
    carModel: "Sportage AWD",
    price: 12000,
    features: ["Automatic", "Petrol", "11 km/l", "2.0L Engine", "Luxury SUV"],
  },
  {
    imageUrl: "/images/cars/suzuki-wagon.png",
    location: "Islamabad, Pakistan",
    carBrand: "Suzuki",
    carModel: "Wagon R",
    price: 6000,
    features: ["Automatic", "Petrol", "20 km/l", "1.0L Engine", "5 Seater"],
  },
  {
    imageUrl: "/images/cars/honda-civic.png",
    location: "Lahore, Pakistan",
    carBrand: "Honda",
    carModel: "Civic 2023",
    price: 8500,
    features: ["Manual", "Petrol", "14 km/l", "1.5L Turbo", "5 Seater"],
  },
  {
    imageUrl: "/images/cars/toyota-fortuner-suv.png",
    location: "Karachi, Pakistan",
    carBrand: "Toyota",
    carModel: "Fortuner SUV",
    price: 10000,
    features: ["Automatic", "Diesel", "12 km/l", "2.8L Engine", "7 Seater"],
  },
];

export const COUNTRIES_DATA = [
  {
    imageUrl: "/images/sites/japan.jpg",
    countryName: "Japan",
  },
  {
    imageUrl: "/images/sites/indonesia.jpg",
    countryName: "Indonesia",
  },
  {
    imageUrl: "/images/sites/egypt.jpg",
    countryName: "Egypt",
  },
  {
    imageUrl: "/images/sites/canada.jpg",
    countryName: "Canada",
  },
  {
    imageUrl: "/images/sites/india.jpg",
    countryName: "India",
  },
  {
    imageUrl: "/images/sites/america.jpg",
    countryName: "America",
  },
  {
    imageUrl: "/images/sites/switzerland.jpg",
    countryName: "Switzerland",
  },
  {
    imageUrl: "/images/sites/hongkong.jpg",
    countryName: "Hongkong",
  },
];

// Sample options
export const COUNTRY_OPTIONS = [
  { label: "Pakistan", value: "pakistan" },
  { label: "Turkey", value: "turkey" },
  { label: "UAE", value: "uae" },
];

export const CITY_OPTIONS = [
  {
    country: "pakistan",
    label: "Karachi",
    value: "karachi",
  },
  {
    country: "pakistan",
    label: "Lahore",
    value: "lahore",
  },
  {
    country: "pakistan",
    label: "Islamabad",
    value: "islamabad",
  },
  {
    country: "turkey",
    label: "Istanbul",
    value: "istanbul",
  },
  {
    country: "uae",
    label: "Dubai",
    value: "dubai",
  },
];

export const FILTERS: FilterConfig[] = [
  {
    id: "roomStatus",
    label: "Room Status",
    type: "checkbox",
    options: [
      { label: "All Rooms", value: "all" },
      { label: "Available Rooms", value: "available" },
    ],
  },
  {
    id: "budget",
    label: "Budget Range",
    type: "checkbox",
    options: [
      { label: "PKR 1000-3000", value: "1000-3000" },
      { label: "PKR 3001-6000", value: "3001-6000" },
      { label: "PKR 6001-10000", value: "6001-10000" },
      { label: "PKR 10001-15000", value: "10001-15000" },
      { label: "PKR 15001-20000", value: "15001-20000" },
    ],
  },
  {
    id: "services",
    label: "Hotel Services",
    type: "checkbox",
    options: [
      { label: "Free WiFi", value: "wifi" },
      { label: "Gym", value: "gym" },
      { label: "Room Service", value: "room_service" },
      { label: "Spa", value: "spa" },
    ],
  },
  {
    id: "beds",
    label: "Room Beds",
    type: "checkbox",
    options: [
      { label: "Single", value: "single" },
      { label: "Double", value: "double" },
      { label: "Twin", value: "twin" },
      { label: "King", value: "king" },
    ],
  },
  {
    id: "facilities",
    label: "Room Facilities",
    type: "checkbox",
    options: [
      { label: "AC", value: "ac" },
      { label: "TV", value: "tv" },
      { label: "Mini Bar", value: "minibar" },
      { label: "Balcony", value: "balcony" },
      { label: "Safe", value: "safe" },
      { label: "Hair Dryer", value: "hairdryer" },
    ],
  },
];

export const SEARCH_DATA = [
  {
    title: "Bali Beach Retreat",
    description:
      "Relax on the serene beaches of Bali with this all-inclusive retreat package.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Desert Safari Dubai",
    description:
      "Experience dune bashing, camel rides, and BBQ dinner in Dubai's desert.",
    price: 149.5,
    imageUrl: "https://images.unsplash.com/photo-1608139748485-d7b4f79c9948",
  },
  {
    title: "Northern Lights Tour",
    description:
      "Witness the magical Aurora Borealis in Iceland with expert guides.",
    price: 349.0,
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969",
  },
];

export const SINGLE_HOTEL = {
  name: "Almaty Hotel Complex",
  description:
    "Almaty hotel complex is a historical and architectural monument located in the city center near administrative buildings, theaters, supermarkets, and other cultural centers.",
  services: ["Free WiFi", "Gym", "Room Service", "Spa"],
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  ],
  rooms: [
    {
      type: "Standard",
      size: 16, // ✅ Added
      description:
        "Standard room is 16 sq Mts in size with all the modern amenities",
      bed_type: "Double",
      meal_plan: "Breakfast",
      attached_bath: true,
      facilities: ["AC", "TV", "Mini Bar", "Safe"],
      pricing: {
        single: 31000,
        double: 37000,
        extra_bed: 0,
        child_no_bed: 0,
      },
    },
    {
      type: "Superior",
      size: 32, // ✅ Added
      description:
        "Superior Room is about 32 sq mts in size with all the modern amenities and premium quality products",
      bed_type: "Double",
      meal_plan: "Breakfast",
      attached_bath: true,
      facilities: ["AC", "TV", "Mini Bar", "Balcony", "Safe", "Hair Dryer"],
      pricing: {
        single: 34000,
        double: 42000,
        extra_bed: 19000,
        child_no_bed: 0,
      },
    },
  ],
};

// constants/footerData.ts
export const footerData = {
  year: "sda",
  by: "Kaz Routes",
  columns: [
    {
      title: "About",
      links: [
        { label: "Packages", href: "search?category=packages" },
        { label: "Sites", href: "search?category=sites" },
        { label: "Cars", href: "search?category=cars" },
        { label: "Hotels", href: "search?category=hotels" },
        { label: "Restaurants", href: "search?category=restaurants" },
      ],
    },
  ],
  social: [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" },
  ],
};
