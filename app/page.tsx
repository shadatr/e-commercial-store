import React from "react"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function Home() {
  return (
    <div className="flex flex-row">
      <Image src="/background.png" alt="Background" width={1000} height={300} />
      <span>
      <h1 className="w-[355px] text-[40px] font-medium mt-20">
        Connect, Communicate, and Listen in Style: Explore Our Cutting-Edge Tech
        Collection!
      </h1>
      <Link href={'/client/devices/phone'} className="w-[180px] h-[45px] rounded-[8px] bg-blue text-[18px] mt-6 ml-24 text-secondary p-3">
        Start Shopping
      </Link>
      </span>
    </div>
  );
}
