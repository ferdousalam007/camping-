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
        <div className=" hidden md:block bg-according-bg bg-cover bg-position-center bg-no-repeat h-auto w-full"></div>
        <div className="pl-5 lg:pl-10">
          <Accordion
            type="single"
            collapsible
            className="w-full custom-accordion"
            defaultValue="item-1"
            onValueChange={(value) => setDefaultValue(value)}
          >
            <AccordionItem
              value="item-1"
              className={`border-b rounded ${
                defaultValue === "item-1" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-1" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                What types of products do you offer?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                At Campers Shop, we provide a wide range of camping gear,
                including tents, sleeping bags, cooking equipment, hiking gear,
                and fun outdoor gadgets. Whether you're a beginner or a seasoned
                camper, we have everything you need for your next adventure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className={`border-b rounded ${
                defaultValue === "item-2" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-2" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                Yes, we ship our products worldwide! Shipping costs and delivery
                times vary depending on your location. You can check the
                shipping options available for your country at checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className={`border-b rounded ${
                defaultValue === "item-3" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-3" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                We want you to be completely satisfied with your purchase. If
                you're not happy with your item, you can return it within 30
                days of receipt for a full refund or exchange. Please ensure
                that the item is unused and in its original packaging.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className={`border-b rounded ${
                defaultValue === "item-4" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-4" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                Once your order is dispatched, you'll receive an email with a
                tracking number. You can use this number on our website's
                tracking page to follow your order's journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className={`border-b rounded ${
                defaultValue === "item-5" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-5" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                Are your products environmentally friendly?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                We are committed to sustainability. Many of our products are
                made from eco-friendly materials, and we continuously work with
                our suppliers to reduce our environmental impact. Look for the
                "Eco-Friendly" label on our products.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className={`border-b rounded ${
                defaultValue === "item-6" ? "bg-[#1b352c]" : ""
              }`}
            >
              <AccordionTrigger
                className={`text-left hover:bg-[#1b352c] px-4 py-5 hover:text-gray-100 rounded ${
                  defaultValue === "item-6" ? "bg-[#1b352c] text-white" : ""
                }`}
              >
                Do you offer any discounts for bulk purchases?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-2 text-base">
                Yes, we offer discounts on bulk purchases. If you're planning a
                group trip or need a large quantity of items, please contact our
                customer service team for more details on bulk pricing and
                discounts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
