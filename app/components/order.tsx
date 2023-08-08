/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { OrdersType } from "../types/types";
import Link from "next/link";

const Order = ({ order,handleDeleteOrder }: { order?: OrdersType, handleDeleteOrder: any }) => {

  return (
    <div className=" flex ">
      <Link
        href={`/client/device-info/${order?.item_id}`}
        className="flex w-[700px]"
      >
        <img
          className="w-[170px] border border-lightGray rounded-xl m-4"
          alt={`image-${order?.name}`}
          src={order?.image}
        />
        <div className="flex flex-col justify-center ">
          <h1 className="py-2 text-sm font-medium">
            {order?.brand?.toUpperCase()} {order?.name} {order?.memory}
            GB {order?.processor} {order?.color}
          </h1>
          <h1 className="text-darkGray">
            {order?.quantity}{" "}
            {order?.quantity && order?.quantity > 1 ? "items" : "item"}
          </h1>
          <h1 className="text-darkGray">
            {order?.color} | {order?.memory}GB | {order?.processor}
          </h1>
          <h1 className="font-medium text-sm">
            ${order?.price && order?.quantity&&order?.price * order?.quantity}
          </h1>
        </div>
      </Link>
      <button
        className="flex justify-center items-center w-1/4 text-darkGray"
        onClick={() => handleDeleteOrder(order?.item_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Order;
