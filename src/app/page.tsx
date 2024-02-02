import { ShoppingItems } from "@/constants";
import Link from "next/link";
import { FaRegImage } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="font-semibold text-lg px-8 py-4 self-start">
        Categories
      </div>
      <div className="flex flex-wrap px-8 py-4 gap-12 cursor-pointer">
        {Object.keys(ShoppingItems).map((item) => {
          return (
            <Link
              href={`/products/${item}`}
              className="border border-blue-100 rounded-sm"
              key={item}
            >
              <div className="px-12 py-6">
                <FaRegImage size={120} />
              </div>
              <div className="border-t-2 px-4 py-2 border-blue-100">{item}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
