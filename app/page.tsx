import React from "react"
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-row">
      <Image src="/background.png" alt="Background" width={1000} height={300} />
      <span>
      <h1 className="w-[355px] text-[40px] font-medium mt-20">
        Connect, Communicate, and Listen in Style: Explore Our Cutting-Edge Tech
        Collection!
      </h1>
      <button className="w-[180px] h-[45px] rounded-[8px] bg-blue text-[18px] m-6 ml-24 text-secondary">
        Start Shopping
      </button>
      </span>
    </div>
  );
}
