import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="mt-auto bg-lightGray">
      <div className="flex justify-center items-center  h-[100px] ">
        {" "}
        {/* Adjust h-16 to match your footer's height */}
        <div className="flex justify-between items-center w-[600px]  h-full ">
          <SocialIcon url="https://twitter.com" />
          <SocialIcon url="https://instagram.com" />
          <SocialIcon url="https://facebook.com" />
          <SocialIcon url="https://whatsapp.com" />
          <SocialIcon url="https://email.com" />
        </div>
      </div>
    </div>
  );
};


export default Footer;
