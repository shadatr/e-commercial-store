import React from "react";
import { BrandType, ColorType, DeviceType, ImageType, MemoryType, PropType } from "../types/types";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

const Device = ({
  image,
  device,
  prop,
  brand,
  memory,
  color,
}: {
  image?: ImageType;
  device?: DeviceType;
  prop?: PropType;
  brand?: BrandType;
  memory?: MemoryType;
  color?: ColorType;
}) => {
  return (
    <div className="border-lightGray border w-[270px] h-[350px] p-4 cursor-pointer">
      <Link href={`/client/device-info/${prop?.id}`}>
        <img
          className="w-[200px] "
          alt={`image-${image?.id}`}
          src={image?.image_url}
        />
        <h1 className="font-bold text-sm">${prop?.price}</h1>
        <h1 className="py-2">
          {brand?.brand_name?.toUpperCase()} {device?.name}{" "}
          {memory?.memory_size}GB {color?.color_name}
        </h1>
        <p className="flex flex-row justify-center items-center bg-yellow-100 w-14 rounded-lg">
          {device?.stars.toFixed(1)}
          <FaRegStar className="h-7 text-yellow-500" />
        </p>
      </Link>
    </div>
  );
};

export default Device;
