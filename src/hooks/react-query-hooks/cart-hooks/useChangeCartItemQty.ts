import { cartService } from "@/services/api/cartService";
import { UserMainCartI } from "@/types/cart/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangeCartItemQty({
  userId,
  cartItemId,
}: {
  userId: number | undefined;
  cartItemId: number | undefined;
}) {
  const qClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      cartItemId,
      newQty,
    }: {
      cartItemId: number;
      newQty: number;
    }) => cartService.changeCartItemQty(cartItemId, newQty),
    onMutate: ({ newQty }) => {
      console.log("onMutate", newQty);
      if (!userId || !cartItemId) {
        return Promise.reject(new Error("No user id or cart item id provided"));
      }

      qClient.cancelQueries({ queryKey: ["mainCart", userId] });
      const prevCart: UserMainCartI | undefined = qClient.getQueryData([
        "mainCart",
        userId,
      ]);
      qClient.setQueryData(["mainCart", userId], (oldData: UserMainCartI) => {
        return {
          ...oldData,
          cartItems: oldData.cartItems.map((item) =>
            item.id == cartItemId ? { ...item, quantity: newQty } : item
          ),
        };
      });
      return { prevCart };
    },
    onError(_, __, context) {
      if (context?.prevCart) {
        qClient.setQueryData(["mainCart", userId], context?.prevCart);
      }
    },
  });
}
