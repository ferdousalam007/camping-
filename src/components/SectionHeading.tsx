interface SectionHeadingProps {
  headingText: string;
  paragraphText: string;
  textColor?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  headingText,
  paragraphText,
  textColor,
}) => {
  return (
    <div className={`${textColor}`} >
      <div className="text-center max-w-[60%] mx-auto">
        <h2 className="text-3xl font-semibold mb-5">{headingText}</h2>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
};

export default SectionHeading;
