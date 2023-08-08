'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const Header = () => {
  const session = useSession();
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
        {session.status != "authenticated" && (
          <Link
            href={"/auth/login"}
            className="w-[90px] flex justify-center items-center h-[36px] rounded-[8px] bg-blue text-[18px] m-6  text-secondary"
          >
            Log In
          </Link>
        )}
        {session.status == "authenticated" && (
          <div className="flex pl-20">
            <div className="group">
              <Link
                href={"/client/user-account"}
              >
              <AiOutlineUser size="28" className="mt-8 m-1 cursor-pointer" />
              </Link>
              <div className=" absolute hidden border  border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                My Account
              </div>
            </div>
            <div className="group">
              <FaRegStar size="28" className="mt-8 m-1 cursor-pointer" />
              <div className=" absolute hidden border  border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                Favorites
              </div>
            </div>
            <div className="group">
              <Link
                href={"/client/cart"}
              >
              <FaShoppingCart size="28" className="mt-8 m-1 cursor-pointer" />
                <div className=" absolute hidden border border-blue rounded-xl group-hover:block px-5 py-2 bg-secondary">
                Cart
                </div>
              </Link>
            </div>
            <button onClick={() => signOut({ redirect: true })}>
              <AiOutlineLogout size="28" className="mt-3 m-1 cursor-pointer" />
            </button>
          </div>
        )}
      </div>
      <div className="border-t-[1px] width-full border-lightGray"></div>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-row text-darkGray font-medium text-[20px] w-[800px] justify-between p-2">
          <Link href={"/client/devices/phone"}>Phone</Link>
          <Link href={"/client/devices/tablet"}>Tablet</Link>
          <Link href={"/client/devices/laptop"}>Laptop</Link>
          <Link href={"/client/devices/headphones"}>Headphones</Link>
          <Link href={"/client/devices/watch"}>Watch</Link>
        </div>
      </div>
      <div className="border-t-[1px] width-full border-lightGray "></div>
    </div>
  );
};

export default Header;
