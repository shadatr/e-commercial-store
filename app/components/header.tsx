import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row ">
        <h1 className="text-blue text-[32px] font-black p-4">TechMarket</h1>
        <div className="border-[1px] w-[689px] h-[58px] border-lightGray m-4 rounded-[8px] flex justify-between ml-[250px]">
          <input
            placeholder="🔎 Search device..."
            className="p-4 m-1 w-[600px] outline-none border-lightGray"
          />
          <button className="w-[102px] h-[36px] rounded-[8px] bg-blue text-[20px] text-secondary m-2.5 ">
            Search
          </button>
        </div>
        <button className="w-[90px] h-[36px] rounded-[8px] bg-blue text-[18px] m-6 ml-24 text-secondary">
          Log In
        </button>
      </div>
      <div className="border-t-[1px] width-full border-lightGray"></div>
      <div className="flex w-full justify-center items-center">
      <div className="flex flex-row text-darkGray font-medium text-[20px] w-[800px] justify-between p-2">
        <h1 >Laptop</h1>
        <h1>Phone</h1>
        <h1>Tablet</h1>
        <h1>Headphones</h1>
        <h1>Watch</h1>
      </div>
      </div>
      <div className="border-t-[1px] width-full border-lightGray "></div>
    </div>
  );
};

export default Header;
