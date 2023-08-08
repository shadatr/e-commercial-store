"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrandType,
  CartType,
  ColorType,
  DeviceColorType,
  DeviceType,
  ImageType,
  MemoryType,
  ProcessorType,
  PropType,
} from "@/app/types/types";
import { FaRegStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Page = ({ params }: { params: { id: number } }) => {
  const session = useSession();
  const user = session.data?.user;

  const [refresh, setRefresh] = useState<boolean>();
  const [images, setImages] = useState<ImageType[]>([]);
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [memory, setMemory] = useState<MemoryType[]>([]);
  const [brand, setBrand] = useState<BrandType[]>([]);
  const [deviceColors, setDeviceColors] = useState<DeviceColorType[]>([]);
  const [properties, setProperties] = useState<PropType[]>([]);
  const [processors, setProcessors] = useState<ProcessorType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [quantity, setQuantity] = useState<number>(1);
    const [cartItems, setCartItems] = useState<CartType[]>([]);
  const router = useRouter();


  useEffect(() => {
    async function downloadImages() {
      try {
        const responseCart = await axios.get("/api/cart");
        const dataCart: CartType[] = responseCart.data.message;
        setCartItems(dataCart);

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

        const prp = dataProp.find((im) => im.id == params.id);
        const deviceColor = dataColorDev.find(
          (im) => im.id === prp?.device_color_id
        );
        const selectedImg = dataImg.find(
          (im) =>
            im.device_color_id === deviceColor?.id && im.presentation == true
        );
        setSelectedImage(selectedImg);
      } catch (error) {
        console.log("Error downloading images: ", error);
      }
    }
    downloadImages();
  }, [refresh]);

  const prp = properties.find((im) => im.id == params.id);
  const deviceColor = deviceColors.find((im) => im.id === prp?.device_color_id);
  const selectedColor = colors.find((im) => im.id === deviceColor?.color_id);
  const proces = processors.find((im) => im.id === prp?.processor_id);
  const device = devices?.find((dev) => dev.id == deviceColor?.device_id);
  const brnd = brand.find((br) => br.id == device?.brand_id);
  const img = images.filter((im) => im.device_color_id === deviceColor?.id);
  const mmry = memory.find((mr) => mr.id === prp?.memory_id);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (session.status == "unauthenticated") {
      router.push("/auth/login");
    }else{
      const itemFound=cartItems.find((item)=> item.item_id==params.id&&user?.id==item.client_id);
      if(itemFound){
        const data = {
          id: itemFound.id,
          quantity: quantity+ itemFound.quantity
        };
        axios
          .post("/api/addMoreFromTheItem", data)
          .then(() => {
            toast.success("Added to cart successfully");
          })
          .catch(() => {
            toast.error("Error adding to cart");
          });
          return;
      }
      const data = {
        client_id: user?.id,
        item_id: params.id,
        quantity: quantity,
        left_items: prp ? prp?.quantity - quantity : 0,
      };
      axios
        .post("/api/cart", data)
        .then(() => {
          toast.success("Added to cart successfully");
        })
        .catch(() => {
          toast.error("Error adding to cart");
        });
      setRefresh(!refresh);
    }
  };


  return (
    <div className="m-10 flex">
      <div className="">
        <img
          src={selectedImage?.image_url}
          className="w-[450px] border border-lightGray rounded-xl"
        />
        <div className="flex">
          {img.map((item, index) => (
            <img
              src={item.image_url}
              key={index}
              className="w-[100px] m-1.5 border border-lightGray rounded-xl cursor-pointer"
              onClick={() => handleImageClick(item)}
            />
          ))}
        </div>
      </div>
      <div className="p-8 w-[600px]">
        <h1 className="text-sm font-medium">
          {brnd?.brand_name.toUpperCase()} {device?.name} {mmry?.memory_size}GB{" "}
          {proces?.processor} {selectedColor?.color_name}
        </h1>
        <h1 className="text-lg font-bold my-4">{prp?.price}$</h1>
        <p className="flex flex-row justify-center items-center bg-yellow-300 w-14 rounded-lg">
          {device?.stars.toFixed(1)} <FaRegStar className="h-7" />
        </p>
        <p className="border-t-[1px] w-[530px] border-lightGray my-5" />
        <p className="text-xsm text-darkGray">Sent from Chicago, USA</p>
        <p className="text-xsm text-darkGray">Shipping Cost $20</p>
        <p className="text-xsm text-darkGray">Estimated Delivery 3 days</p>
        <h1 className="bg-blue text-secondary my-3 p-2 w-[80px] rounded-xl font-semibold">
          Details
        </h1>
        <p className="text-xsm ">{prp?.details}</p>
      </div>
      <div className=" border border-lightGray rounded-xl w-[270px] h-[340px] shadow-md ml-5 p-5">
        <h1 className="font-bold">Set Quantity</h1>
        <span className="flex my-3">
          <p
            className="font-bold bg-blue text-secondary flex justify-center items-center rounded-tl-md rounded-bl-md p-1 w-[50px] cursor-pointer"
            onClick={() => {
              0 < quantity ? setQuantity(quantity - 1) : "";
            }}
          >
            -
          </p>
          <p className="font-bold  flex justify-center items-center p-2 w-[130px] border border-lightGray">
            {quantity}
          </p>
          <p
            className="font-bold bg-blue text-secondary flex justify-center items-center rounded-tr-md rounded-br-md p-1 w-[50px] cursor-pointer"
            onClick={() => {
              prp?.quantity && prp?.quantity > quantity
                ? setQuantity(quantity + 1)
                : "";
            }}
          >
            +
          </p>
        </span>
        <p className="text-xsm">
          Only {prp?.quantity && prp?.quantity - quantity} items left!
        </p>
        <span className="flex justify-between items-center  h-[60px]">
          <p className="text-xsm">Sub Total</p>
          <p className="text-sm font-bold">{prp?.price}$</p>
        </span>
        {prp?.quantity ? (
          <>
            <p
              onClick={handleAddToCart}
              className="font-bold bg-blue text-secondary flex justify-center items-center rounded-md p-2 m-2 w-[200px] cursor-pointer"
            >
              <Link href={'/client/cart'}>
              Buy Now
              </Link>
            </p>
            <p
              className="font-bold border border-blue text-blue flex justify-center items-center rounded-md p-2 m-2 w-[200px] cursor-pointer"
              onClick={handleAddToCart}
            >
              Add To Cart
            </p>
          </>
        ) : (
          <>
            <p className="font-bold bg-darkGray text-secondary flex justify-center items-center rounded-md p-2 m-2 w-[200px] ">
              Buy Now
            </p>
            <p className="font-bold border border-lightGray text-lightGray flex justify-center items-center rounded-md p-2 m-2 w-[200px]">
              Add To Cart
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
