type AboutContentProps = {
  text: string;
};

const AboutContent = ({ text }: AboutContentProps) => {
  return <p className="text-gray-700 text-sm md:text-base">{text}</p>;
};

export default AboutContent;
