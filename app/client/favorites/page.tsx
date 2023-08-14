/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrandType,
  ColorType,
  DeviceColorType,
  DeviceType,
  FavoritesType,
  ImageType,
  MemoryType,
  OrdersType,
  ProcessorType,
  PropType,
} from "@/app/types/types";
import { useSession } from "next-auth/react";
import Order from "@/app/components/order";
import { toast } from "react-toastify";
import { useDataFetching } from "@/app/components/useDataFetching";

function page() {
  const session = useSession({ required: true });
  const user = session.data?.user;

    const {
      refresh,
      images,
      devices,
      colors,
      memory,
      brand,
      deviceColors,
      properties,
      processors,
      favorites,
      setRefresh,
    } = useDataFetching(user?.id);

  const clientItems: OrdersType[] = properties
    .filter(
      (p) =>
        p.id ==
        favorites.find((i) => i.item_id == p.id && i.client_id == user?.id)
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
        item_id: favorites.find(
          (i) => i.item_id == prp.id && i.client_id == user?.id
        )?.item_id,
      };
    });

  const handleDeleteOrder = (item_id?: number) => {
    try {
      axios.post("/api/favorites/deleteItem", item_id);
      toast.success("The item deleted successfully");
    } catch {
      toast.success("Somthing went wrong while deleting the item");
    }
    setRefresh(refresh);
  };

  return (
    <div className="my-10 mx-16 flex">
      <div>
        <h1 className="text-sm text-darkGray font-bold p-1">Your Items</h1>
        <div className="border border-lightGray p-5  w-[1000px] rounded-2xl">
          {clientItems &&
            clientItems.map((item, index) => (
              <Order
                key={index}
                handleDeleteOrder={() =>
                  handleDeleteOrder(
                    favorites.find(
                      (i) =>
                        i.item_id == item.item_id && i.client_id == user?.id
                    )?.id
                  )
                }
                order={item}
              />
            ))}
          {!clientItems.length && (
            <h1 className="text-sm text-darkGray font-bold flex items-center justify-center p-5">
              You have not added any items to your favorites yet!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
