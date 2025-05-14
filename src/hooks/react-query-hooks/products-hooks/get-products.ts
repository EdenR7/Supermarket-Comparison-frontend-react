import {
  ProductFilters,
  productsService,
} from "@/services/api/productsService";
import { ProductWithPricesI } from "@/types/products/product.types";
import { PaginationI } from "@/types/shared.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useGetProducts(
  fetchQueryParams: ProductFilters,
  pagination?: PaginationI
): UseQueryResult<ProductWithPricesI[] | undefined, Error> {
  return useQuery({
    queryKey: ["products", fetchQueryParams, pagination],
    queryFn: ({ signal }) =>
      productsService.getProducts(fetchQueryParams, pagination, signal),
    enabled: !fetchQueryParams.category || !fetchQueryParams.name,
  });
}
