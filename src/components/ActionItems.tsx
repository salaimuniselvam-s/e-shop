import { ShoppingItem } from "@/constants";

const ActionItems = ({
  item,
  onUpdate,
  cartItems,
  isIndividualProduct,
}: {
  item: ShoppingItem;
  onUpdate: (item: ShoppingItem, id: number, isInCart?: number) => void;
  cartItems: ShoppingItem[];
  isIndividualProduct?: boolean;
}) => {
  const isInCart = cartItems.filter(
    (data) => data.id === item.id && data.item === item.item && data.count
  );
  return (
    <div className={`${!isIndividualProduct ? "px-2" : ""} pb-2 font-bold`}>
      {isInCart?.length ? (
        <div className="flex items-center gap-2">
          <span
            className="inline-block px-3 py-1 border cursor-pointer border-blue-200"
            onClick={() => onUpdate(item, isInCart?.length, -1)}
          >
            -
          </span>
          <span
            className={`inline-block px-4 py-1 border border-blue-200 
              flex-grow text-center`}
          >
            {isInCart[0]?.count}
          </span>
          <span
            className="inline-block px-3 py-1 border cursor-pointer border-blue-200"
            onClick={() => onUpdate(item, isInCart?.length)}
          >
            +
          </span>
        </div>
      ) : (
        <button
          className="bg-violet-500 w-full text-white font-serif py-2 px-4 rounded"
          onClick={() => onUpdate(item, isInCart?.length)}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ActionItems;
