"use client";
import ActionItems from "@/components/ActionItems";
import { useShoppingDetails } from "@/components/ContextWrapper";
import { ShoppingItem } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { FaRegImage } from "react-icons/fa6";

export default function Page() {
  const { cartItems, updateCartItems, orderedItems, updateOrderedItems } =
    useShoppingDetails();
  const router = useRouter();

  const onUpdate = useCallback(
    (item: ShoppingItem, isInCart: number, remove?: number) => {
      const updatedItems = cartItems
        .map((data) => {
          if (data.id === item.id) {
            return { ...data, count: (data.count || 0) + (remove || 1) };
          }
          return data;
        })
        .filter((data) => data.count);
      updateCartItems(updatedItems);
    },
    [cartItems]
  );

  const TotalAmount = useMemo(() => {
    return cartItems.reduce((accumulator, currentValue) => {
      return currentValue.price * (currentValue.count || 0) + accumulator;
    }, 0);
  }, [cartItems]);

  return (
    <>
      <div className="font-semibold text-lg px-8 py-4 self-start">
        Cart Items
      </div>
      {cartItems.length === 0 ? (
        <div className="flex items-center w-full justify-center p-12">
          No Items in the Cart
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row px-8 gap-3">
        <div className="flex w-full md:w-9/12 flex-col gap-3 cursor-pointer">
          <>
            {cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border border-blue-100 rounded-sm flex md:flex-row flex-col md:justify-between md:items-center w-full"
                >
                  <div className="p-2 flex gap-6 items-center">
                    <FaRegImage size={40} />
                    <div>
                      <p>{item.item}</p>
                      <p>&#x20B9; {item.price}/-</p>
                    </div>
                  </div>
                  <div className="w-1/6">
                    <ActionItems
                      item={item}
                      onUpdate={onUpdate}
                      cartItems={cartItems}
                    />
                  </div>
                </div>
              );
            })}
          </>
        </div>
        {TotalAmount ? (
          <div className="flex flex-col border gap-2 w-full md:w-1/3 border-blue-100 rounded-sm px-4 py-2">
            <p className="font-semibold">Summary</p>
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="flex justify-between">
                  <p>{item.item}</p>
                  <p>
                    {item.count} * {item.price} ={" "}
                    {(item.count || 0) * item.price} / -
                  </p>
                </div>
              );
            })}
            <div className="mt-auto pb-2">
              <p className="flex justify-end py-3">
                Total = <span className="font-semibold">{TotalAmount} / -</span>
              </p>
              <button
                className="bg-violet-500 w-full text-white font-serif py-2 px-4 rounded"
                onClick={() => {
                  console.log([
                    ...orderedItems,
                    {
                      orderId: orderedItems.length + 1,
                      cartItems,
                      totalAmount: TotalAmount,
                    },
                  ]);
                  updateOrderedItems([
                    ...orderedItems,
                    {
                      orderId: orderedItems.length + 1,
                      cartItems,
                      totalAmount: TotalAmount,
                    },
                  ]);
                  updateCartItems([]);
                  router.push("/orders");
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
