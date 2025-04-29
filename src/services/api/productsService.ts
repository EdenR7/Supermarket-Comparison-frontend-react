import api from "@/lib/api";
import { ProductWithPricesI } from "@/types/products/product.types";
import { PaginationI } from "@/types/shared.types";

export interface ProductFilters {
  category?: string;
  name?: string;
}

export const productsService = {
  getProducts: async (
    filters?: ProductFilters,
    pagination?: PaginationI
  ): Promise<ProductWithPricesI[]> => {
    try {
      const response = await api.get("/products", {
        params: { ...filters, ...pagination },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (productId: string): Promise<ProductWithPricesI> => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  countProducts: async (filters?: ProductFilters): Promise<number> => {
    try {
      const response = await api.get("/products/count", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching products count:", error);
      throw error;
    }
  },
};
