// Cart service for shopping cart operations

import api from "@/lib/api";
import { CartI, CartItemI } from "@/types/cart/cart.types";
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

  getUserMainCart: async () => {
    try {
      const response = await api.get(`${cartBaseApi}/user-main`);
      return response.data;
    } catch (error) {
      console.error("Error getting user main cart:", error);
      throw error;
    }
  },

  isProductInCart: async (cartId: number, productId: number) => {
    try {
      
    } catch (error) {
      
    }
  },
};
