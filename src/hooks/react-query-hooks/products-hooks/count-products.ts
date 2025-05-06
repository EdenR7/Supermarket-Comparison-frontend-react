import {
  ProductFilters,
  productsService,
} from "@/services/api/productsService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useCountProducts(
  fetchQueryParams: ProductFilters
): UseQueryResult<number | undefined, Error> {
  return useQuery({
    queryKey: ["total-products-number", fetchQueryParams],
    queryFn: () => productsService.countProducts(fetchQueryParams),
    enabled: !fetchQueryParams.category || !fetchQueryParams.name,
  });
}
