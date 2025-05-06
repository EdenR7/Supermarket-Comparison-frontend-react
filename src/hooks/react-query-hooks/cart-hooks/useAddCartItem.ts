import { cartService } from "@/services/api/cartService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddCartItem(userId: number | undefined) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      productId,
      quantity,
    }: {
      cartId: number;
      productId: number;
      quantity: number;
    }) => {
      if (!userId) {
        // Return a rejected promise to prevent execution
        return Promise.reject(new Error("User not authenticated"));
      }
      return cartService.addProductToCart(cartId, productId, quantity);
    },
    onSettled: () => {
      if (userId) qc.invalidateQueries({ queryKey: ["mainCart", userId] });
    },
  });
}
