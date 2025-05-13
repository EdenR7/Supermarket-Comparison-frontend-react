import { cartService } from "@/services/api/cartService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCartItem(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      cartItemId,
    }: {
      cartId: number;
      cartItemId: number;
      isMainCart: boolean;
    }) => {
      if (!userId) {
        return Promise.reject(new Error("No user id provided"));
      }
      return cartService.deleteCartItem(cartId, cartItemId);
    },
    onMutate: async ({ cartItemId }) => {
      await queryClient.cancelQueries({ queryKey: ["mainCart", userId] });
      const prevCart = queryClient.getQueryData<UserMainCartI>([
        "mainCart",
        userId,
      ]);
      queryClient.setQueryData(
        ["mainCart", userId],
        (prevCart: UserMainCartI) => {
          return {
            ...prevCart,
            cartItems: prevCart.cartItems.filter(
              (item) => item.id !== cartItemId
            ),
          };
        }
      );
      return {
        prevCart,
      };
    },
    // Rollback
    onError: (_, __, context) => {
      if (context?.prevCart) {
        queryClient.setQueryData(["mainCart", userId], context.prevCart);
      }
    },
  });
}
