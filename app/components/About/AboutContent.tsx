type AboutContentProps = {
  text: string;
};

const AboutContent = ({ text }: AboutContentProps) => {
  return (
    <div
      className="text-gray-700 text-sm md:text-base"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AboutContent;
