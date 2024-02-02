export interface ShoppingItem {
  id: number;
  item: string;
  price: number;
  count?: number;
  desc: string;
}

export interface OrderedItems {
  orderId: number;
  cartItems: ShoppingItem[];
  totalAmount: number;
}

export const productDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export interface ShoppingItemsInterface {
  Vegetables: ShoppingItem[];
  Fruits: ShoppingItem[];
  Foods: ShoppingItem[];
}

export const ShoppingItems: ShoppingItemsInterface = {
  Vegetables: Array.from({ length: 7 }).map((_, index) => ({
    id: index,
    item: "Tomato",
    price: 100,
    desc: productDescription,
  })),
  Fruits: Array.from({ length: 7 }).map((_, index) => ({
    id: index,
    item: "Apple",
    price: 100,
    desc: productDescription,
  })),
  Foods: Array.from({ length: 7 }).map((_, index) => ({
    id: index,
    item: "Rice",
    price: 100,
    desc: productDescription,
  })),
};
