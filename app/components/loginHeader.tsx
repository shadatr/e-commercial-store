'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const LoginHeader = () => {
  // const session = useSession({ required: true });
  return (
    <div>
      <div className="flex flex-row ">
        <h1 className="text-blue text-[32px] font-black p-4">TechMarket</h1>
      
      </div>
      <div className="border-t-[1px] width-full border-lightGray "></div>
    </div>
  );
};

export default LoginHeader;
