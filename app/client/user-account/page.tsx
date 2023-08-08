"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrandType, ColorType, DeviceColorType, DeviceType, ImageType, MemoryType, OrderedItemsType, OrdersType, PersonalInfoType, ProcessorType, PropType } from "@/app/types/types";
import { toast } from "react-toastify";
import OrderedItem from "@/app/components/orderedItem";

const page = () => {
  const [activeTab, setActiveTab] = useState<string>("Tab 1");
  const session = useSession({ required: true });
  const user = session.data?.user;
  const [userInfo, setUserInfo] = useState<PersonalInfoType[]>([]);
  const [orders, setorders] = useState<OrderedItemsType[]>([]);
  const [userInfo2, setUserInfo2] = useState<PersonalInfoType[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(true);
  const [images, setImages] = useState<ImageType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [memory, setMemory] = useState<MemoryType[]>([]);
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [deviceColors, setDeviceColors] = useState<DeviceColorType[]>([]);
  const [properties, setProperties] = useState<PropType[]>([]);
  const [processors, setProcessors] = useState<ProcessorType[]>([]);

  useEffect(() => {
    async function downloadImages() {
      try {
        const response = await axios.get("/api/order");
        const data: OrderedItemsType[] = response.data.message;
        setorders(data);

        const responseDev = await axios.get("/api/getDevices");
        const dataDev: DeviceType[] = responseDev.data.message;
        setDevices(dataDev);

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
        if (user && hasLoaded) {
          setHasLoaded(false);
          const responseInfo = await axios.get(
            `/api/editPersonalInfo/${user?.id}`
          );
          const dataInfo: PersonalInfoType[] = responseInfo.data.message;
          setUserInfo(dataInfo);
          setUserInfo2(dataInfo);
        }
      } catch (error) {
        console.log("Error downloading images: ", error);
      }
    }
    downloadImages();
  }, [user, hasLoaded]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PersonalInfoType
  ) => {
    const updatedData: PersonalInfoType = {
      ...userInfo2[0],
      [field]: e.target.value,
    };

    setUserInfo2([updatedData]);
  };

  const handleChangeInfo = () => {
    try {
      axios.post(`/api/editPersonalInfo/${user?.id}`, userInfo2);
      toast.success("The address edited successfully");
    } catch {
      toast.success("Somthing went wrong while editing");
    }
    setHasLoaded(true);
    setEdit(!edit);
  };


  const clientItems: OrdersType[] = properties
    .filter(
      (p) =>
        p.id ==
        orders.find((i) => i.item_id == p.id && i.client_id == user?.id)
          ?.item_id
    )
    .map((prp) => {
      const deviceColor = deviceColors.find(
        (im) => im.id === prp?.device_color_id
      );
      const selectedColor = colors.find(
        (im) => im.id === deviceColor?.color_id
      );
      const proces = processors.find((im) => im.id === prp?.processor_id);
      const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
      const brnd = brand.find((br) => br.id == device?.brand_id);
      const mmry = memory.find((mr) => mr.id === prp?.memory_id);
      const selectedImg = images.find(
        (im) =>
          im.device_color_id === deviceColor?.id && im.presentation == true
      );
      return {
        name: device?.name,
        color: selectedColor?.color_name,
        memory: mmry?.memory_size,
        brand: brnd?.brand_name,
        processor: proces?.processor,
        image: selectedImg?.image_url,
        price: prp.price,
        quantity: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.quantity,
        item_id: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.item_id,
        status: orders.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.status,
      };
    });
    
  return (
    <div className="flex w-full justify-center items-center flex-col">
      <div className="text-sm flex flex-row space-x-4 p-5">
        <button
          onClick={() => handleTabClick("Tab 1")}
          className={`py-2 px-4 rounded-md border ${
            activeTab === "Tab 1"
              ? "bg-blue-500 text-blue border-blue"
              : "bg-gray-300 text-darkGray border-lightGray"
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => handleTabClick("Tab 2")}
          className={`py-2 px-4 rounded-md border ${
            activeTab === "Tab 2"
              ? "bg-blue-500 text-blue border-blue"
              : "bg-gray-300 text-darkGray border-lightGray"
          }`}
        >
          My Orders
        </button>
      </div>
      {activeTab == "Tab 1" && (
        <div className="border border-lightGray w-[1000px] p-10 rounded-2xl">
          <div className="flex w-full justify-between">
            {edit && userInfo ? (
              <div className="flex flex-col">
                <span className="flex justify-between items-center p-2">
                  <p className="font-semibold ">Name And Surname</p>
                  <input
                    value={userInfo2[0]?.name}
                    placeholder="name and surname"
                    className=" py-2 px-4 border border-lightGray w-[400px] rounded-xl"
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </span>
                <span className="flex justify-between items-center p-2">
                  <p className="font-semibold ">Phone</p>
                  <input
                    value={userInfo2[0]?.phone}
                    placeholder="phone"
                    className=" py-2 px-4 border border-lightGray w-[400px] rounded-xl"
                    onChange={(e) => handleInputChange(e, "phone")}
                  />
                </span>
                <span className="flex justify-between items-center p-2">
                  <p className="font-semibold">Address</p>
                  <input
                    value={userInfo2[0]?.address}
                    placeholder="address"
                    className=" py-2 px-4 border border-lightGray w-[400px] rounded-xl"
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                </span>
                <span className="flex justify-between items-center p-2">
                  <p className="font-semibold">Email</p>
                  <input
                    value={userInfo2[0]?.email}
                    placeholder="email"
                    className=" py-2 px-4  border border-lightGray w-[400px] rounded-xl"
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </span>
              </div>
            ) : (
              <div className="w-[700px]">
                <span className="flex justify-between p-2">
                  <p className="font-semibold ">Name And Surname</p>
                  <h1>{userInfo && userInfo[0]?.name}</h1>
                </span>
                <span className="flex justify-between p-2">
                  <p className="font-semibold ">Phone</p>
                  <h1>{userInfo && userInfo[0]?.phone}</h1>
                </span>
                <span className="flex justify-between p-2">
                  <p className="font-semibold ">Address</p>
                  <h1>{userInfo && userInfo[0]?.address}</h1>
                </span>
                <span className="flex justify-between p-2">
                  <p className="font-semibold ">Email</p>
                  <h1>{userInfo && userInfo[0]?.email}</h1>
                </span>
              </div>
            )}
            <button
              className="border border-blue px-4 py-2 font-medium text-blue rounded-xl h-[45px]"
              onClick={() => (edit ? handleChangeInfo() : setEdit(!edit))}
            >
              {edit ? "save changes" : "Edit"}
            </button>
          </div>
        </div>
      )}
      {activeTab== 'Tab 2'&&(<div className="border border-lightGray p-5  w-[1000px] rounded-2xl">
          {clientItems &&
            clientItems.map((item,index) => (
              <OrderedItem
              key={index}
                order={item}
              />
            ))}
          {!clientItems.length && (
            <h1 className="text-sm text-darkGray font-bold flex items-center justify-center p-5">
              You have not ordered anything yet!
            </h1>
          )}</div>)}
    </div>
  );
};

export default page;
