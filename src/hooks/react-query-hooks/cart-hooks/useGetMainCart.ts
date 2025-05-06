import { cartService } from "@/services/api/cartService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { useQuery } from "@tanstack/react-query";

interface UseGetMainCartProps {
  userId: number | undefined;
}

export function useGetMainCart({ userId }: UseGetMainCartProps) {
  return useQuery<UserMainCartI | undefined>({
    queryKey: ["mainCart", userId],
    queryFn: () =>
      userId ? cartService.getUserMainCart() : Promise.resolve(undefined),
    enabled: !!userId,
    refetchOnMount: false,
  });
}
