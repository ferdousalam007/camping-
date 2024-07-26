import SectionHeading from "@/components/SectionHeading";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
const Faq = () => {
    const [defaultValue, setDefaultValue] = useState("item-1");

  return (
    <div className="container">
      <SectionHeading
        headingText="Faq"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] my-20">
        <div className="bg-according-bg bg-cover bg-position-center bg-no-repeat h-auto w-full"></div>
        <div className="pl-10">
          <Accordion
            type="single"
            collapsible
            className="w-full custom-accordion"
            defaultValue="item-1"
            onValueChange={(value) => setDefaultValue(value)}
          >
            <AccordionItem
              value="item-1"
              className={`border-b ${
                defaultValue === "item-1" ? "bg-blue-100" : ""
              }`}
            >
              <AccordionTrigger className="hover:bg-gray-100 px-4 py-2">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className={`border-b ${
                defaultValue === "item-2" ? "bg-blue-100" : ""
              }`}
            >
              <AccordionTrigger className="hover:bg-gray-100 px-4 py-2">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2">
                Yes. It comes with default styles that matches the other
                components' aesthetic.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className={`border-b ${
                defaultValue === "item-3" ? "bg-blue-100" : ""
              }`}
            >
              <AccordionTrigger className="hover:bg-gray-100 px-4 py-2">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2">
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
