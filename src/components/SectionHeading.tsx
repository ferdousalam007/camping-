import {motion} from 'framer-motion';
import {fadeIn} from "../variants";

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
    <motion.div
    variants={fadeIn('up', 0.2)}
    initial="hidden"
    whileInView="show"
    viewport={{once: false,amount:0.7}}

    
    className={`${textColor}`} >
      <div className="text-center max-w-[90%] md:max-w-[60%] mx-auto">
        <h2 className="text-3xl font-semibold mb-5">{headingText}</h2>
        <p>{paragraphText}</p>
      </div>
    </motion.div>
  );
};

export default SectionHeading;
