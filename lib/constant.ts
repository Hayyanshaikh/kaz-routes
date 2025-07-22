import { FilterConfig } from "@/app/types/CommonType";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const FILE_BASE_URL = process.env.NEXT_PUBLIC_FILE_BASE_URL;

export const DISPLAY_DATE = "MMMM DD, YYYY";

export const TOKEN_CREDENTIALS = {
  email: "api@email.com",
  password: "api123",
};

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

export const ABOUT_CONTENT = [
  "Founded in 2020, Your Company has emerged as a leader in innovative technology solutions, dedicated to empowering businesses and individuals worldwide. Our journey began with a simple yet powerful vision: to harness the potential of cutting-edge technology to create meaningful impact. Over the years, we have grown into a dynamic organization, driven by a passion for creativity, excellence, and collaboration.",

  "At Your Company, we believe that technology is more than just tools—it's a catalyst for change. Our team of dedicated professionals works tirelessly to design solutions that address real-world challenges. From developing intuitive software to pioneering advancements in artificial intelligence, we strive to push the boundaries of what's possible. Our commitment to innovation is matched only by our dedication to our clients, ensuring that every project we undertake is tailored to their unique needs.",

  "Our core values—integrity, innovation, and impact—guide everything we do. We take pride in fostering a culture of transparency and trust, where every team member is empowered to contribute ideas and drive progress. This collaborative spirit has enabled us to build lasting relationships with our clients, partners, and communities. Whether it's streamlining business operations or creating tools that enhance everyday life, we are committed to delivering results that matter.",

  "Over the past five years, we’ve had the privilege of working with diverse industries, from startups to global enterprises. Our portfolio includes groundbreaking projects that have transformed how businesses operate and how individuals interact with technology. We’ve helped small businesses scale with custom software, empowered educators with innovative learning platforms, and supported healthcare providers with secure, efficient systems. Each project is a testament to our belief that technology can make the world a better place.",

  "Sustainability is at the heart of our mission. We are committed to minimizing our environmental footprint through eco-friendly practices and sustainable development. From optimizing our workflows to reduce energy consumption to partnering with organizations that share our values, we aim to create a positive impact on the planet. Our goal is to build solutions that not only meet today’s needs but also pave the way for a brighter, more sustainable future.",

  "Community engagement is another cornerstone of our philosophy. We actively support local initiatives, from STEM education programs to charitable organizations, to give back to the communities that inspire us. Our annual hackathons and innovation challenges bring together bright minds to solve pressing problems, fostering a spirit of collaboration and creativity. We believe that by investing in people, we can drive meaningful change both locally and globally.",

  "Looking ahead, we are excited about the possibilities that lie before us. Our research and development team is exploring new frontiers in machine learning, cloud computing, and user experience design. We are constantly evolving, adapting to the ever-changing technological landscape to stay ahead of the curve. Our vision for the future is bold: to create a world where technology empowers everyone, everywhere, to achieve their fullest potential.",

  "At Your Company, we don’t just build products—we build possibilities. Our commitment to excellence drives us to deliver solutions that are not only functional but also intuitive and impactful. We invite you to join us on this journey, whether as a client, partner, or team member, as we continue to innovate, inspire, and transform the world through technology.",

  "Our global presence allows us to serve clients across continents, with offices in North America, Europe, and Asia. This diversity strengthens our ability to understand and address the unique needs of different markets. We pride ourselves on our ability to adapt and deliver solutions that resonate with users worldwide, from localized applications to global platforms.",

  "Thank you for taking the time to learn about Your Company. We are more than just a technology provider—we are a partner in progress, a catalyst for change, and a champion of innovation. If you’d like to learn more about our work or explore how we can collaborate, please reach out to us at info@yourcompany.com. Together, we can build a future that is smarter, more connected, and full of possibilities.",
];

export const PRIVACY_POLICY_CONTENT = [
  "At Your Company, we take your privacy seriously. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you interact with our website, applications, and services.",

  "We collect information that you provide directly, such as your name, email address, phone number, and company details when you fill out forms, subscribe to newsletters, or contact us. We may also collect information automatically through cookies and tracking technologies to enhance your experience.",

  "The information we collect is used to provide and improve our services, respond to inquiries, personalize content, and send you relevant updates. We may also use aggregated, non-personal data for analytics and reporting purposes.",

  "We do not sell, rent, or trade your personal information to third parties. Your data may be shared with trusted service providers who assist us in delivering our services, provided they agree to strict confidentiality obligations.",

  "We implement industry-standard security measures to safeguard your personal data from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",

  "You have the right to access, update, or delete your personal information. To exercise these rights or to inquire about your data, please contact us at privacy@yourcompany.com.",

  "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from minors. If we become aware of such data, we will take steps to delete it immediately.",

  "This Privacy Policy may be updated periodically to reflect changes in our practices or legal obligations. We encourage you to review it regularly to stay informed about how we protect your privacy.",

  "By using our website or services, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree with our policies, please refrain from using our services.",

  "For questions or concerns about our Privacy Policy or data practices, please reach out to us at privacy@yourcompany.com. We are committed to ensuring your privacy is respected and protected.",
];

export const TERMS_AND_CONDITIONS_CONTENT = [
  "By accessing or using the services provided by Your Company, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please refrain from using our services.",

  "All content, trademarks, logos, and intellectual property on this website are the property of Your Company and are protected by applicable copyright and trademark laws. Unauthorized use is strictly prohibited.",

  "You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the platform.",

  "We reserve the right to suspend or terminate your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users or the integrity of the service.",

  "Our services may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of such sites. Accessing them is at your own risk.",

  "We do not guarantee that our services will be error-free, uninterrupted, or secure. All services are provided 'as is' without warranties of any kind, either express or implied.",

  "Your Company shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use our services, even if we have been advised of the possibility of such damages.",

  "We reserve the right to modify or update these terms at any time. Changes will be effective immediately upon posting. Continued use of the services constitutes acceptance of the revised terms.",

  "You agree to indemnify and hold Your Company, its affiliates, and employees harmless from any claims, losses, or damages resulting from your violation of these terms.",

  "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Your Company is registered. Any disputes shall be subject to the exclusive jurisdiction of the local courts.",
];
