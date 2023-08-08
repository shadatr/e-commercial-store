"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrandType,
  ColorType,
  DeviceColorType,
  DeviceType,
  ImageType,
  MemoryType,
  ProcessorType,
  PropType,
} from "@/app/types/types";
import Device from "@/app/components/device";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: { name: string } }) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [memory, setMemory] = useState<MemoryType[]>([]);
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [deviceColors, setDeviceColors] = useState<DeviceColorType[]>([]);
  const [properties, setProperties] = useState<PropType[]>([]);
  const [processors, setProcessors] = useState<ProcessorType[]>([]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [checkedBrand, setCheckedBrand] = useState<number[]>([]);
  const [checkedMemory, setCheckedMemory] = useState<number[]>([]);
  const [checkedColor, setCheckedColor] = useState<number[]>([]);
  const [checkedProcessor, setCheckedProcessor] = useState<number[]>([]);
  const [refresh, setRefresh] = useState<boolean>();

  const session = useSession({ required: true });
  useEffect(() => {
    async function downloadImages() {
      try {
        const response = await axios.get(`/api/getDevices/${params.name}`);
        const data: DeviceType[] = response.data.message;

        const brandList: DeviceType[] = checkedBrand.length
          ? data.filter((brand) => checkedBrand.includes(brand.brand_id))
          : data;
        setDevices(brandList);

        const responseImg = await axios.get("/api/getImages");
        const dataImg: ImageType[] = responseImg.data.message;
        setImages(dataImg);

        const responseProp = await axios.get("/api/getProps");
        const dataProp: PropType[] = responseProp.data.message;

        const propsList2: PropType[] = dataProp
          .filter((item) =>
            checkedMemory.length ? checkedMemory.includes(item.memory_id) : true
          )
          .filter((item) =>
            checkedProcessor.length
              ? checkedProcessor.includes(item.processor_id)
              : true
          )
          .filter((item) =>
            maxPrice && minPrice
              ? item.price <= maxPrice && item.price >= minPrice
              : true
          );

        setProperties(propsList2);

        const responseDevColor = await axios.get("/api/getDeviceColor");
        const dataColorDev: DeviceColorType[] = responseDevColor.data.message;

        const ColorList: DeviceColorType[] = checkedColor.length
          ? dataColorDev.filter((brand) =>
              checkedColor.includes(brand.color_id)
            )
          : dataColorDev;
        setDeviceColors(ColorList);

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
  }, [refresh, minPrice, maxPrice]);

  const handleCheckBrand = (item: number) => {
    const checkedIndex = checkedBrand.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedBrand([...checkedBrand, item]);
    } else {
      const updatedChecked = [...checkedBrand];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedBrand(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckColor = (item: number) => {
    const checkedIndex = checkedColor.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedColor([...checkedColor, item]);
    } else {
      const updatedChecked = [...checkedColor];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedColor(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckMemory = (item: number) => {
    const checkedIndex = checkedMemory.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedMemory([...checkedMemory, item]);
    } else {
      const updatedChecked = [...checkedMemory];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedMemory(updatedChecked);
    }
    setRefresh(!refresh);
  };

  const handleCheckProcessor = (item: number) => {
    const checkedIndex = checkedProcessor.indexOf(item);
    if (checkedIndex === -1) {
      setCheckedProcessor([...checkedProcessor, item]);
    } else {
      const updatedChecked = [...checkedProcessor];
      updatedChecked.splice(checkedIndex, 1);
      setCheckedProcessor(updatedChecked);
    }
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-row p-10">
      <div className=" border border-lightGray mr-8 rounded-lg p-5 w-[250px]">
        <form className="py-2">
          <label className="block mb-2 font-bold">Brand</label>
          {brand.map((brnd, index) => (
            <p key={index} className="mb-1 text-xsm">
              <input
                type="checkbox"
                onChange={() => handleCheckBrand(brnd.id)}
                checked={checkedBrand.includes(brnd.id)}
                className="mr-2"
              />
              {brnd.brand_name}
            </p>
          ))}
        </form>
        <form className="py-2">
          <label className="block mb-2 font-bold ">Memory</label>
          {memory.map((memr, index) => (
            <p key={index} className="mb-1 text-xsm">
              <input
                type="checkbox"
                onChange={() => handleCheckMemory(memr.id)}
                checked={checkedMemory.includes(memr.id)}
                className="mr-2"
              />
              {memr.memory_size}
            </p>
          ))}
        </form>
        <form className="py-2">
          <label className="block mb-2 font-bold">Color</label>
          {colors.map((cl, index) => (
            <p key={index} className="mb-1 text-xsm">
              <input
                type="checkbox"
                onChange={() => handleCheckColor(cl.id)}
                checked={checkedColor.includes(cl.id)}
                className="mr-2"
              />
              {cl.color_name}
            </p>
          ))}
        </form>
        <form className="py-2">
          <label className="block mb-2 font-bold">Processor</label>
          {processors.map((pro, index) => (
            <p key={index} className="mb-1 text-xsm">
              <input
                type="checkbox"
                onChange={() => handleCheckProcessor(pro.id)}
                checked={checkedProcessor.includes(pro.id)}
                className="mr-2"
              />
              {pro.processor}
            </p>
          ))}
        </form>
        <form className="py-2">
          <label className="block mb-2 font-bold">Price</label>
          <p className="flex text-xsm items-center ">
            <input
              type="number"
              placeholder="minimum price"
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="mr-2 px-2 py-1 border rounded-md w-20"
            />
            {" - "}
            <input
              type="number"
              placeholder="maximum price"
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="px-2 py-1 border rounded-md w-20"
            />
          </p>
        </form>
      </div>
      <div className="grid grid-cols-4">
        {properties.map((prp, index) => {
          const deviceColor = deviceColors.find(
            (im) => im.id === prp.device_color_id
          );
          const color = colors.find((im) => im.id === deviceColor?.color_id);
          const device = devices.find(
            (dev) => dev.id == deviceColor?.device_id
          );
          const brnd = brand.find((br) => br.id == device?.brand_id);
          const img = images.find(
            (im) => im.device_color_id === deviceColor?.id && im.presentation
          );
          const mmry = memory.find((mr) => mr.id === prp.memory_id);
          if (device && brnd && img && mmry && device && color) {
            return (
              <Device
                key={index}
                image={img}
                device={device}
                prop={prp}
                brand={brnd}
                memory={mmry}
                color={color}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Page;
