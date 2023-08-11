"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import {
  BrandType,
  ColorType,
  DeviceColorType,
  DeviceType,
  ImageType,
  MemoryType,
  OrdersType,
  ProcessorType,
  PropType,
} from "@/app/types/types";
import axios from "axios";

const Header = () => {
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filteredDevices, setFilteredDevices] = useState<OrdersType[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [memory, setMemory] = useState<MemoryType[]>([]);
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [deviceColors, setDeviceColors] = useState<DeviceColorType[]>([]);
  const [properties, setProperties] = useState<PropType[]>([]);
  const [processors, setProcessors] = useState<ProcessorType[]>([]);
  const [showResults, setShowResults] = useState(false); // State to track visibility of results

  const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      // Close results when clicking outside of the input
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setShowResults(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

  useEffect(() => {
    async function downloadImages() {
      try {
        
        const response = await axios.get("/api/getDevices");
        const data: DeviceType[] = response.data.message;
        setDevices(data);

        const responseImg = await axios.get("/api/getImages");
        const dataImg: ImageType[] = responseImg.data.message;
        setImages(dataImg);

        const responseProp = await axios.get("/api/getProps");
        const dataProp: PropType[] = responseProp.data.message;
        setProperties(dataProp);

        const responseDevColor = await axios.get("/api/getDeviceColor");
        const dataColorDev: DeviceColorType[] = responseDevColor.data.message;
        setDeviceColors(dataColorDev);

        const responseColor = await axios.get("/api/getColors");
        const dataColor: ColorType[] = responseColor.data.message;
        setColors(dataColor);

        const responseBrand = await axios.get("/api/getBrand");
        const dataBrand: BrandType[] = responseBrand.data.message;
        setBrand(dataBrand);

        const responseMemory = await axios.get("/api/getMemory");
        const dataMemory: MemoryType[] = responseMemory.data.message;
        setMemory(dataMemory);

        const responseProc = await axios.get("/api/getProcessor");
        const dataPro: ProcessorType[] = responseProc.data.message;
        setProcessors(dataPro);
      } catch (error) {
        console.log("Error downloading images: ", error);
      }
    }
    downloadImages();
  }, []);

  const Items: OrdersType[] = properties.map((prp) => {
    const deviceColor = deviceColors.find(
      (im) => im.id === prp?.device_color_id
    );
    const selectedColor = colors.find((im) => im.id === deviceColor?.color_id);
    const proces = processors.find((im) => im.id === prp?.processor_id);
    const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
    const brnd = brand.find((br) => br.id == device?.brand_id);
    const mmry = memory.find((mr) => mr.id === prp?.memory_id);
    const selectedImg = images.find(
      (im) => im.device_color_id === deviceColor?.id && im.presentation == true
    );
    return {
      name: device?.name,
      color: selectedColor?.color_name,
      memory: mmry?.memory_size,
      brand: brnd?.brand_name,
      processor: proces?.processor,
      image: selectedImg?.image_url,
      price: prp.price,
      item_id: prp.id,
    };
  });

  const handleSearch = (inputValue: string) => {
    // Convert input value to lowercase for case-insensitive search
    const searchValue = inputValue?.toLowerCase();

    // Perform the search logic here
    const filtered = Items.filter(
      (device) =>
        device?.name?.toLowerCase().includes(searchValue) ||
        device?.color?.toLowerCase().includes(searchValue) ||
        device?.memory == parseInt(inputValue) || 
        device?.processor?.toLowerCase().includes(searchValue)
    );

    setFilteredDevices(filtered);
  };


  return (
    <div>
      <div className="flex flex-row ">
        <h1 className="text-blue text-[32px] font-black p-4">TechMarket</h1>
        <div>
          <div className="border-[1px] w-[689px] h-[58px] border-lightGray mx-4 mt-4 rounded-[8px] flex justify-between ml-[250px]">
            <input
              ref={inputRef}
              placeholder="🔎 Search device..."
              className="p-4 m-1 w-[600px] outline-none border-lightGray"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
                setShowResults(true);
              }}
            />
            <button
              onClick={() => handleSearch(searchTerm)}
              className="w-[102px] h-[36px] rounded-[8px] bg-blue text-[20px] text-secondary m-2.5 "
            >
              Search
            </button>
          </div>
          {showResults && filteredDevices.length > 0 && (
            <div className="flex absolute">
              <ul className="">
                {filteredDevices.map((device) => (
                  <Link
                    className="bg-secondary absolute border w-[689px] h-[58px] border-lightGray py-2 px-4 rounded-[8px] ml-[250px] "
                    key={device.item_id}
                    href={`/client/device-info/${device.item_id}`}
                  >
                    {device?.brand?.toUpperCase()} {device?.name}{" "}
                    {device?.memory}
                    GB {device?.processor} {device?.color}
                  </Link>
                ))}
              </ul>
            </div>
          )}
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
              <Link href={"/client/user-account"}>
                <AiOutlineUser size="28" className="mt-8 m-1 cursor-pointer" />
              </Link>
              <div className=" absolute hidden border  border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                My Account
              </div>
            </div>
            <div className="group">
              <Link href={"/client/favorites"}>
                <FaRegStar size="28" className="mt-8 m-1 cursor-pointer" />
              </Link>
              <div className=" absolute hidden border  border-blue rounded-xl group-hover:block px-5 py-2 mr-16 bg-secondary">
                Favorites
              </div>
            </div>
            <div className="group">
              <Link href={"/client/cart"}>
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
