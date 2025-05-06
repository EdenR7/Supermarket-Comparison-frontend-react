// Cart service for shopping cart operations

import api from "@/lib/api";
import { CartItemI } from "@/types/cart/cart.types";
const cartBaseApi = "/carts";

export const cartService = {
  addProductToCart: async (
    cartId: number,
    productId: number,
    quantity: number = 1
  ): Promise<CartItemI> => {
    try {
      const response = await api.post(`${cartBaseApi}/cart-items/${cartId}`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
};
