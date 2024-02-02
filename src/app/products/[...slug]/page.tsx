"use client";
import ActionItems from "@/components/ActionItems";
import { useShoppingDetails } from "@/components/ContextWrapper";
import {
  ShoppingItem,
  ShoppingItems,
  ShoppingItemsInterface,
  productDescription,
} from "@/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { FaRegImage } from "react-icons/fa6";

export default function Page({
  params: { slug },
}: {
  params: { slug: [keyof ShoppingItemsInterface, ...string[]] };
}) {
  const { cartItems, updateCartItems } = useShoppingDetails();
  const Items = ShoppingItems[slug?.[0]] || [];

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const onUpdate = useCallback(
    (item: ShoppingItem, isInCart: number, remove?: number) => {
      if (isInCart) {
        const updatedItems = cartItems
          .map((data) => {
            if (data.id === item.id) {
              return { ...data, count: (data.count || 0) + (remove || 1) };
            }
            return data;
          })
          .filter((data) => data.count);
        updateCartItems(updatedItems);
      } else {
        updateCartItems([
          ...cartItems,
          {
            id: item.id,
            item: item.item,
            price: item.price,
            count: 1,
            desc: productDescription,
          },
        ]);
      }
    },
    [cartItems]
  );

  return (
    <>
      <div className="font-semibold text-lg px-8 py-4 self-start">
        {slug.join(" / ")}
      </div>
      {slug.length === 2 ? (
        <div>
          {Items.filter((data) => `${data.id}` === productId).map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row px-8 gap-6 justify-between"
              >
                <div className="border border-blue-100 rounded-sm  flex-1 flex justify-center">
                  <FaRegImage size={240} />
                </div>
                <div className="md:w-5/12">
                  <p className="font-semibold">{item.item}</p>
                  <p>{item.desc}</p>
                  <p className="font-semibold py-1">&#x20B9; {item.price}/-</p>
                  <div className="py-2">
                    <ActionItems
                      item={item}
                      onUpdate={onUpdate}
                      cartItems={cartItems}
                      isIndividualProduct={true}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap px-8 py-4 gap-12 cursor-pointer">
          {Items.map((item) => {
            return (
              <div key={item.id} className="border border-blue-100 rounded-sm">
                <Link
                  href={`/products/${slug?.[0]}/${item.item}?productId=${item.id}`}
                >
                  <div className="px-12 py-6">
                    <FaRegImage size={120} />
                  </div>
                  <div className="border-t-2 px-4 py-2 border-blue-100">
                    <p>{item.item}</p>
                    <p>&#x20B9; {item.price}/-</p>
                  </div>
                </Link>
                <ActionItems
                  item={item}
                  onUpdate={onUpdate}
                  cartItems={cartItems}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
