import {
  ProductFilters,
  productsService,
} from "@/services/api/productsService";
import { ProductWithPricesI } from "@/types/products/product.types";
import { PaginationI } from "@/types/shared.types";
import { useQueries } from "@tanstack/react-query";

export function useCombinedGetAllCountAllProducts(
  fetchQueryParams: ProductFilters,
  pagination?: PaginationI
): {
  totalProductsNumber: number | undefined;
  products: ProductWithPricesI[] | undefined;
  isLoading: boolean;
} {
  return useQueries({
    queries: [
      {
        queryKey: ["total-products-number", fetchQueryParams],
        queryFn: () => productsService.countProducts(fetchQueryParams),
        enabled: fetchQueryParams.category ? true : false,
      },
      {
        queryKey: ["products", fetchQueryParams, pagination],
        queryFn: () =>
          productsService.getProducts(fetchQueryParams, pagination),
        enabled: fetchQueryParams.category ? true : false,
      },
    ],
    combine: (results) => {
      return {
        totalProductsNumber: results[0].data,
        products: results[1].data,
        isLoading: results[0].isLoading || results[1].isLoading,
      };
    },
  });
}
