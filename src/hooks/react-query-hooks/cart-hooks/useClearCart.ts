import { cartService } from "@/services/api/cartService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useClearCart(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId }: { cartId: number; isMainCart: boolean }) => {
      if (!userId) {
        return Promise.reject(new Error("No user id provided"));
      }
      return cartService.clearCart(cartId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["mainCart", userId] });
      const prevCart = queryClient.getQueryData<UserMainCartI>([
        "mainCart",
        userId,
      ]);
      queryClient.setQueryData(
        ["mainCart", userId],
        (oldData: UserMainCartI) => {
          return {
            ...oldData,
            cartItems: [],
          };
        }
      );

      return { prevCart };
    },
    onError: (_, __, context) => {
      if (context?.prevCart) {
        queryClient.setQueryData(["mainCart", userId], context.prevCart);
      }
    },
  });
}
