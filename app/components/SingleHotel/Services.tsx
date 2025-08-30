import { CheckOutlined } from "@ant-design/icons";

interface Props {
  services: string[];
}

const Services = ({ services }: Props) => (
  <div className="!mb-4">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Hotel Services</h3>
    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
      {services.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <CheckOutlined className="!text-primary text-base" />
          <span className="text-sm">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
