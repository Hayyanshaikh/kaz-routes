import { CheckCheckIcon } from "lucide-react";

interface Props {
  services: string[];
}

const Services = ({ services }: Props) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Site Services</h3>
    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
      {services.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 ">
          <CheckCheckIcon size={18} className="text-primary" />
          <span className="text-sm">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
