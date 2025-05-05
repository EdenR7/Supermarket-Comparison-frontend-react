import { ProductI } from "../products/product.types";

export interface CartI {
  CartItems: CartItemWithProductI[];
  id: number;
  title: string | null;
  type: string;
  user_id: number;
  updatedAt: string;
  createdAt: string;
}

export interface CartItemWithProductI {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  Product: ProductI;
}
