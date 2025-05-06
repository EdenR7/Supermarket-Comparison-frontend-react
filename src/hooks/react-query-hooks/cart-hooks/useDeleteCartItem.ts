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
      if (prevCart) {
        const updatedCart = {
          ...prevCart,
          cartItems: prevCart.cartItems.filter(
            (item) => item.id !== cartItemId
          ),
        };
        queryClient.setQueryData(["mainCart", userId], updatedCart);
      }

      return {
        prevCart,
      };
    },
    onError: (_, __, context) => {
      if (context?.prevCart) {
        queryClient.setQueryData(["mainCart", userId], context.prevCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCart", userId] });
    },
  });
}
