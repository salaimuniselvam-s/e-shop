"use client";
import Link from "next/link";
import React from "react";
import { CiShoppingCart, CiSettings } from "react-icons/ci";
import { useShoppingDetails } from "./ContextWrapper";

const Navbar = () => {
  const { cartItems } = useShoppingDetails();
  return (
    <div className="bg-slate-200 flex items-center h-16 w-full px-8 py-2 justify-between">
      <Link href={"/"} className="text-xl font-semibold">
        E - Shop
      </Link>
      <div className="flex gap-6 items-center">
        <Link href={"/cart"}>
          <div className="relative inline-block">
            <CiShoppingCart size={32} />
            {cartItems?.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                {cartItems.length}
              </div>
            )}
          </div>
        </Link>
        <Link href={"/orders"}>
          <CiSettings size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
