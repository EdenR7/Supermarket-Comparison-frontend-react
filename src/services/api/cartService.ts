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

  getUserMainCart: async () => {
    try {
      const response = await api.get(`${cartBaseApi}/user-main`);
      return response.data;
    } catch (error) {
      console.error("Error getting user main cart:", error);
      throw error;
    }
  },

  deleteCartItem: async (cartId: number, cartItemId: number) => {
    try {
      const response = await api.delete(`${cartBaseApi}/cart-items/${cartId}`, {
        data: {
          cartItemId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  },

  changeCartItemQty: async (cartItemId: number, newQty: number) => {
    try {
      const response = await api.patch(
        `${cartBaseApi}/cart-items/qty/${cartItemId}`,
        {
          newQty,
        }
      );
      return response;
    } catch (error) {
      console.error("Error changing cart item quantity:", error);
      throw error;
    }
  },
};
