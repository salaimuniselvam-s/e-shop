"use client";
import { useShoppingDetails } from "@/components/ContextWrapper";
import React from "react";
import { FaRegImage } from "react-icons/fa6";

export default function Page() {
  const { orderedItems } = useShoppingDetails();

  return (
    <>
      <div className="font-semibold text-lg px-8 py-4 self-start">Orders</div>
      <div className="flex flex-col px-8 gap-3">
        <div className="flex flex-col gap-6">
          <>
            {orderedItems.length === 0 ? (
              <div className="flex items-center justify-center p-12">
                No Orders
              </div>
            ) : null}
            {orderedItems.map((item) => {
              return (
                <div
                  key={item.orderId}
                  className="border border-blue-100 px-3 rounded-sm flex flex-col gap-1 py-2"
                >
                  <div className="flex justify-between items-center py-1">
                    <p>Order Id: #{item.orderId}</p>
                    <p className="font-semibold">
                      Total: &#x20B9; {item.totalAmount}/-
                    </p>
                  </div>
                  <p className="font-bold">Items</p>
                  <div className="mb-4 py-1 px-2 border bg-blue-100 rounded-sm border-blue-100">
                    {item.cartItems.map((items, index) => {
                      return (
                        <div
                          key={items.id}
                          className={`${
                            item?.cartItems?.length !== index + 1
                              ? "border-b-2 border-b-gray-400"
                              : ""
                          } flex md:flex-row flex-col md:justify-between md:items-center w-full`}
                        >
                          <div className="p-2 flex gap-6 items-center">
                            <FaRegImage size={40} />
                            <div>
                              <p>{items.item}</p>
                              <p>&#x20B9; {items.price}/-</p>
                            </div>
                          </div>
                          <div>
                            {items.count} * {items.price} ={" "}
                            {(items.count || 0) * items.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </>
  );
}
