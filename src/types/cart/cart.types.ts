import { ProductI } from "../products/product.types";

export interface CartI {
  cartItems: CartItemI[];
  id: number;
  title: string | null;
  type: "main" | "saved" | "session";
}

export type UserMainCartI = Omit<CartI, "type" | "title"> & {
  type: "main";
};

export type GuestUserCartI = Omit<UserMainCartI, "id">;

export interface CartItemI {
  id: number;
  quantity: number;
  product: ProductI;
}

export interface CartItemApiI {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}
