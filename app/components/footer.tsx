import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="flex flex-grow items-end h-screen bottom-0">
      <div className="flex h-[150px] bg-lightGray w-full items-center justify-center">
        <div className="flex justify-between items-center w-[600px] h-full">
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
