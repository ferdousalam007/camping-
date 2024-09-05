import SectionHeading from "@/components/SectionHeading";
import Map from "./Map";
import { Mail, Map as MapIcon, PhoneCall  } from "lucide-react";
import faqImg from "../../assets/bgtes.webp";

const Contact = () => {
  return (
    <div className="py-14">
      <div className="container">
        <SectionHeading
          headingText="Contact Us"
          paragraphText=" We're here to help—reach out to us with any questions or feedback!"
        />
        <div className="grid grid-cols-1 lg:grid-cols-65-35  pt-14 space-y-10 lg:space-y-0">
          <div>
            <Map />
          </div>
          <div
            className="shadow-custom rounded bg-[#2C4A28]"
            style={{ backgroundImage: `url(${faqImg})` }}
          >
            <div className="rounded ">
              <div className="bg-[#1b352c] text-center py-5 rounded-t-lg">
                <h2 className="text-3xl font-semibold text-white">
                  Contact Info
                </h2>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <MapIcon size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Our Location
                      </p>
                      <small className="text-base text-white">
                        456, Lorem Street,
                        <br /> New York, 33454, NY
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <PhoneCall size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Phone Number
                      </p>
                      <small className="text-base text-white">
                        +1 888-654-4329
                        <br /> +1 888-543-8765
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <Mail size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Email Address
                      </p>
                      <small className="text-base text-white">
                        contact@example.com
                        <br /> admin@example.com
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center py-5 ">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-twitter"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
